import React, { useContext, useEffect, useState } from 'react'
import "./Account.css"
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios'

const Account = () => {

  const { url } = useContext(StoreContext);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    photo: '',
    phone: '',
    address: '',
    gender: '',
    dob: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${url}/api/account/updateaccount`, userInfo)
    .then(response => {
      setUserInfo(response.data);
      setIsEditing(false);
    })
    .catch(error => console.error('Error updating account info: ', error));
  };

  useEffect(() => {
    axios.get(`${url}/api/account/getaccount`)
    .then(response => setUserInfo(response.data))
    .catch(error => console.error('Error fetching account info: ', error));
  }, []);

  return (
    <div className='account-container'>
      <h1>Your Account</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Name:</label>
          <input type="text" value={userInfo.name} disabled={!isEditing} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={userInfo.email} disabled={!isEditing} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input type="text" value={userInfo.phone} disabled={!isEditing} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input type="text" value={userInfo.address} disabled={!isEditing} onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <input type="text" value={userInfo.gender} disabled={!isEditing} onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="date" value={userInfo.dob} disabled={!isEditing} onChange={(e) => setUserInfo({ ...userInfo, dob: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Profile Photo:</label>
          <input type="file" disabled={!isEditing} onChange={(e) => setUserInfo({ ...userInfo, photo: e.target.files[0] })} />
        </div>
      </form>
    </div>
  )
}

export default Account