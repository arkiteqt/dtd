import React, { useEffect, useState } from 'react';

import ProfilePhoto from '../../../img/faces/christian.jpg';
import HeaderBackgroundImg from "../../../img/city-profile.jpg";

const Profile = ({ token }) => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

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
    if (!profile) return <p>Loading profile...</p>;

    return (
        <div className="profile-page">
             <div class="page-header header-filter" data-parallax="true" style={{backgroundImage: `url(${HeaderBackgroundImg})`}}></div>
            <div className='main main-raised'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 ml-auto mr-auto'>
                            <div className='profile'>
                                <div className="avatar">
                                    <img src={ProfilePhoto} alt="Circle Image" className="img-raised rounded-circle img-fluid" />
                                </div>
                                <div className="name">
                                    <h3 className="title">@{profile.Username}</h3>
                                    <h6>Designer</h6>
                                    <a href="#pablo" className="btn btn-just-icon btn-link btn-dribbble"><i className="fa fa-dribbble"></i></a>
                                    <a href="#pablo" className="btn btn-just-icon btn-link btn-twitter"><i className="fa fa-twitter"></i></a>
                                    <a href="#pablo" className="btn btn-just-icon btn-link btn-pinterest"><i className="fa fa-pinterest"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
