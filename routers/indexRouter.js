const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })

router.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

router.post('/', upload.single('document'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    // File information is available in req.file
    console.log(req.file);
    res.send('File uploaded successfully.');
});

module.exports = router;