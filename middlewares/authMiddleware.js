import JWT from 'jsonwebtoken';
import User from '../models/userModel.js';
export const requireSignIn = async (req, res, next) => {

    try {
      const token = req.headers.authorization;

      //decodes token id
      const decoded = JWT.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      next();
    } catch (error) {
      res.status(401).send({
        success: false,
        message: 'Not authorized, token failed',
        error,
      });
    }
};


export const isAdmin = async (req, res, next) =>{
    try{
        const user = await User.findById(req.user._id);
        if (user.role !== 1) {
            res.status(401).send({
            success: false,
            message: 'Not authorized Access',
            });
        }else{
            next();
        }
    }catch(error){
        res.status(401).send({
            success: false,
            message: 'Error in Admin Middleware',
            error,
          });
    }
}