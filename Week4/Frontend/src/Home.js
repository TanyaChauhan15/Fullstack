import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/videos/')
      .then(res => setVideos(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">📺 All Videos</h3>
      {videos.length === 0 ? (
        <div className="text-muted">No videos uploaded yet.</div>
      ) : (
        <div className="row">
          {videos.map(video => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={video.id}>
              <div className="card shadow-sm border-0">
                <video
                  className="card-img-top"
                  controls
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                  src={`http://localhost:8000${video.video_file}`}
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate">{video.title}</h5>
                  <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                    {video.description.length > 100
                      ? video.description.slice(0, 100) + '...'
                      : video.description}
                  </p>
                  <Link to={`/watch/${video.id}`} className="btn btn-sm btn-danger">
                    ▶ Watch
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
