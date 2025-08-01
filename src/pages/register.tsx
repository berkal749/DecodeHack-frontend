import { useState, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function Register() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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
        toast({
          title: "Success!",
          description: "Registration successful! Redirecting to login...",
        });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast({
          title: "Registration Failed",
          description: response.data.message || 'Registration failed',
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || 'Error during registration',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col justify-center px-6">
      <div className="max-w-md mx-auto w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-muted-foreground">Join the smart city transport network</p>
        </div>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter name..."
            value={name}
            onChange={handleInputChange(setName)}
            disabled={loading}
            className="h-12 bg-dark-card border-border/20 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20"
          />

          <Input
            type="email"
            placeholder="Enter email..."
            value={email}
            onChange={handleInputChange(setEmail)}
            disabled={loading}
            className="h-12 bg-dark-card border-border/20 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20"
          />

          <Input
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={handleInputChange(setPassword)}
            disabled={loading}
            className="h-12 bg-dark-card border-border/20 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20"
          />

          <Button
            onClick={registerUser}
            disabled={loading}
            variant="electric"
            size="lg"
            className="w-full h-12 mt-6"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <div className="text-center">
            <Link to="/login" className="text-primary hover:text-primary/80 transition-colors">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}