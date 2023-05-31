import Jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

/**
 * @desc Tar imot token og dekoder den. userId ligger som payload som den sjekker
 * mot databasen. Om den finner en bruker med id'en er bruker autorisert
 * @author Brad Traversy
 * @source https://github.com/bradtraversy/mern-auth/blob/master/backend/middleware/authMiddleware.js
 */
const protect = asyncHandler(async (req, res, next) => {
  
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = Jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

/**
 * @author Emil Waldemar Strand
 * @desc Blir kjørt etter protect metoden i sammen fil.
 * Sjekker om bruker er admin. Hvis bruker ikke er admin
 * kaster den feilmelding og hvis den er det får den lov
 * til å gå videre.
 */
const isAdmin = asyncHandler(async(req, res, next) => {

  if(!req.user.isAdmin){
    res.status(401);
    throw new Error('Not authorized, not admin');
  }

  next();
})

export { protect, isAdmin };