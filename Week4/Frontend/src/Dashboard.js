// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8000/api/videos/', {
      headers: { Authorization: `Token ${token}` }
    }).then(res => {
      const user = JSON.parse(localStorage.getItem('user'));
      const userVideos = res.data.filter(v => v.user === user.id);
      setVideos(userVideos);
    });
  }, []);

  return (
    <div>
      <h3>Your Uploaded Videos</h3>
      {videos.length === 0 ? <p>No uploads yet.</p> : (
        videos.map(v => (
          <div key={v.id}>
            <video src={`http://localhost:8000${v.video_file}`} width="300" controls />
            <p>{v.title}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
