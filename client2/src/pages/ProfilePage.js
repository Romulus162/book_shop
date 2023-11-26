import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

//this entire page is just a huge mess

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const query = `
    query {
      *this is where the query schema request goes but it doesn't exist yet*
    }`;

      const response = await fetch('http://localhost:8000/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
        //gonnna need to verify token here somewhere
      });

      const result = await response.json();
      setUserData('need to fetch currentUser Data');
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    console.log('Edit Profile Clicked');
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

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
