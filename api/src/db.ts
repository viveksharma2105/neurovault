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


const contentTypes = ['image', 'video', 'article', 'audio', 'text', 'reddit']; 
const ContentSchema = new Schema({
  link: { type: String, required: false },
  type: { type: String, enum: contentTypes, required: false },
  title: { type: String, required: false },
  content: { type: String, required: false },
  tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});



const LinkSchema = new Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique:true },
});

const ContentShareSchema = new Schema({
  hash: { type: String, required: true, unique: true },
  contentId: { type: mongoose.Types.ObjectId, ref: 'Content', required: true },
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});



export const UserModel =  model("User", UserSchema);
export const contentModel =  model("Content", ContentSchema);
export const LinkModel =  model("Links", LinkSchema)
export const ContentShareModel = model("ContentShare", ContentShareSchema)


