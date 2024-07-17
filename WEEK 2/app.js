const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_DIR = path.join(__dirname, 'files');

// Ensure the base directory exists
if (!fs.existsSync(BASE_DIR)) {
  fs.mkdirSync(BASE_DIR);
}

// Helper function to send a response
const sendResponse = (res, statusCode, data, contentType = 'text/html') => {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.end(data);
};

// Create the HTTP server
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const fileName = url.searchParams.get('file');
  const filePath = path.join(BASE_DIR, fileName);

  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        sendResponse(res, 500, 'Error loading index.html');
      } else {
        sendResponse(res, 200, data, 'text/html');
      }
    });
  } else if (req.method === 'POST' && url.pathname === '/create') {
    fs.writeFile(filePath, 'This is a new file.', (err) => {
      if (err) {
        sendResponse(res, 500, 'Error creating file');
      } else {
        sendResponse(res, 200, `File ${fileName} created`);
      }
    });
  } else if (req.method === 'GET' && url.pathname === '/read') {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        sendResponse(res, 500, 'Error reading file');
      } else {
        sendResponse(res, 200, data, 'text/plain');
      }
    });
  } else if (req.method === 'DELETE' && url.pathname === '/delete') {
    fs.unlink(filePath, (err) => {
      if (err) {
        sendResponse(res, 500, 'Error deleting file');
      } else {
        sendResponse(res, 200, `File ${fileName} deleted`);
      }
    });
  } else {
    sendResponse(res, 404, 'Not Found');
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
