import {RequestHandler} from "express";
import catchAsync from "express-async-handler"
import createHttpError from "http-errors";

export const requireAuth: RequestHandler = catchAsync(async (req, res, next) => {
    if(req.session.userId) {
        next()
    }else  {
        next(createHttpError(401, "User not authenticated"))
    }
})