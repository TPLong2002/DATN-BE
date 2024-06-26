import authService from "../services/auth.service";
const test = async (req, res) => {
  return res.json({ message: "hello world", data: "test" });
};

const register = async (req, res) => {
  try {
    if (!req.body.email || !req.body.username || !req.body.password) {
      return res.status(200).json({ message: "missing value", code: 2 });
    }
    if (req.body.password.length < 6) {
      return res.status(200).json({ message: "password has short", code: 2 });
    }
    let data = await authService.register(req.body);
    return res
      .status(data.status)
      .json({ message: data.message, code: data.code });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1 });
  }
};
const Login = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(200).json({ message: "missing value", code: 2 });
    }
    if (req.body.password.length < 6) {
      return res.status(200).json({ message: "password has short", code: 2 });
    }
    let data = await authService.login(req.body);
    if (data?.data?.access_token) {
      res.cookie("token", data.data.access_token, {
        httpOnly: true,
        maxAge: 3600000,
      });
      return res
        .status(data.status)
        .json({ message: data.message, code: data.code, data: data.data });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1 });
  }
};
const logout = (req, res) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json({ message: "logout success", code: 0, data: { isAuth: false } });
};
const changePassword = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res
        .status(200)
        .json({ message: "missing value", code: 2, data: {} });
    }
    if (req.body.password.length < 6) {
      return res
        .status(200)
        .json({ message: "password has short", code: 2, data: {} });
    }
    let data = await authService.changePassword(req.body);
    return res
      .status(data.status)
      .json({ message: data.message, code: data.code, data: {} });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: {} });
  }
};
const getUserAccount = async (req, res) => {
  return res.status(200).json({
    code: 0,
    message: "ok",
    data: { isAuth: true, access_token: req.token, ...req.user },
  });
};
const forgotPassword = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(200).json({ message: "missing value", code: 2 });
    }
    let data = await authService.forgotPassword(req.body);
    return res
      .status(data.status)
      .json({ message: data.message, code: data.code, data: {} });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1 });
  }
};
module.exports = {
  test,
  register,
  Login,
  logout,
  changePassword,
  getUserAccount,
  forgotPassword,
};
