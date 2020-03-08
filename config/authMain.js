module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect('/restaurants/')
    }
    else {
      return next()
    }

  },
}