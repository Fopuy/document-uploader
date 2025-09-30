const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const render = (req, res) => {
    res.render('register');
}

const register = async (req, res) => {
    const { username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: hashedPassword
        },
    })

  const allUsers = await prisma.user.findMany();
  console.dir(allUsers, { depth: null })
  res.redirect('/');
}

module.exports = { register, render };