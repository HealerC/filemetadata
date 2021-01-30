var express = require('express');
var cors = require('cors');
require('dotenv').config()
const formidable = require('formidable');	// Allows us to parse multipart data (file)

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});
/* The app is simple. Get the file uploaded and respond with the name, size and type
The app uses formidable to parse multipart data.

May extend the app to accept multiple files and respond with each of them in an array */
app.post('/api/fileanalyse', (req, res, next) => {
	const form = formidable();				// Parses the file (can accept options)

	form.parse(req, (err, fields, file) => {
		if (err) {
			console.error(err.message);
			res.json("An error occured: " + err.name);
		}
		const { name, size, type } = file.upfile;
		res.json({name, type, size});
	})
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
