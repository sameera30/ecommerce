import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";

//done with the help of AI
const Profile = () => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(""); 
    const [isEditing, setIsEditing] = useState(false); 
    const [editFormData, setEditFormData] = useState({ name: "", email: "" }); 

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("You need to log in to access this page.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get("/api/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleEditClick = () => {
        setEditFormData({ name: user.name, email: user.email }); 
        setIsEditing(true); 
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleSaveClick = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.put(
                "/api/profile",
                { ...editFormData },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUser(response.data); 
            setIsEditing(false); 
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update profile.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            {isEditing ? (
                <div className="edit-form">
                    <div>
                        <label>Name:                                                                </label>
                        <input type="text" name="name" value={editFormData.name} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label>Email:                                                                  </label>
                        <input type="email" name="email" value={editFormData.email} onChange={handleInputChange} />
                    </div>
                    <button className="button-edit" onClick={handleSaveClick}>Save</button>
                    <button className="button-edit" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p><strong>Name:                   </strong> {user.name}</p>
                    <p><strong>Email:                  </strong> {user.email}</p>
                    <button className="button-edit" onClick={handleEditClick}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
