import React, { useState } from "react";

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);
    formData.append("description", description);

    await fetch("http://localhost:5000/api/youtube/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("youtube_token")}`
      },
      body: formData
    });

    alert("Video Uploaded 🚀");
  };

  return (
    <div className="p-6">
      <h2>Upload Video</h2>

      <input type="text" placeholder="Title"
        onChange={(e) => setTitle(e.target.value)} />

      <textarea placeholder="Description"
        onChange={(e) => setDescription(e.target.value)} />

      <input type="file"
        onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadVideo;