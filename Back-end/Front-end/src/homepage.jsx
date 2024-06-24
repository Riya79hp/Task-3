import React, { useEffect, useState } from 'react';
import SkeletonLoader from './skeleton'; 

const defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7U_ef87Q7CQ1Fx_khkPq-y9IfPmBWrMZ6ig&s';

const Homepage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [closing, setClosing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false); // Add a state for profile loading
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();

        const updatedUsers = data.map(user => {
          if (parseInt(user.id) >= 2 && parseInt(user.id) <= 10) {
            return {
              ...user,
              avatar: defaultAvatar
            };
          }
          return user;
        });

        setUsers(updatedUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const openImagePopup = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImagePopup = () => {
    setSelectedImage(null);
  };

  const fetchUserProfile = async (userId) => {
    setClicked(true);
    setClosing(false); // Reset closing state if it was set
    setProfileLoading(true); // Start profile loading
    try {
      const response = await fetch(`https://602e7c2c4410730017c50b9d.mockapi.io/users/${userId}`);
      const userData = await response.json();

      if (userData) {
        setSelectedUser(userData);
        setProfileLoading(false); 
      } else {
        console.error('User profile not found for userId:', userId);
        setProfileLoading(false); 
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      setProfileLoading(false); 
    }
  };

  const toggleNightMode = () => {
    document.body.style.backgroundColor = isNightMode ? 'black' : 'rgb(231, 224, 224)';
    setIsNightMode(prevMode => !prevMode);
  };

  const closeProfileTab = () => {
    setClosing(true);
    setTimeout(() => {
      setClicked(false);
      setSelectedUser(null);
      setClosing(false); // Ensure closing state is reset after animation
    }, 700); // Match the animation duration
  };

  if (loading) {
    return (
      <div className="toaster">
        <div className="cover">
          <div className="b1"></div>
          <div className="b2"></div>
          <div className="b3"></div>
          <div className="shine"></div>
        </div>
        <div className="slot1"></div>
        <div className="slot2">
          <div className="handle1">
            <div className="handle2"></div>
            <div className="handle3"></div>
          </div>
        </div>
        <div className="base2"></div>
        <div className="base1"></div>
        <div className="l1"></div>
        <div className="l2"></div>
        <div className="l3"></div>
        <div className="l4"></div>
        <div className="toastl1">
          <div className="toastl2"></div>
          <div className="toastu1"></div>
          <div className="toastu2"></div>
        </div>
        <div className="toastl3">
          <div className="toastl4"></div>
          <div className="toastu3"></div>
          <div className="toastu4">Please wait</div>
          
        </div>
        <div style={{marginTop:'0px'}}>Loading...</div>
      </div>
     
    );
  }

  return (
    <>
    
      <nav className={`navbar ${isNightMode ? 'night-mode' : ''}`}>
        <div className="navbar-brand">User List</div>
        <div className="navbar-icons">
          <span onClick={toggleNightMode} className={`mode-icon ${isNightMode ? 'night' : 'day'}`}>
            {isNightMode ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
          </span>
        </div>
      </nav>
      <div className="users-container">
        <ul className="user-list">
          {users.map((user, index) => (
            <li key={index} className="user-item">
              <div className="avatar" onClick={() => openImagePopup(user.avatar || defaultAvatar)}>
                <img src={user.avatar || defaultAvatar} alt="User Avatar" />
              </div>
              <div className="user-info">
                <p className="user-bio">{user.profile.username}</p>
                <p className="user-email">{user.jobTitle}</p>
              </div>
              <button className="view-profile-btn" onClick={() => fetchUserProfile(user.id)}>View Profile</button>
            </li>
          ))}
        </ul>
      </div>

      {selectedImage && (
        <div className="image-popup">
          <div className="image-popup-content">
            <span className="close-popup" onClick={closeImagePopup}>&times;</span>
            <img src={selectedImage} alt="Full Size Avatar" />
          </div>
        </div>
      )}

      <div className={`profile-tab ${clicked ? 'open' : ''} ${closing ? 'closing' : ''}`}>
        <div className="profile-tab-content">
          <span className="close-profile-tab" onClick={closeProfileTab}>&times;</span>
          <div style={{display:'flex',alignItems:'center',gap:'20px',fontFamily:'cursive',justifyContent:'center'}}><i className="fas fa-user"></i> <h2>User Profile</h2></div>
          {profileLoading ? (
            <SkeletonLoader /> 
          ) : (
            selectedUser && (
              <div className="profile-details">
                <img className="profile-avatar" src={selectedUser.avatar} alt="Avatar" />
                <div className="profile-details">
  <div className="profile-section-name">
   
   {selectedUser.profile.firstName} {selectedUser.profile.lastName}
  </div>
  <div className="profile-section-username">
 
    <i className="fas fa-at"></i>{selectedUser.profile.username}
  </div>

  <div className="profile-section">
 <div> 
<p style={{fontSize:'18px'}}> <i class="fa fa-book" aria-hidden="true" ></i>Bio</p>
    {selectedUser.Bio}</div>
  </div>
  <div className="profile-section">
 
 <i className="fas fa-briefcase"></i>{selectedUser.jobTitle}
</div>
  <div className="profile-section">

 
    <i className="fas fa-envelope"></i>{selectedUser.profile.email}
  </div>
  <div className="profile-section">
 
  <i class="fa-solid fa-clock"></i>{selectedUser.createdAt}
</div>
 
  <div style={{display:'flex',gap:'10px'}}><button className='Connectbtn'>Connect <i class="fa-solid fa-user-group"></i><i class="fa-solid fa-plus"></i></button>  <button  className='Messagebtn'>Message <i class="fa-solid fa-paper-plane"></i></button></div>
</div>

              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Homepage;
