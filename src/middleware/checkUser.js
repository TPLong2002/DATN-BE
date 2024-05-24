const checkUser = (req, res, next) => {
  const nonSecurePaths = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];
  if (nonSecurePaths.includes(req.path)) {
    next();
  }
};
