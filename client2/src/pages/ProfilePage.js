import React, { useState, useEffect, useContext } from 'react';
import './ProfilePage.css';
import AuthContext from '../context/Auth-context';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const authContext = useContext(AuthContext);
  const userId = authContext.userId;

  useEffect(() => {
    const fetchUserData = async () => {
      const requestBody = {
        query: `
      query GetUser($userId: ID!) {
        user(userId: $userId) {
          _id
          email
          profilePicture
          description
        }
      }
    `,
        variables: {
          userId: userId,
        },
      };

      try {
        const token = authContext.token;
        const response = await fetch('http://localhost:8000/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',

            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify(requestBody),
        });
        const result = await response.json();
        if (result.data && result.data.user) {
          setUserData(result.data.user);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEditProfile = () => {
    console.log('Edit Profile Clicked');
  };

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div className="profile-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>User Profile</h1>
          <div className="profile-info">
            <img src="profile-picture-url.jpg" alt="Profile" />
            <h2>{userData.email}</h2>
            <p>Email: {userData.email}</p>
            <p>About: {userData.description} </p>

            <button onClick={handleEditProfile} className="edit-profile-btn">
              Edit Profile
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
