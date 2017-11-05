import config from 'config';

export default function renderHTML(req, res) {
  const html = buildHTML();
  return res.status(200).send(html);
}

function buildHTML() {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>React Node Template</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <div id="root"></div>
      <script>
      window.__CONFIG__=${JSON.stringify(config.client)};
      </script>
      <script src="/dist/bundle.js"></script>
    </body>
    </html>
  `.replace(/>\s+</g, '><').trim();
}
