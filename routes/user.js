const express = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/register');
const loginUser = require('../models/login');

const auth = require('../middleware/Auth');
const router = express.Router();



////to resister user
router.post('/register', function (req, res) {
  userData = new user({ ...req.body });
  userData.save().then(function (data) {
    res.send(data);
  });
});

// to check if the user is valid or not in login
router.post("/login", async function (req, res) {

  const Users = await loginUser.checkCrediantialsDb(req.body.email, req.body.password)

  ///self created function
  const token = await Users.generateAuthToken()

  //console.log(token)

  res.send({
    token: token,
    id: Users._id,
    username: Users.username,
  })

})


router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
});

router.post('/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
});

module.exports = router;