import { Router } from "express";
import { delete_User, getAll, getSingleUser, login, otp_generator, register, update, updateEmail, } from "../Controllers/user.controller.js";
import { upload } from "../Middleware/middleware.js";
import { isAdmin } from "../Middleware/isAdmin.js";
const router = Router();

router.route('/').post(
upload.single('profilePic'),
    register
)
router.route('/login').post(login)
router.route('/update/:id').post(
    upload.single('profilePic'),
    update
)
router.route('/delete/:id').post(isAdmin, delete_User)
router.route('/email').post(updateEmail)
router.route('/otp').post(otp_generator)
router.route('/alldata').get(getAll)
router.route('/getSingleUser').get(getSingleUser)
export {
    router
}