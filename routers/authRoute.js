import express from "express";
import {registerController,ImageRegisterController, loginController, testController, forgotPasswordController} from "../controllers/authController.js";
import {requireSignIn, isAdmin} from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/register", registerController);
router.post("/faceRecognition", ImageRegisterController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);



router.get("/user-auth",requireSignIn, (req, res)=>{
    res.status(200).send({ok: true});
});

//test routers
router.get("/test",requireSignIn,isAdmin, testController);

export default router;