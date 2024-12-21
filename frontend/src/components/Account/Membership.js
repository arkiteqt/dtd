import React, { useState } from 'react';

const Membership = ({ token }) => {
    const [activationToken, setActivationToken] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/membership/activate/${activationToken}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setMessage(data.message || 'Activation successful!');
        } catch (error) {
            setMessage('An error occurred during activation.');
        }
    };

    return (
        <div>
            <h2>Activate Membership</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Activation Token"
                    value={activationToken}
                    onChange={(e) => setActivationToken(e.target.value)}
                    required
                />
                <button type="submit">Activate</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Membership;
