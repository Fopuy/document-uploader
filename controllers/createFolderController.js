const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const createFolder = async (req, res) => {
  try {
    if (!req.user) return res.status(401).send('Unauthorized');

    const { folderName, parentId } = req.body;

    await prisma.folder.create({
      data: {
        name: folderName,
        parentId: parentId ? parseInt(parentId) : null,
        userId: req.user.id,
      },
    });

    res.redirect(parentId ? `/folders/${parentId}` : '/folders');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating folder');
  }
};

module.exports = { createFolder };
