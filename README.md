# 🧠 NeuroVault

> **Your Brain's Second Home** - A modern, full-stack note-taking application for capturing and organizing all your digital content.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication
- Secure user registration and login
- JWT-based authentication
- Password encryption with bcrypt
- Protected routes and API endpoints

### 📝 Note Management
- **Multiple Content Types**: Links, Text, Video, Articles, Reddit posts, Bookmarks
- **Create, Read, Update, Delete** operations
- **Edit Note Titles** inline with auto-save
- **Type-based Filtering** via sidebar
- **Visual Type Badges** for easy identification

### 🎨 Modern UI/UX
- **Beautiful Dark Theme** Landing page with animated gradients
- **Frosted Glass Design** for auth pages
- **Smooth Animations** and hover effects
- **Responsive Design** - works on all devices
- **Modal-based Authentication** on landing page

### 🔗 Sharing Features
- **Full Vault Sharing** - Share all your notes with a unique link
- **Single Note Sharing** - Share individual notes
- **Public View Pages** for shared content
- **One-click Copy** share links to clipboard

### 🎯 Smart Organization
- Content type filtering (All, Twitter, YouTube, Reddit, Documents, Links)
- Search and organize by tags
- Preview content directly in cards
- Quick actions (Edit, Share, Delete)

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **TailwindCSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Zod** - Schema validation
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **Bruno** - API testing
- **tsx** - TypeScript execution
- **nodemon** - Auto-restart dev server

---

## 📁 Project Structure

```
neurovault/
│
├── 📂 api/                          # Backend application
│   ├── 📂 bruno/                    # API testing collection
│   │   ├── bruno.json
│   │   ├── content.bru
│   │   ├── DataByLink.bru
│   │   ├── Delete.bru
│   │   ├── fetch-content.bru
│   │   ├── Share.bru
│   │   ├── signin.bru
│   │   └── signup.bru
│   │
│   ├── 📂 src/                      # Source code
│   │   ├── config.ts               # Configuration (JWT secret, DB URL)
│   │   ├── db.ts                   # Database schemas and models
│   │   ├── index.ts                # Express server and routes
│   │   ├── middleware.ts           # Auth middleware
│   │   └── utils.ts                # Utility functions
│   │
│   ├── example.env                 # Environment variables template
│   ├── package.json
│   └── tsconfig.json
│
├── 📂 web/                          # Frontend application
│   ├── 📂 public/                   # Static assets
│   │
│   ├── 📂 src/
│   │   ├── 📂 assets/              # Images, GIFs, icons
│   │   │   ├── documentGif.gif
│   │   │   ├── icon.gif (Twitter)
│   │   │   ├── linkGif.gif
│   │   │   ├── logo.gif
│   │   │   ├── reddit.gif
│   │   │   └── youtube.gif
│   │   │
│   │   ├── 📂 components/          # Reusable components
│   │   │   ├── AuthModal.tsx      # Signin/Signup modal
│   │   │   ├── Button.tsx         # Reusable button component
│   │   │   ├── Card.tsx           #  (commented out  just for safe)
│   │   │   ├── CreateContentModal.tsx  # Create note modal
│   │   │   ├── Footer.tsx         # App footer
│   │   │   ├── Navbar.tsx         # App navigation bar
│   │   │   ├── Sidebar.tsx        # Dashboard sidebar with filters
│   │   │   └── SidebarItem.tsx    # Individual sidebar item
│   │   │
│   │   ├── 📂 icons/               # Icon components
│   │   │   ├── CrossIcon.tsx
│   │   │   ├── DocumentIcon.tsx
│   │   │   ├── index.ts           # Icon exports
│   │   │   ├── LinkIcon.tsx
│   │   │   ├── LogoIcon.tsx
│   │   │   ├── PlusIcon.tsx
│   │   │   ├── RedditIcon.tsx
│   │   │   ├── ShareIcon.tsx
│   │   │   ├── TwitterIcon.tsx
│   │   │   └── YouTubeIcon.tsx
│   │   │
│   │   ├── 📂 pages/               # Page components
│   │   │   ├── dashboard.tsx      # Main dashboard (NoteCard here!)
│   │   │   ├── Landing.tsx        # Homepage
│   │   │   ├── SharedView.tsx     # Full vault sharing view
│   │   │   ├── Signin.tsx         # Sign in page
│   │   │   ├── Signup.tsx         # Sign up page
│   │   │   └── SingleSharedView.tsx  # Single note sharing view
│   │   │
│   │   ├── App.tsx                # Root component with routes
│   │   ├── config.tsx             # Backend URL config
│   │   ├── index.css              # Global styles
│   │   ├── main.tsx               # App entry point
│   │   └── vite-env.d.ts          # Vite types
│   │
│   ├── COMMENTED_CODE_SUMMARY.md   # Documentation of commented code
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
└── 📄 README.md                     # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/viveksharma2105/neurovault.git
   cd neurovault
   ```

2. **Setup Backend**
   ```bash
   cd api
   npm install
   
   # Create .env file
   cp example.env .env
   # Edit .env with your MongoDB URL and JWT secret
   
   # Start development server
   npm run dev
   ```
   Server runs on: `http://localhost:3000`

3. **Setup Frontend**
   ```bash
   cd ../web
   npm install
   
   # Start development server
   npm run dev
   ```
   App runs on: `http://localhost:5173`

4. **Open your browser**
   Navigate to `http://localhost:5173`

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Sign Up
```http
POST /signup
Content-Type: application/json

{
  "username": "user123",
  "password": "securepass"
}

Response: { "token": "jwt_token_here" }
```

#### Sign In
```http
POST /signin
Content-Type: application/json

{
  "username": "user123",
  "password": "securepass"
}

Response: { "token": "jwt_token_here" }
```

### Content Endpoints (Protected)

All content endpoints require authentication header:
```
Authorization: Bearer <jwt_token>
```

#### Get All Content
```http
GET /content

Response: { "content": [...] }
```

#### Create Content
```http
POST /content
Content-Type: application/json

{
  "link": "https://example.com",
  "type": "article",
  "title": "My Article",
  "content": "Optional text content",
  "tags": []
}

Response: { "message": "Content created" }
```

#### Update Content
```http
PUT /content/:id
Content-Type: application/json

{
  "title": "Updated Title"
}

Response: { "message": "Content updated" }
```

#### Delete Content
```http
DELETE /content/:id

Response: { "message": "Content deleted" }
```

### Sharing Endpoints

#### Create Full Vault Share
```http
POST /neuro/share
Authorization: Bearer <jwt_token>

Response: { "hash": "unique_share_hash" }
```

#### Get Shared Vault
```http
GET /neuro/:shareHash

Response: { 
  "username": "user123",
  "content": [...]
}
```

#### Share Single Note
```http
POST /content/:id/share
Authorization: Bearer <jwt_token>

Response: { "hash": "unique_note_hash" }
```

#### Get Shared Note
```http
GET /content/shared/:shareHash

Response: { 
  "title": "Note Title",
  "content": "...",
  "type": "text",
  ...
}
```

---

## 🔐 Environment Variables

### Backend (`/api/.env`)

```env
# MongoDB Connection
MONGODB_URL=mongodb://localhost:27017/neurovault
# or for MongoDB Atlas:
# MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/neurovault

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars

# Server Port (optional, defaults to 3000)
PORT=3000
```

### Frontend (`/web/src/config.tsx`)

```typescript
export const BACKEND_URL = "http://localhost:3000"
```

For production, update to your deployed backend URL.

---

## 🗄️ Database Schema

### User Model
```typescript
{
  _id: ObjectId,
  username: String (unique),
  password: String (hashed)
}
```

### Content Model
```typescript
{
  _id: ObjectId,
  link: String (optional),
  type: Enum ['image', 'video', 'article', 'text', 'reddit'],
  title: String,
  content: String (optional, for text notes),
  tags: [{ title: String }],
  userId: ObjectId (ref: User)
}
```

### Link Model (Full Vault Sharing)
```typescript
{
  _id: ObjectId,
  hash: String (unique),
  userId: ObjectId (ref: User)
}
```

### ContentShare Model (Single Note Sharing)
```typescript
{
  _id: ObjectId,
  hash: String (unique),
  contentId: ObjectId (ref: Content),
  userId: ObjectId (ref: User)
}
```

---

## 🎨 Design System

### Color Palette
- **Primary**: Emerald (#10b981) → Cyan (#06b6d4) → Violet (#8b5cf6)
- **Background**: Slate (50-900)
- **Text**: Gray/White
- **Accents**: Green (success), Red (delete), Blue (edit)

### Component Styles
- **Cards**: `bg-white rounded-2xl shadow-md hover:shadow-2xl`
- **Buttons**: Gradient backgrounds with hover effects
- **Inputs**: Rounded with focus rings
- **Modals**: Frosted glass effect with backdrop blur

---

## 📝 Development Notes

### Known Issues & TODOs

1. **Sidebar Filter Mismatch** ⚠️
   - Sidebar uses: `twitter`, `youtube`, `reddit`, `document`, `links`
   - Database types: `image`, `video`, `article`, `text`, `reddit`
   - Filter mapping needs correction

2. **Unused Components**
   - `Card.tsx` - Commented out, replaced by `NoteCard`
   - `Input.tsx` - Not used, safe to delete
   - Twitter widget loader - Commented out

3. **Color Scheme Migration**
   - Button component still uses old purple colors
   - Should migrate to emerald/cyan/violet palette

### Recent Changes
- ✅ Removed photo note type
- ✅ Fixed text note creation bug
- ✅ Added single note sharing feature
- ✅ Implemented modal-based authentication
- ✅ Redesigned landing page with new color scheme

---

## 🧪 Testing

API tests are available in `/api/bruno/` directory.

To run tests:
1. Install [Bruno](https://www.usebruno.com/)
2. Open the `/api/bruno/` collection
3. Run individual requests or the entire collection

---

## 🚢 Deployment

### Backend Deployment (Recommended: Railway, Render, Heroku)

1. Set environment variables on hosting platform
2. Update MongoDB URL to production database
3. Deploy from `/api` directory

### Frontend Deployment (Recommended: Vercel, Netlify)

1. Update `BACKEND_URL` in `/web/src/config.tsx`
2. Build: `npm run build`
3. Deploy `/web/dist` directory

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Vivek Sharma**
- GitHub: [@viveksharma2105](https://github.com/viveksharma2105)

---

## 🙏 Acknowledgments

- React and TypeScript communities
- TailwindCSS for the amazing utility-first CSS framework
- MongoDB for flexible data storage
- All open-source contributors

---

## 📞 Support

If you have any questions or run into issues, please:
- Open an issue on GitHub
- Check the [COMMENTED_CODE_SUMMARY.md](/web/COMMENTED_CODE_SUMMARY.md) for code documentation

---

<div align="center">

**Made with ❤️ and ☕ by Vivek Sharma**

⭐ Star this repo if you find it helpful!

</div>
