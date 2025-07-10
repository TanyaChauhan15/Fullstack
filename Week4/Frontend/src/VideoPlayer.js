import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/videos/${id}/`)
      .then(res => setVideo(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!video) return <p>Loading video...</p>;

  return (
    <div className="container">
      <h3>{video.title}</h3>
      <video width="100%" height="500" controls>
        <source src={`http://localhost:8000${video.video_file}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="mt-3">{video.description}</p>

      {/* Placeholder buttons for future functionality */}
      <div className="mt-2">
        <button className="btn btn-outline-primary me-2">👍 Like</button>
        <button className="btn btn-outline-secondary me-2">🔖 Watch Later</button>
        <button className="btn btn-outline-success">🔗 Share</button>
      </div>
    </div>
  );
}

export default VideoPlayer;
