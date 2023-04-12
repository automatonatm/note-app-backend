import {InferSchemaType, model, Schema} from "mongoose";


const noteSchema = new Schema(
  {
      user: {
         type: Schema.Types.ObjectId,
         required: true
      },
    title: {
      type: String,
      required: true
    },

    text: {
      type: String
    }

  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

type Note = InferSchemaType<typeof noteSchema>

export default model<Note>('Note', noteSchema)