import express from "express";
import z from "zod"
import jwt from "jsonwebtoken"
import { random } from "./utils.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { contentModel, LinkModel, UserModel, ContentShareModel } from "./db.js";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";
import cors from "cors";



const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ["https://neurovault-phi.vercel.app"]
      : ["http://localhost:5173", "http://localhost:3000", "https://neurovault.vercel.app"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }))


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
      { expiresIn: "30d" } 
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
    const content = req.body.content;

    await contentModel.create({
      link,
      type,
      title,
      content,
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

// Enhanced search endpoint with aggregation
app.get("/api/v1/content/search", userMiddleware, async (req, res) => {
  try {
    //@ts-ignore
    const userId = req.userId;
    const { search, type, sortBy = 'createdAt', order = 'desc' } = req.query;

    // Build aggregation pipeline
    const pipeline: any[] = [
      { $match: { userId: new mongoose.Types.ObjectId(userId) } }
    ];

    // Filter by type
    if (type && type !== 'all') {
      pipeline.push({ $match: { type } });
    }

    // Search in title and content
    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } }
          ]
        }
      });
    }

    // Sort
    const sortOrder = order === 'desc' ? -1 : 1;
    pipeline.push({ $sort: { [sortBy as string]: sortOrder } });

    // Populate user info
    pipeline.push({
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    });

    pipeline.push({
      $unwind: {
        path: '$user',
        preserveNullAndEmptyArrays: true
      }
    });

    const content = await contentModel.aggregate(pipeline);

    res.json({ 
      content,
      count: content.length 
    });
  } catch (e) {
    console.error('Search error:', e);
    res.status(500).json({ message: "Failed to search content" });
  }
});

// Analytics endpoint
app.get("/api/v1/analytics", userMiddleware, async (req, res) => {
  try {
    //@ts-ignore
    const userId = req.userId;

    // Get content by type
    const contentByType = await contentModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { 
        $group: {
          _id: "$type",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Total content count
    const totalContent = await contentModel.countDocuments({ 
      userId: new mongoose.Types.ObjectId(userId) 
    });

    // Content created this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weeklyContent = await contentModel.countDocuments({
      userId: new mongoose.Types.ObjectId(userId),
      createdAt: { $gte: oneWeekAgo }
    });

    res.json({
      totalContent,
      weeklyContent,
      contentByType
    });
  } catch (e) {
    console.error('Analytics error:', e);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
});

app.put("/api/v1/content/:id", userMiddleware, async (req, res) => {
    const contentId = req.params.id;
    const { title, link, type, content } = req.body;
    
    await contentModel.updateOne(
      {
        _id: contentId,
        //@ts-ignore
        userId: req.userId
      },
      {
        $set: {
          ...(title !== undefined && { title }),
          ...(link !== undefined && { link }),
          ...(type !== undefined && { type }),
          ...(content !== undefined && { content })
        }
      }
    );
    res.json({
      message: "Updated"
    });
});

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
  try {
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
      res.json({
        hash: hash
      })
    } else {
      await LinkModel.deleteOne({
        //@ts-ignore
        userId: req.userId
      });
      res.json({
        message: "Removed link"
      })
    }
  } catch (e) {
    res.status(500).json({
      message: "Failed to create share link"
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

// Share single content
app.post("/api/v1/content/:id/share", userMiddleware, async (req, res) => {
  try {
    const contentId = req.params.id;
    
    // Verify content exists and belongs to user
    const content = await contentModel.findOne({
      _id: contentId,
      //@ts-ignore
      userId: req.userId
    });
    
    if (!content) {
      return res.status(404).json({
        message: "Content not found"
      });
    }
    
    // Check if already shared
    const existingShare = await ContentShareModel.findOne({
      contentId: contentId
    });
    
    if (existingShare) {
      return res.json({
        hash: existingShare.hash
      });
    }
    
    // Create new share
    const hash = random(10);
    await ContentShareModel.create({
      hash: hash,
      contentId: contentId,
      //@ts-ignore
      userId: req.userId
    });
    
    res.json({
      hash: hash
    });
  } catch (e) {
    res.status(500).json({
      message: "Failed to create share link"
    });
  }
});

// Get single shared content
app.get("/api/v1/content/shared/:shareLink", async (req, res) => {
  try {
    const hash = req.params.shareLink;
    const share = await ContentShareModel.findOne({ hash });
    
    if (!share) {
      return res.status(404).json({
        message: "Shared content not found"
      });
    }
    
    const content = await contentModel.findById(share.contentId);
    if (!content) {
      return res.status(404).json({
        message: "Content not found"
      });
    }
    
    const user = await UserModel.findById(share.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    
    res.json({
      username: user.username,
      content: content
    });
  } catch (e) {
    res.status(500).json({
      message: "Failed to load shared content"
    });
  }
});


app.listen(3000);