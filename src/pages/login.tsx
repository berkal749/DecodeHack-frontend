import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, setAuthToken } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginUser = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await authAPI.login(email, password);

      if (response.data.success) {
        const userData = response.data.data;
        setAuthToken(userData.token);
        login(userData);
        navigate('/Profile');
      } else {
        toast({
          title: "Login Failed",
          description: response.data.message || 'Login failed',
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || 'Error during login',
        variant: "destructive"
      });
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
    <div className="min-h-screen bg-dark flex flex-col justify-center px-6">
      <div className="max-w-md mx-auto w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">Access your smart city transport</p>
        </div>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChange(setEmail)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className="h-12 bg-card text-card-foreground border-border/20 placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20"
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChange(setPassword)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className="h-12 bg-card text-card-foreground border-border/20 placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20"
          />

          <Button
            onClick={loginUser}
            disabled={loading}
            variant="electric"
            size="lg"
            className="w-full h-12 mt-6"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          <div className="text-center">
            <Link to="/register" className="text-primary hover:text-primary/80 transition-colors">
              Don't have an account? Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}