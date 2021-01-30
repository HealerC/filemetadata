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
as a JSON object.
The app uses formidable to parse multipart data.
The app also accepts multiple files and responds an array of the objects */
app.post('/api/fileanalyse', (req, res, next) => {
	const form = formidable({multiples: true});		// Allows multiple files

	form.parse(req, (err, fields, files) => {
		if (err) {
			console.error(err.message);
			res.json("An error occured: " + err.name);
		}
		let fileList = {};
		if ( Array.isArray(files.upfile) ) {	// An array is returned 
												// if there are multiple files
			fileList = files.upfile.map(data => {
				return {	// For each data, map out only the required properties
					name: data.name,
					size: data.size,
					type: data.type
				};
			});
		} else {		// A plain object is returned if there is only one file
			const { name, size, type } = files.upfile;
			Object.assign(fileList, {name, size, type});
		}
		res.json(fileList);
	})
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
