import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    video_file: null
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setVideoData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('title', videoData.title);
    formData.append('description', videoData.description);
    formData.append('video_file', videoData.video_file);

    try {
      const res = await axios.post('http://localhost:8000/api/videos/', formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      setMessage('Upload successful!');
    } catch (err) {
      setMessage('Upload failed: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="container">
      <h3>Upload Video</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="text" name="title" placeholder="Title" onChange={handleChange} />
        <textarea className="form-control mb-2" name="description" placeholder="Description" onChange={handleChange}></textarea>
        <input className="form-control mb-2" type="file" name="video_file" accept="video/*" onChange={handleChange} />
        <button className="btn btn-primary" type="submit">Upload</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Upload;
