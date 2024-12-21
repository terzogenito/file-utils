const fs = require('fs');
const https = require('https');

function getString(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

function getFile(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    } else {
      callback(data);
    }
  });
}

function loadFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function getData(filePath) {
  try {
    const data = await loadFile(filePath);
    return data;
  } catch (err) {
    console.error("Error reading the file:", err);
  }
}

function getURL(url, callback) {
  https.get(url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      callback(data);
    });
  }).on('error', (err) => {
    console.error("Error fetching the URL:", err);
  });
}

function isUrl(input) {
  const urlPattern = /^(https?:\/\/|ftp:\/\/|www\.)/i;
  return urlPattern.test(input);
}

function getContent(target, callback) {
  if (isUrl(target)) {
    getURL(target, callback);
  } else {
    getFile(target, callback);
  }
}

module.exports = {
  getString,
  getFile,
  getData,
  getURL,
  getContent,
};