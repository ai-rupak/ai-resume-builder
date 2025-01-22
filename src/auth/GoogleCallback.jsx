import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify

const GoogleCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            // Save the token to localStorage or a cookie
            localStorage.setItem('authToken', token);

            // Display success toast
            toast.success('Login successful!');

            // Redirect to the dashboard
            navigate('/dashboard');
        } else {
            // Handle missing token or errors
            toast.error('Login failed, please try again.');
            navigate('/auth/sign-in');
        }
    }, [navigate]);

    return null; // Render nothing, just redirect
};

export default GoogleCallback;
