import { spawn } from 'child_process';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { script } = req.body || {};
  if (!script) {
    return res.status(400).json({ error: 'No R script provided' });
  }

  const r = spawn('Rscript', ['-e', script]);

  let stdout = '';
  let stderr = '';

  r.stdout.on('data', (data) => {
    stdout += data.toString();
  });

  r.stderr.on('data', (data) => {
    stderr += data.toString();
  });

  r.on('close', (code) => {
    if (code === 0) {
      res.status(200).json({ output: stdout.trim() });
    } else {
      res.status(500).json({ error: stderr.trim() || stdout.trim() });
    }
  });
}

