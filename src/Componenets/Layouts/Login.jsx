import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../FireBase/FireBaseConfig';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Login = ({ onSwitch }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            localStorage.setItem(
                'auth',
                JSON.stringify({
                    token: data.user.accessToken,
                    email: data.user.email,
                })
            );

            if (data) {
                navigate('/todo');
            }
        } catch {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="bg-teal-300 p-4 rounded-lg max-w-md w-[280px]">
                <h2 className="text-2xl text-center font-bold mb-6">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Don't have an account?{' '}
                    <Link
                        to='/signup'
                        className="text-indigo-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
