# Creator-Mitra

A professional full-stack MERN (MongoDB, Express.js, React, Node.js) social media analytics dashboard for creators. Track your YouTube and Instagram performance with comprehensive analytics and insights.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with TailwindCSS and Framer Motion animations
- **Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **YouTube Analytics**: Track subscribers, views, likes, comments, and video performance
- **Instagram Analytics**: Monitor followers, engagement rate, post performance, and hashtag analytics
- **Interactive Charts**: Beautiful data visualizations using Recharts
- **Real-time Data**: Live analytics from YouTube Data API v3 and Instagram Graph API
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Axios** - HTTP client for API calls

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Recharts** - Chart library
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library

## 📁 Project Structure

```
creator-mitra/
├── server/                 # Backend
│   ├── config/
│   │   └── db.js          # Database configuration
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── youtubeController.js
│   │   └── instagramController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── youtubeRoutes.js
│   │   └── instagramRoutes.js
│   ├── package.json
│   └── server.js
├── client/                 # Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- YouTube Data API v3 key
- Instagram Graph API access token

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd creator-mitra
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/creator-mitra
   JWT_SECRET=your_jwt_secret_key_here
   YOUTUBE_API_KEY=your_youtube_api_key_here
   INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
   PORT=5000
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5000) and frontend development server (port 3000).

### API Keys Setup

#### YouTube Data API v3
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Add the API key to your `.env` file

#### Instagram Graph API
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Instagram Basic Display product
4. Generate access token
5. Add the access token to your `.env` file

## 📊 Available Scripts

### Root Level
- `npm run dev` - Start both backend and frontend in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend client
- `npm run build` - Build the frontend for production
- `npm run install-all` - Install dependencies for both backend and frontend

### Backend (server/)
- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon

### Frontend (client/)
- `npm start` - Start the development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/user/profile` - Get user profile

### YouTube Analytics
- `GET /api/youtube/stats?channelId={id}` - Get YouTube channel statistics
- `GET /api/youtube/search?query={query}` - Search YouTube channels

### Instagram Analytics
- `GET /api/instagram/stats?accountId={id}` - Get Instagram account statistics
- `GET /api/instagram/insights?accountId={id}` - Get Instagram insights

## 🎨 UI Components

- **Navbar** - Top navigation with authentication state
- **Sidebar** - Dashboard navigation sidebar
- **Cards** - Reusable card components with animations
- **Charts** - Interactive data visualizations
- **Forms** - Styled form components with validation

## 🔐 Authentication Flow

1. User registers/logs in
2. JWT token is generated and stored
3. Token is sent with each API request
4. Protected routes check for valid token
5. User data is stored in MongoDB

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Connect to GitHub repository
4. Enable automatic deploys

### Frontend Deployment (Netlify/Vercel)
1. Build the frontend: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Set environment variables for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed description
4. Contact support at support@creator-mitra.com

## 🎯 Roadmap

- [ ] Advanced analytics and insights
- [ ] Custom report generation
- [ ] Team collaboration features
- [ ] Mobile app (React Native)
- [ ] More platform integrations (TikTok, Twitter)
- [ ] AI-powered content recommendations

---

**Creator-Mitra** - Empowering Creators with Smart Analytics 🚀
"# creator-mitra" 
"# major_project" 
