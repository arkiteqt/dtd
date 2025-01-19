import React, { useEffect, useState } from 'react';

import ProfilePhoto from '../../../img/faces/christian.jpg';
import HeaderBackgroundImg from "../../../img/city-profile.jpg";

const Dashboard = ({ token, logout }) => {
    const [profile, setProfile] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [error, setError] = useState('');

    // Toggle dropdown visibility
    const toggleDropdown = (menu) => {
        setActiveDropdown((prev) => (prev === menu ? null : menu));
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:3000/users/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                } else {
                    setError('Failed to fetch profile.');
                }
            } catch (err) {
                setError('An error occurred while fetching the profile.');
            }
        };
        fetchProfile();
    }, [token]);

    if (error) return <p>{error}</p>;
    if (!profile) return <p>Loading Dashboard...</p>;
    return (
        <div className='login-page sidebar-collapse'> 
            <nav className="navbar navbar-color-on-scroll navbar-transparent fixed-top  navbar-inverse navbar-expand-lg">
                <div className="container">
                    <div className="navbar-translate">
                        <a className="navbar-brand" href="#0">The MobiDev</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="navbar-toggler-icon"></span>
                            <span className="navbar-toggler-icon"></span>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="active nav-item">
                                <a href="#pablo" className="nav-link">
                                Discover
                                </a>
                            </li>
                            <li className="dropdown nav-item">
                                <a onClick={() => toggleDropdown('menu1')}  className="profile-photo dropdown-toggle nav-link" data-toggle="dropdown">
                                    <div className="profile-photo-small">
                                        <img src={ProfilePhoto} alt="Circle Image" className="rounded-circle img-fluid" />
                                    </div>
                                </a>
                                <div className={`dropdown-menu dropdown-menu-right ${activeDropdown === 'menu1' ? 'show' : ''}`}>
                                    <h6 className="dropdown-header">Dropdown header</h6>
                                    <a href="#pablo" className="dropdown-item">Me</a>
                                    <a href="#pablo" className="dropdown-item">Settings and other stuff</a>
                                    <a onClick={() => logout()}className="dropdown-item">Sign out</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="page-header header-filter" style={{backgroundImage: `url(${HeaderBackgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'top center'}}>
                <div className='container'>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
