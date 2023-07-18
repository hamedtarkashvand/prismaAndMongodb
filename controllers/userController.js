const cookieToken = require('../utils/cookieToken');
const prisma = require('../prisma/index');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error('please provide all fields');
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    cookieToken(user, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ done: false });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    if (!email || !password) {
      throw new Error('please provide all fields');
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error('notfound user');
      res.status(401);
    }

    if (user.password !== password) {
      throw new Error('password id incorrect');
      res.status(401);
    }

    cookieToken(user, res);
  } catch (error) {
    throw new Error(error);
  }
};

exports.logout = (req, res, next) => {
  try {
    res.clearCookie('token');
    res.json({
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
};
