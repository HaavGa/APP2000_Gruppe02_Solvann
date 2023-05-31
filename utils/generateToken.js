import jwt from 'jsonwebtoken';

/**
 * @author Brad Traversy
 * @desc lager token og signer med payload og secret. Deretter
 * oppretter den cookie.
 * @param {string} userId
 * @param {boolean} isAdmin
 */
const generateToken = (res, userId, isAdmin) => {
  const token = jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 8 * 60 * 60 * 1000, // 8 hours
  });
  res.token = token;
};

export default generateToken;