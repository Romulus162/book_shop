import React from 'react';
import './ProfilePage.css';

const Profile = () => {
  const handleEditProfile = () => {
    console.log('Edit Profile Clicked');
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-info">
        <img src="profile-picture-url.jpg" alt="Profile" />
        <h2>John Doe</h2>
        <p>Email: meow@cat.com</p>
        <p>About: blahblahblah</p>

        <button onClick={handleEditProfile} className="edit-profile-btn">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
