const express = require('express');
const { getYouTubeStats, searchYouTubeChannels } = require('../controllers/youtubeController');
const authMiddleware = require('../middleware/authMiddleware');

const multer = require("multer");
const { google } = require("googleapis");
const fs = require("fs");

const router = express.Router();

// 🔥 Multer setup
const upload = multer({ dest: "uploads/" });

// All routes are protected
router.use(authMiddleware);

// ================= EXISTING ROUTES =================

// @route   GET /api/youtube/stats
router.get('/stats', getYouTubeStats);

// @route   GET /api/youtube/search
router.get('/search', searchYouTubeChannels);

// ================= NEW UPLOAD ROUTE =================

// @route   POST /api/youtube/upload
router.post('/upload', upload.single("video"), async (req, res) => {
  try {
    console.log("Upload route hit ✅");

    // ❌ file missing
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded ❌"
      });
    }

    // 🔥 token safely get
    let token = null;

    // 👉 from middleware (preferred)
    if (req.youtubeToken) {
      token = req.youtubeToken;
    } 
    // 👉 fallback (your existing logic)
    else if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No YouTube token ❌"
      });
    }

    console.log("Token received ✅");

    // 🔥 YouTube auth
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: token });

    const youtube = google.youtube({ version: "v3", auth });

    // 🔥 upload video
    const response = await youtube.videos.insert({
      part: "snippet,status",
      requestBody: {
        snippet: {
          title: req.body.title || "Untitled Video",
          description: req.body.description || "",
        },
        status: {
          privacyStatus: "public",
        },
      },
      media: {
        body: fs.createReadStream(req.file.path),
      },
    });

    // ✅ delete temp file
    fs.unlinkSync(req.file.path);

    console.log("Upload success ✅");

    res.json({
      success: true,
      videoId: response.data.id,
      message: "Video uploaded successfully 🚀"
    });

  } catch (err) {
    console.error("UPLOAD ERROR 🔥:", err?.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: err?.response?.data || err.message
    });
  }
});

module.exports = router;