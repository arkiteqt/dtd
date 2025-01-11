import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';
import {Mail,LockOutlined} from '@mui/icons-material';

import HeaderBackgroundImg from "../../../img/bg7.jpg";



const Login = ({ setToken }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.token) {
                setToken(data.token);
                setMessage('Login successful!');
                console.log("navigate profile")
                navigate('/dashboard');
            } else {
                setMessage(data.message || 'Login failed');
            }
        } catch (error) {
            setMessage('An error occurred during login.');
        }
    };

    return (
        <div className='login-page sidebar-collapse'> 
            <div className="page-header header-filter" style={{backgroundImage: `url(${HeaderBackgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'top center'}}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-4 col-md-6 ml-auto mr-auto'>
                            <div className="card card-login">
                                <form onSubmit={handleSubmit}>
                                <div className="card-header card-header-primary text-center">
                                    <h4 className="card-title">Log in</h4>
                                    <div className="social-line">
                                    <a href="#pablo" className="btn btn-just-icon btn-link">
                                        <FontAwesomeIcon icon="fab fa-facebook" />
                                    </a>
                                    <a href="#pablo" className="btn btn-just-icon btn-link">
                                        <FontAwesomeIcon icon="fab fa-twitter" />
                                    </a>
                                    <a href="#pablo" className="btn btn-just-icon btn-link">
                                        <FontAwesomeIcon icon="fab fa-google-plus" />
                                    </a>
                                    </div>
                                </div>
                                <p className="description text-center">Or Be Classical</p>
                                <div className="card-body">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <Mail />
                                            </span>
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            className='form-control'
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <LockOutlined />
                                            </span>
                                        </div>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            className='form-control'
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div class="text-center">
                                    <button type="submit" className="btn btn-primary btn-round btn-wd btn-lg">Sign In</button>
                                </div>

                                </form>
                                <p className="description text-center">OR</p>
                                <a href="#" onClick={() => navigate('/register')} className="btn btn-primary btn-link btn-wd btn-lg">Sign Up</a>
                                <p>{message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
