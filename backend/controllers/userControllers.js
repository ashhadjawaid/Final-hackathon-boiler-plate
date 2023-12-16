import User from "../models/UserModel.js"
import bcryptjs from "bcryptjs";

// UPDATE A USER
// http://localhost:8800/api/users/:userId
export async function updateUser(req, res, next) {
    if (req.user.user._id === req.params.userId) {
        if (req.body.password) {
            try {
                const salt = await bcryptjs.genSalt(10);
                req.body.password = await bcryptjs.hash(req.body.password, salt);
            } catch (error) {
                next(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true });
            const { password, ...other } = user._doc;
            res.status(200).send({
                status: 'success',
                message: 'User updated successfully',
                updatedUser: other
            })
        } catch (error) {
            next(error)
        }
    } else {
        return res.status(401).send('cannot update this account')
    }
}

// DELETE A USER
// http://localhost:8800/api/users/:userId
export async function deleteUser(req, res, next) {
    if (req.params.userId === req.user.user._id) {
        try {
            await User.findByIdAndDelete(req.params.userId)
            res.status(200).send({
                status: "Success",
                message: "Users deleted",
            })
        } catch (error) {
            next(error)
        }

    } else {
        res.status(400).send({
            status: "Fail",
            message: "You can delete only your Account"
        })
    }
    // try {
    //     const userToDelete = await User.findById(req.params.userId)
    //     if (!userToDelete) {
    //         res.status(404).send({
    //             status: "failed",
    //             message: "user not found"
    //         })
    //     } else {
    //         await userToDelete.deleteOne()
    //         res.status(200).send({
    //             status: "success",
    //             message: "User deleted"
    //         })
    //     }
    // }
    // catch (error) {
    //     next(error)
    // }
}

//GET A SINGLE USER
// http://localhost:8800/api/users/:userId
export async function getSingleUser(req, res, next) {
    try {
        const singleUser = await User.findById(req.params.userId)
        const { password, isAdmin, ...other } = singleUser._doc;
        res.status(200).send({
            status: "success",
            message: "user found",
            data: other
        })
    } catch (error) {
        next(error)
    }
}

// GET ALL USER
// http://localhost:8800/api/users/
export async function getAllUser(req, res, next) {
    try {
        let allUser = await User.find()
        let users = [];
        allUser.map((user) => {
            const { _id, username, email } = user
            users.push({ _id, username, email })
        });
        res.status(200).send({
            status: "success",
            message: "List of all Users",
            data: users
        })
    } catch (error) {
        next(error)
    }
}