const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const { createFolder } = require('../controllers/createFolderController');

router.get('/', async (req, res) => {
  try {
    if (!req.user) return res.redirect('/login');

    const folders = await prisma.folder.findMany({
      where: { parentId: null, userId: req.user.id },
    });

    const files = await prisma.file.findMany({
      where: { folderId: null, userId: req.user.id },
      orderBy: { uploadedAt: 'desc' },
    });

    res.render('folder', {
      user: req.user,
      currentFolder: null,
      folders,
      files,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading root folders');
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!req.user) return res.redirect('/login');

    const folderId = parseInt(req.params.id);

    const currentFolder = await prisma.folder.findUnique({
      where: { id: folderId },
    });

    if (!currentFolder) {
      return res.status(404).send('Folder not found');
    }

    const folders = await prisma.folder.findMany({
      where: { parentId: folderId, userId: req.user.id },
    });

    const files = await prisma.file.findMany({
      where: { folderId: folderId, userId: req.user.id },
      orderBy: { uploadedAt: 'desc' },
    });

    res.render('folder', {
      user: req.user,
      currentFolder,
      folders,
      files,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading folder');
  }
});

router.post('/create', createFolder);

module.exports = router;
