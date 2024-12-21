import React, { useEffect, useState } from 'react';

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
        <div>
            <h2>Profile</h2>
            <p>Username: {profile.Username}</p>
            <p>Email: {profile.Email}</p>
            <p>Created At: {profile.CreatedAt}</p>
        </div>
    );
};

export default Profile;
