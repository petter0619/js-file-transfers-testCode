// File upload solution from: https://www.youtube.com/watch?v=EVOFt8Its6I

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// File upload packages
// const busboy = require('connect-busboy');
const multer  = require('multer');

// App setup
const app = express();
app.use(cors());
app.use('/static', express.static('public') );
app.set('view engine', 'pug');

// Multer setup
// const upload = multer({ dest: "uploads/" }); // Academind...
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './multer-uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});
const upload = multer({ storage: fileStorageEngine });

// Routes
app.get('/', (req, res) => {
    res.render('index', { name: "world" , title:'Hello, world!' });
});

app.post('/multer-single', upload.single('filetoupload'), (req, res, next) => {
    console.log(req.file);
    res.send('Single file uploaded');
});

app.post('/multer-multiple', upload.array('filestoupload', 3), (req, res, next) => {
    console.log(req.files);
    res.send('Multiple files uploaded');
});

// For downloading files
/* app.get('/file-download-1', (res, req) => {
    res.download('./downloads/about-img.png', 'about-img.png')
}); */

app.get('/file-download', function(req, res) {
    res.sendFile( path.resolve('./downloads/texturedMesh.ply') );
});


// Server setup
app.listen(8080, () => {
    console.log('Application running on localhost:8080');
});
