import React, { useState, useEffect, useContext } from 'react';
import './ProfilePage.css';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/Auth-context';
import Modal from '../components/ProfModal/Modal';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [newProfilePicture, setNewProfilePicture] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const authContext = useContext(AuthContext);
  const userId = authContext.userId;

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
  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const handleEditProfile = async () => {
    const requestBody = {
      query: `
      mutation UpdateUser($userId: ID!, $userInput: UpdateUserInput) {
        updateUser(userId: $userId, userInput: $userInput) {
          _id
          email
          profilePicture
          description
        }
      }`,
      variables: {
        userId: userId,
        userInput: {
          profilePicture: newProfilePicture,
          description: newDescription,
        },
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
      // if (result.data && result.data.user) {
      //   setUserData(result.data.user);
      // }
      if (result.data && result.data.updateUser) {
        await fetchUserData();
        setIsEditing(false);
      }
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  const showModal = () => {
    if (userData) {
      setIsEditing(true);
      setNewProfilePicture(userData?.profilePicture || '');
      setNewDescription(userData?.description || '');
    } else {
      console.error('User data not loaded yet');
    }
  };

  const hideModal = () => {
    setIsEditing(false);
  };

  const confirmEdit = () => {
    handleEditProfile();
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>User Profile</h1>
          <div className="profile-info">
            <img src="profile-picture-url.jpg" alt="Profile" />
            <h2>{userData.email}</h2>
            <p>Email: {userData.email}</p>
            <p>About: {userData.description} </p>

            <button onClick={showModal} className="edit-profile-btn">
              Edit Profile
            </button>

            {isEditing && (
              <Modal
                title="Edit Profile"
                canCancel
                canConfirm
                onCancel={hideModal}
                onConfirm={confirmEdit}
                confirmText="Save Changes"
              >
                <input
                  type="text"
                  value={newProfilePicture}
                  onChange={e => setNewProfilePicture(e.target.value)}
                  placeholder="New Profile Picture URL"
                />
                <textarea
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="New Description"
                />
              </Modal>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
