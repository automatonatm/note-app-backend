import { RequestHandler } from "express";
import Note from "../models/Note";
import createError from "http-errors";
import catchAsync from "express-async-handler";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import {assertIsDefined} from "../util/assertIsDefined";

export const getNotes: RequestHandler = async (req, res, next) => {

  const authenticatedUserId = req.session.userId

  try {

    assertIsDefined(authenticatedUserId)

    const notes = await Note.find({user: authenticatedUserId});
    res.status(200).json({
      status: true,
      data: notes
    });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = catchAsync(async (req, res, next) => {
  const { title, text } = req.body;

  try {
    if (!title) {
      throw createError(400, "title is required");
    }

    const note = await Note.create({
      user: req.session.userId,
      title,
      text,
    });

    res.status(201).json({
      status: true,
      data: note
    });
    
  } catch (error) {
    next(error);
  }
});

export const getNote: RequestHandler = catchAsync(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    throw createError(400, "Invalid path params");
  }

  const note = await Note.findById(req.params.id);

  if (!note) {
    throw createError(404, "Note not found");
  }

  res.status(200).json(note);
});

interface updateNoteParams {
  id: string;
}

interface UpdateNoteBody {
  title: string;
  text?: string;
}

export const updateNote: RequestHandler<
  updateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = catchAsync(async (req, res, next) => {
  
  const { id } = req.params;

  const { title , text} = req.body;

  if (!mongoose.isValidObjectId(id)) {
    throw createError(400, "Invalid path params");
  }

  const note = await Note.findById(req.params.id);

  if (!note) {
    throw createError(404, "Note not found");
  }

  note.title = title;
  note.text = text;

  const saveNote = await note.save();

  res.status(200).json(saveNote);

  // ok
});



export const deleteNote: RequestHandler = catchAsync(async (req, res, next) => {

  if (!mongoose.isValidObjectId(req.params.id)) {
    throw createError(400, "Invalid path params");
  }

  const note = await Note.findByIdAndDelete(req.params.id)

  if (!note) {
    throw createError(404, "Note not found");
  }

  res.sendStatus(204) 


});
