const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    await prisma.file.create({
        data: { 
            filename: req.file.filename,
            fileSize: req.file.size,
            originalFileName: req.file.originalname,
            uploadedAt: req.file.uploadedAt,
            userId: req.user.id,
            folderId: req.body.folderId || null
        }
    })
    res.redirect('/');
};


module.exports = { uploadFile };
