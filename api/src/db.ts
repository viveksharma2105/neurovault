import mongoose, { Schema, model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL!)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed
const ContentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: false },
  title: { type: String, required: false },
  tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});

/*
const tagSchema = new Schema({
  title: { type: String, required: true, unique: true }
});
*/

const LinkSchema = new Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique:true },
});



export const UserModel =  model("User", UserSchema);
export const contentModel =  model("Content", ContentSchema);
// const tagModel =   model("tags", tagSchema);
export const LinkModel =  model("Links", LinkSchema)


