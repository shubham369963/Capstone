import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "users",
    }
},
{
    timestamps: true,
});

const Image = mongoose.model("images", imageSchema);
export default Image;