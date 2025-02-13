import React, { useContext, useState } from "react";
import "./Account.css";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Account = () => {
  const { userData, setUserData, token, url, loadUserProfileData } =
    useContext(StoreContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        `${url}/api/user/updateProfile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="profile-container">
        {isEdit ? (
          <label htmlFor="image">
            <div className="image-isEdith">
              <img
                className="image-isEdith-one"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <img
                className="image-isedith-two"
                src={image ? "" : assets.upload_icon}
                alt=""
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img className="profile-image" src={userData.image} alt="Profile" />
        )}

        {isEdit ? (
          <input
            className="edit-name-input"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="profile-name">{userData.name}</p>
        )}

        <hr className="divider" />

        <div>
          <p className="section-title">CONTACT INFORMATION</p>
          <div className="info-grid">
            <p className="info-label">Email id:</p>
            <p className="info-value email">{userData.email}</p>

            <p className="info-label">Phone:</p>
            {isEdit ? (
              <input
                className="edit-input"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="info-value phone">{userData.phone}</p>
            )}

            <p className="info-label">Address:</p>
            {isEdit ? (
              <div>
                <input
                  className="edit-input"
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <br />
                <input
                  className="edit-input"
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </div>
            ) : (
              <p className="info-value address">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="section-title">BASIC INFORMATION</p>
          <div className="info-grid">
            <p className="info-label">Gender:</p>
            {isEdit ? (
              <select
                className="edit-select"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
              >
                <option value="Default">Default</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="info-value">{userData.gender}</p>
            )}

            <p className="info-label">BirthDay:</p>
            {isEdit ? (
              <input
                className="edit-input"
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p className="info-value">{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="button-container">
          {isEdit ? (
            <button className="action-button" onClick={updateUserProfileData}>
              Save Information
            </button>
          ) : (
            <button className="action-button" onClick={() => setIsEdit(true)}>
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default Account;
