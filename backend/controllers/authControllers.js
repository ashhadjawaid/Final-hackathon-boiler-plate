import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import UserModel from "../models/UserModel.js"
import { createError } from "../utils/error.js"


// -----------Register--------------//
export async function signUp(req, res, next) {
    try {
        // HASHING PASSWORD
        const salt = await bcryptjs.genSalt(15)
        const hashedPassword = await bcryptjs.hash(req.body.password, salt)
        const newUser = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        const { password, ...other } = newUser._doc;
        await newUser.save()
        res.status(201).send({
            status: "success",
            message: "User registerd successfully",
            data: other
        })
    } catch (error) {
        next(error)
    }
}

//-----------Login------------//
export async function login(req, res, next) {
    try {
        const user = await UserModel.findOne({ email: req.body.email }); // FIND BY USERNAME
        // const user = await UserModel.findOne({ email: req.body.email }); // FIND BY EMAIL
        if (!user) {
            next(createError(404, "User not found"))
            return
        };
        const isCorrect = await bcryptjs.compare(req.body.password, user.password);
        if (!isCorrect) {
            next(createError(400, "Incorrect email or password"))
            return
        };
        const token = jwt.sign({ user: user }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
        const { password, isAdmin, ...other } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).send({
            status: "Success",
            message: "User sign in successfully",
            data: other,
            access_token: token
        });
    } catch (error) {
        next(createError(error.status, error.message))
    }
}