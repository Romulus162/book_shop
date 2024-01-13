import React, { useState } from 'react';

const MusicPage = () => {
  const [showGenres, setShowGenres] = useState(false);
  const [loading, setLoading] = useState(false);
  const [music, SetMusic] = useState([]);

  const toggleGenresPopup = () => {
    setShowGenres(!showGenres);
  };

  {
    return (
      <div className="Music-container">
        <div class="music-info">
          <h4 id="title">ShadowLord</h4>
          <div class="progress-container">
            <div class="progress"></div>
          </div>
        </div>
        <audio src="/tempMusic/Shadowlord.mp3" id="audio"></audio>

        <div class="img-container">
          <img src="/tempMusic/imgthing.jpg" alt="music-cover" id="cover"></img>
        </div>
        <div class="selection">
          <button id="prev" class="action-btn">
            <i class="fas fa=backward"></i>
          </button>
          <button id="play" class="action-btn action-btn-big">
            <i class="fas fa-play"></i>
          </button>
          <button id="forward" class="action-btn">
            // for reference, these fas fa-forwards below and above are from the
            example video, and I am more than certainly just going to get rid of
            them and have my own thing going on
            <i class="fas fa-forward"></i>
          </button>
        </div>
      </div>
    );
  }
};

export default MusicPage;
