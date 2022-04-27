const checkLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send(); // Unauthorized
  }
  return next();
};

export default checkLoggedIn;
