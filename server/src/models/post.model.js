import { Schema, model } from "mongoose";

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    caption: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    }
})

const postModel = model("post", postSchema);
export default postModel;