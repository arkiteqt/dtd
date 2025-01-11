import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Group, Mail, Code, Face, LockOutlined, Timeline} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Register = ({ setToken }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (data.token) {
                console.log(data.token)
                setToken(data.token); // Automatically log in the user
                setMessage('Registration successful!');
                navigate('/profile'); // Redirect to profile page
            } else {
                setMessage(data.message || 'Registration failed.');
            }
        } catch (error) {
            setMessage('An error occurred during registration.');
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-10 ml-auto mr-auto'>
                    <div className="card card-signup">
                    <h2 className="card-title text-center">Register</h2>
                    <p className="text-center">Have an account already? <a href="#" onClick={() => navigate('/login')}>Sign in</a></p>
                    <div className="card-body">
                    <div className="row">
                        <div className="col-md-5 ml-auto">
                            <div className="info info-horizontal">
                                <div className="icon icon-rose">
                                    <Timeline />
                                </div>
                                <div className="description">
                                <h4 className="info-title">Marketing</h4>
                                <p className="description">
                                    We've created the marketing campaign of the website. It was a very interesting collaboration.
                                </p>
                                </div>
                            </div>
                            <div className="info info-horizontal">
                                <div className="icon icon-primary">
                                    <Code />
                                </div>
                                <div className="description">
                                <h4 className="info-title">Fully Coded in HTML5</h4>
                                <p className="description">
                                    We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub.
                                </p>
                                </div>
                            </div>
                            <div className="info info-horizontal">
                                <div className="icon icon-info">
                                {/* <i className="material-icons">group</i> */}
                                <Group />
                                </div>
                                <div className="description">
                                <h4 className="info-title">Built Audience</h4>
                                <p className="description">
                                    There is also a Fully Customizable CMS Admin Dashboard for this product.
                                </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 mr-auto">
                        <div className="social text-center">
                            <button className="btn btn-just-icon btn-round btn-twitter">
                                <FontAwesomeIcon icon="fab fa-twitter" />
                            </button>
                            <button className="btn btn-just-icon btn-round btn-facebook">
                                <FontAwesomeIcon icon="fab fa-facebook" />
                            </button>
                            <h4> or be classical </h4>
                        </div>
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <Face />
                                </span>
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    className='form-control'
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            </div>
                            <div className="form-group">
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
                            </div>
                            <div className="form-group">
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
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            </div>
                            <div className="form-check">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" value="" checked />
                                <span className="form-check-sign">
                                <span className="check"></span>
                                </span>
                                I agree to the
                                <a href="#something"> terms and conditions</a>.
                            </label>
                            </div>
                            <div className="text-center">
                            <button className="btn btn-primary btn-round">Get Started</button>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
