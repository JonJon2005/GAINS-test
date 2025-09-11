# How to Test Frontend/Backend Connection

These steps verify that the frontend and backend communicate correctly.

## 1. Install dependencies and start the dev server

```bash
npm install
npm run dev
```

## 2. Verify backend endpoints directly

- **Tools endpoint**
  ```bash
  curl http://localhost:3000/api/tools
  ```
  You should receive a JSON array of tool names.

- **R model endpoint**
  ```bash
  curl -X POST http://localhost:3000/api/run-model \
    -H "Content-Type: application/json" \
    -d '{"script":"cat(2+2)"}'
  ```
  Expected response: `{ "output": "4" }` if R executes successfully.

## 3. Confirm frontend ↔ backend interaction

1. Visit [http://localhost:3000](http://localhost:3000) in your browser.
2. Open the browser's developer tools and inspect the **Network** tab.
3. Reload the page and ensure a request to `/api/tools` occurs and the tool list appears on the page.

These steps ensure both the backend endpoints and the frontend's use of them are functioning.
