// Source: https://www.youtube.com/watch?v=ogF_WMzUqok

const https = require('https');
const fs = require('fs');
const path = require('path');

function downloadFile(url, callback) {
    const filename = path.basename(url); 

    const req = https.get(url, res => {
        const fileStream = fs.createWriteStream(filename);
        res.pipe(fileStream);
    
        fileStream.on('error', err => {
            console.log('-------- ERROR writing to stream --------');
            console.log(err);
        });

        fileStream.on('close', () => {
            callback(filename);
        });
    
        fileStream.on('finish', () => {
            fileStream.close();
            console.log('done!');
        });
    });
    
    req.on('error', err => {
        console.log('-------- ERROR downloading the file --------');
        console.log(err);
    });
}

const downloadURL = 'https://images.pexels.com/photos/1036657/pexels-photo-1036657.jpeg';

downloadFile(downloadURL, (filename) => {
    console.log(`Finished downloading: ${filename}`);
});
