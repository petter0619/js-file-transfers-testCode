// Source: https://medium.com/@vecera.petr/how-to-handle-large-file-upload-with-nodejs-express-server-7de9ab3f7af1

const express = require('express');         // Express Web Server
const busboy = require('connect-busboy');   // Middleware to handle the file upload https://github.com/mscdex/connect-busboy
const path = require('path');               // Used for manipulation with path
const fs = require('fs-extra');             // Classic fs
 
const app = express(); // Initialize the express web server
app.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
})); // Insert the busboy middle-ware
 
const uploadPath = path.join(__dirname, 'busboy-uploads/'); // Register the upload path
fs.ensureDir(uploadPath); // Make sure that the upload path exits
 
 
/**
 * Create route /upload which handles the post request
 */
app.route('/busboy-stream').post((req, res, next) => {
 
    req.pipe(req.busboy); // Pipe it trough busboy
 
    req.busboy.on('file', (fieldname, file, filename) => {
        console.log(`Upload of '${filename}' started`);
 
        // Create a write stream of the new file
        const fstream = fs.createWriteStream(path.join(uploadPath, filename));
        // Pipe it trough
        file.pipe(fstream);
 
        // On finish of the upload
        fstream.on('close', () => {
            console.log(`Upload of '${filename}' finished`);
            res.redirect('back');
        });
    });
});
 
 
/**
 * Serve the basic index.html with upload form
 */
app.route('/').get((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="/busboy-stream" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="fileToUpload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
});
 
const server = app.listen(3200, function () {
    console.log(`Listening on port ${server.address().port}`);
});
