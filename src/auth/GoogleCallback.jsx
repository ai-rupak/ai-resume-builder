import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const GoogleCallback = () => {
    const navigate = useNavigate();
    const { fetchUserData } = useAuth();

    useEffect(() => {
        const handleCallback = async () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');

            if (token) {
                try {
                    localStorage.setItem('authToken', token);
                    await fetchUserData(token);
                    toast.success('Login successful!');
                    navigate('/dashboard');
                } catch (error) {
                    localStorage.removeItem('authToken');
                    toast.error('Authentication failed');
                    navigate('/auth/sign-in');
                }
            }
             
            // else {
            //     toast.error('Login failed, please try again.');
            //     navigate('/auth/sign-in');
            // }
        };

        handleCallback();
    }, [navigate, fetchUserData]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );
};

export default GoogleCallback;