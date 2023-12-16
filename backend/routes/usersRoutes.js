import express from 'express';
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userControllers.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/tokenVerification.js';

const usersRoutes = express.Router();

usersRoutes.get('/checktoken', verifyToken, (req, res, next) => {
    res.send('you are logged in')
})

usersRoutes.get('/checkuser/:id', verifyUser, (req, res, next) => {
    res.send('hello user you are authenticated')
})

usersRoutes.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
    res.send('hello admin you are authenticated')
})

// UPDATE
usersRoutes.put('/:userId', verifyUser, updateUser)
//usersRoutes.put('/:userId', updateUser) //WITHOUT TOKEN

// DELETE
usersRoutes.delete('/:userId', verifyUser, deleteUser)
//usersRoutes.delete('/:userId', deleteUser) //WITHOUT TOKEN

// GET
usersRoutes.get('/:userId', verifyToken, getSingleUser)
//usersRoutes.get('/:userId', getSingleUser) //WITHOUT TOKEN

// GET ALL
// usersRoutes.get('/', verifyAdmin, getAllUser)
usersRoutes.get('/', getAllUser) //WITHOUT TOKEN


export default usersRoutes