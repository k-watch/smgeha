const checkLoggedIn = (req, res, next) => {
  if (!req.state.user) {
    res.status(401); // Unauthorized
    return res.send();
  }
  return next();
};

export default checkLoggedIn;
