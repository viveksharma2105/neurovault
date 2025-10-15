import express from "express";
import z, { hash } from "zod"
import jwt from "jsonwebtoken"
import { random } from "./utils.js";
import bcrypt from "bcrypt";
import { contentModel, LinkModel, UserModel } from "./db.js";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";
import cors from "cors";



const app = express();
app.use(express.json());
app.use(cors())


const authSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

app.post("/api/v1/signup", async (req, res) => {
  try {
    
    const parsedData = authSchema.parse(req.body);
    const { username, password } = parsedData;

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    await UserModel.create({
      username: username,
      password: hashedPassword,
    });

    res.json({
      message: "User signed up",
    });
  } catch (e) {
    
    if (e instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: e.issues,
      });
    }

    
    res.status(411).json({
      message: "User already exists",
    });
  }
});


app.post("/api/v1/signin", async (req, res) => {
  try {
    
    const parsedData = authSchema.parse(req.body);
    const { username, password } = parsedData;

    
    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
      return res.status(403).json({ message: "Incorrect Credentials" });
    }

    
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Incorrect Credentials" });
    }

    
    const token = jwt.sign(
      { id: existingUser._id },
      JWT_PASSWORD,
      { expiresIn: "1h" } 
    );

    res.json({ token });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: e.issues, 
      });
    }

    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/api/v1/content",userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;

    await contentModel.create({
      link,
      type,
      title,
      //@ts-ignore
      userId: req.userId,
      tags:[]
    })
     res.json({
      message: "Content added"
    })
})

app.get("/api/v1/content",userMiddleware, async (req, res) => {
  //@ts-ignore
    const userId = req.userId;
    const content = await contentModel.find({
      userId:userId
    }).populate("userId","username")
    res.json({
      content
    })
})

app.delete("/api/v1/content/:id", userMiddleware, async (req, res) => {
    const contentId = req.params.id;
    await contentModel.deleteOne({
      _id: contentId,
      //@ts-ignore
      userId: req.userId
    });
    res.json({
      message: "Deleted"
    });
});

app.post("/api/v1/neuro/share",userMiddleware, async (req, res) =>{
const share = req.body.share;
if (share) {
  const existingLinks = await LinkModel.findOne({
    //@ts-ignore
    userId: req.userId
  });
  if (existingLinks) {
     res.json({
  hash: existingLinks.hash
  })
    return;
  }
  const hash = random(10);
  await LinkModel.create({
    //@ts-ignore
    userId: req.userId,
    hash: hash
  })
 
}else{
  await LinkModel.deleteOne({
    //@ts-ignore
    userId: req.userId
  });
  res.json({
    message: "Removed link"
  })
}



})

app.get("/api/v1/neuro/:shareLink", async (req, res) =>{
    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({
      hash
    });
    if (!link) {
      res.status(411).json({
        message: "Sorry Incorrect Input"
      })
      return
      
    }
    const content = await contentModel.find({
      userId: link.userId
    })
    const user = await UserModel.findOne({
      _id:link.userId
    })
    if (!user) {
       res.status(411).json({
        message: "User not Found,error"
      })
      return
    }
    res.json({
      username:user.username,
      content: content
    })
})


app.listen(3000);