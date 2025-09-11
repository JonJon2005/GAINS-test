export default function handler(req, res) {
  if (req.method === 'GET') {
    const tools = [
      {
        id: 'linear-regression',
        name: 'Linear Regression',
        description: 'A model that estimates the relationship between a scalar response.',
        icon: '📊',
        color: '#ff4444'
      },
      {
        id: 'bar-chart',
        name: 'Bar Chart',
        description: 'Visualize the frequency or proportion of categories using bars.',
        icon: '📊',
        color: '#4444ff'
      },
      {
        id: 'line-chart',
        name: 'Line Chart',
        description: 'Display trends over time or sequential data.',
        icon: '📈',
        color: '#44ffaa'
      }
    ];

    res.status(200).json(tools);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
