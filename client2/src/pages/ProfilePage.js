import React from 'react';

const Profile = () => {
  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-info">
        <img src="profile-picture-url.jpg" alt="Profile" />
        <h2>John Doe</h2>
        <p>Email: meow@cat.com</p>
        <p>About: blahblahblah</p>
      </div>
    </div>
  );
};

export default Profile;
