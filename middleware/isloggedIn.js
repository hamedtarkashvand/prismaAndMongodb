const prisma = require('../prisma/index');
const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookie.token;
    if (!token) {
      throw new Error('please login');
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    res.user = await prisma.user.findUnique({
      where: {
        id: decode.userId,
      },
    });

    next();
  } catch (error) {
    throw new Error(error);
  }
};
