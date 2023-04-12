import {RequestHandler} from 'express'
import catchAsync from 'express-async-handler'
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import User from "../models/User";

interface SignUpBody {
    username?: string,
    email?: string,
    password?: string
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = catchAsync(async (req, res, next) => {
    const {
        username,
        email,
        password,
    } = req.body



    if(!username || !email || !password) {
        throw createHttpError(400, "Parameter missing")
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await User.create({

        username,
        email,
        password: passwordHash
    })


    req.session.userId = user.id


    res.status(201).json({
        status: true,
        data: user
    })



})

interface LoginBody {
    username?: string,
    password?: string
}


export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = catchAsync(async (req, res, next) => {
    const {
        username,
        password,
    } = req.body



    if(!username || !password) {
        throw createHttpError(400, "Parameter missing")
    }


    const user = await User.findOne({username}).select('+password')


    if(!user) {
        throw createHttpError(401, "Invalid Credentials")
    }

    const checkPassword =  await bcrypt.compare(password, user.password);

    if(!checkPassword) {
        throw createHttpError(401, "Invalid Credentials")
    }


    req.session.userId = user.id


    res.status(200).json({
        status: true,
        data: user
    })



})


export const getAuthenticatedUser: RequestHandler = catchAsync(async (req, res, next) => {


    const user = await User.findById(req.session.userId)

    if(!user) {
        throw createHttpError(401, "Unauthenticated")
    }

    res.status(200).json({
        status: true,
        data: user
    })


})


export const logout: RequestHandler = catchAsync(async (req, res, next) => {
    req.session.destroy(error => {
        if(error) {
             next(error)
        }else {
            return res.sendStatus(200)
        }
    })
})
