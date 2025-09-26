const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const render = (req, res) => {
    res.render('register');
}

const register= async (req, res) => {
    const { username, email, password} = req.body;
    await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: password
        },
    })

  const allUsers = await prisma.user.findMany();
  console.dir(allUsers, { depth: null })
  res.redirect('/');
}

module.exports = { register, render };