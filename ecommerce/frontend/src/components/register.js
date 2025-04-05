import React, { useState } from "react";
import axios from "axios"; 
import "./register.css";
import { useNavigate } from "react-router";
const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState(""); 
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            setErrorMessage("All fields are required");
            setSuccessMessage(""); 
            return;
        }
        if (formData.password.length < 6) {
            setErrorMessage("Enter atleast 6 characters");
            setSuccessMessage(""); 
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/api/users/register", formData);
            setSuccessMessage(response.data.message);
            setErrorMessage("");
            setFormData({ name: "", email: "", password: "" }); 
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
           
            setErrorMessage(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : "Something went wrong"
            );
            setSuccessMessage(""); 
        }
    };
    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password"  id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Register</button>
                {errorMessage && <p className="error">{errorMessage}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
        <p className="login-link">
          Already have an account? <span onClick={() => navigate('/login')}>Sign In</span>
        </p>
            </form>
        </div>
    );
};
export default Register;