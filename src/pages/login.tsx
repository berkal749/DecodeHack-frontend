import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, setAuthToken } from '@/lib/api';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const loginUser = async () => {
    if (loading) return;

    setLoading(true);
    setLoginError('');

    try {
      const response = await authAPI.login(email, password);

      if (response.data.success) {
        const userData = response.data.data;
        setAuthToken(userData.token);
        login(userData);
        navigate('/dashboard');
      } else {
        setLoginError(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      setLoginError(error?.response?.data?.message || 'Error during login');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      loginUser();
    }
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center px-6">
      <div className="space-y-5">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange(setEmail)}
          onKeyPress={handleKeyPress}
          className="w-full p-4 bg-white bg-opacity-10 text-white rounded-lg border-none placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange(setPassword)}
          onKeyPress={handleKeyPress}
          className="w-full p-4 bg-white bg-opacity-10 text-white rounded-lg border-none placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />

        {loginError && (
          <div className="text-red-500 text-center">{loginError}</div>
        )}

        <button
          onClick={loginUser}
          disabled={loading}
          className="w-full p-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-center mt-6">
          <Link to="/register" className="text-blue-400 hover:underline">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}