const register = async (req, res) => {
    const { username, email, password} = req.body;
    console.log(req.body);
    res.redirect('/');
}

const render = (req, res) => {
    res.render('register');
}

module.exports = { register, render };