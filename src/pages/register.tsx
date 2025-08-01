import { useState, ChangeEvent } from 'react';
import { useLocation,Link } from 'wouter';
import { authAPI } from '@/lib/api';

export default function Register() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [, setLocation] = useLocation();

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const registerUser = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await authAPI.register(name, email, password);

      if (response.data.success) {
        setAlertMessage('Registration successful!');
        setShowAlert(true);
        setTimeout(() => {
          setLocation('/login');
        }, 2000);
      } else {
        setAlertMessage(response.data.message || 'Registration failed');
        setShowAlert(true);
      }
    } catch (error: any) {
      setAlertMessage(
        error?.response?.data?.message || 'Error during registration'
      );
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center px-6">
      <div className="space-y-5">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Enter name..."
          value={name}
          onChange={handleInputChange(setName)}
          className="w-full p-4 bg-white bg-opacity-10 text-white rounded-lg border-none placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={loading}
        />

        <input
          type="email"
          placeholder="Enter email..."
          value={email}
          onChange={handleInputChange(setEmail)}
          className="w-full p-4 bg-white bg-opacity-10 text-white rounded-lg border-none placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Enter password..."
          value={password}
          onChange={handleInputChange(setPassword)}
          className="w-full p-4 bg-white bg-opacity-10 text-white rounded-lg border-none placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={loading}
        />

        <button
          onClick={registerUser}
          disabled={loading}
          className="w-full p-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Submit'}
        </button>

        <div className="text-center mt-6">
          <Link href="/login" className="text-blue-400 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>

      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-6">
          <div className="bg-gray-800 p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-white mb-4">
              Registration
            </h3>
            <p className="text-gray-300 mb-6">{alertMessage}</p>
            <button
              onClick={() => setShowAlert(false)}
              className="w-full p-3 bg-blue-600 text-white rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}