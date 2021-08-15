// Source: https://www.youtube.com/watch?v=b6Oe2puTdMQ

const express = require("express");
const fileUpload = require("express-fileUpload");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(fileUpload());

// Upload endpoint
app.post('/upload', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({ msg: 'No file was uploaded' });
    }

    const file = req.files.file;

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }
    });

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
});

app.listen(5000, () => console.log('Server started...'))
