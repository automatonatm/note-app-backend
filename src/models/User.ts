import {InferSchemaType, model, Schema} from "mongoose";


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true,
            select: false
        }

    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);

type User = InferSchemaType<typeof userSchema>

export default model<User>('User', userSchema)