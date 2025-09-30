const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })
const indexController = require('../controllers/indexController');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const files = await prisma.file.findMany({
    select: {
        filename: true,
        originalFileName: true,
        fileSize: true,
        userId: true,
    },
    orderBy: { 
        uploadedAt: 'desc'
    }})
    res.render('index', { 
        user: req.user,
        files: files, });
});

router.post('/', upload.single('document'), indexController.uploadFile);

module.exports = router;