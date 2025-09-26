const register = async (req, res) => {
    const { username, email, password} = req.body;
    const hashedPassword = await bcryp.hash(password, 10);
    res.redirect('/login');
}

const render = (req, res) => {
    res.render('register');
}

module.exports = { register, render };