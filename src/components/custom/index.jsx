import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get the token from localStorage
        const token = localStorage.getItem('authToken');
        if (token) {
            // Fetch user data from the backend
            axios
                .get('/api/auth/user', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send the token in the request header
                    },
                })
                .then((response) => {
                    console.log('User data from backend:', response.data); 
                    setUser(response.data);
                    
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    toast.error('Error fetching user data');
                });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');  
        toast.success('Logged out successfully.');
        navigate('/auth/sign-in');
    };

    return (
        <div className="p-3 px-5 flex justify-between shadow-md">
            <Link to={'/'}>
                <img src="/logo.svg" alt="Logo" width={40} height={40} />
            </Link>

            <div className="flex gap-4 items-center">
                {user ? (
                    <>
                        {/* Display profile card and name if logged in */}
                        <div className="flex items-center gap-2">
                            <img
                                src={user.picture} // Assuming user data includes a picture URL
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                            />
                            <span>Hi, {user.name}</span>
                        </div>
                        <Link to={'/dashboard'}>
                            <Button variant="outline">Dashboard</Button>
                        </Link>
                        <Button variant="outline" onClick={handleLogout}>Log out</Button>
                    </>
                ) : (
                    <>
                        {/* Show Get Started button if not logged in */}
                        <Link to={'/auth/sign-in'}>
                            <Button>Get Started</Button>
                        </Link>
                        <Link to={'/auth/sign-in'}>
                            <Button variant="outline">Sign In</Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
