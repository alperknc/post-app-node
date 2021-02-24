const User = require('../models/User');

exports.login = function(req, res) {
    let user = new User(req.body);
    debugger
    user.login(function(result) {
        res.send(result);
    });
}

exports.logout = function(req, res) {
    
}

exports.register = function(req, res) {
  let user = new User(req.body);
  user.register();
  if (user.errors.length) {
    res.send(user.errors);
  } else {
    res.send("Congrats, there are no errors.");
  }
}

exports.home = function(req, res) {
    res.render('home-guest');
}