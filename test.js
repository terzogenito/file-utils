const app = require('./index');

(async () => {
  console.log(await app.getData('./test-data.json'));
})();

console.log(app.getString('test-data.json'));

app.getFile('test-data.json',data=>{
	console.log(data);
});

const sampleURL = "https://sample-files.com/downloads/documents/xml/basic-structure.xml";

app.getURL(sampleURL, data => {
	console.log(data);
});