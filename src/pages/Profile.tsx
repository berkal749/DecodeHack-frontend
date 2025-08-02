import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import { useState, useEffect } from 'react';
import { useUser} from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { authAPI, setAuthToken, removeAuthToken } from '@/lib/api';
import { useTheme } from "@/contexts/ThemeContext";

import { User, Bell, Shield, CreditCard, MapPin, Moon, Volume2, Smartphone, HelpCircle, LogOut, ChevronRight, Settings} from "lucide-react";


const Profile = () => {
  const { user, logout } = useUser();
  const { theme, toggleTheme } = useTheme();

  const settingSections = [
    {
      title: "Preferences",
      icon: Settings,
      items: [
        { label: "Dark Mode", enabled: theme === "dark" },
        { label: "Auto-refresh Map", enabled: true },
      ]
    }
  ];
  const [profileMessage, setProfileMessage] = useState('Fetching profile...');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        setAuthToken(user.token);
        const response = await authAPI.getProfile();

        setProfileMessage(
          response.data.success ? 'Profile loaded successfully' : 'Failed to load profile'
        );
      } catch (error) {
        setProfileMessage('Error loading profile');
      }
    };

    fetchProfile();
  }, [user]);

  const handleLogout = () => {
    removeAuthToken();
    logout();
    navigate('/register');
  };


  return (
    <div className="p-4 space-y-6">
      <div className="pt-8">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-electric-cyan/10 to-electric-green/10 border-electric-cyan/20">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-electric-cyan to-electric-green flex items-center justify-center text-xl font-bold text-background">
            JD
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{"user.data.name"}</h2>
            <p className="text-muted-foreground">{"user.data.email"}</p>
            <p className="text-sm text-muted-foreground mt-1">Member since {"blank"}</p>
            <Button variant="glow" size="sm" className="mt-3">
              <User className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </Card>


      {settingSections.map((section) => (
        <div key={section.title} className="space-y-3">
          <div className="flex items-center gap-2">
            <section.icon className="w-5 h-5 text-electric-cyan" />
            <h2 className="text-lg font-semibold">{section.title}</h2>
          </div>
          
          <Card className="p-4 space-y-4">
            {section.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium">{item.label}</span>
                {item.label === "Dark Mode" ? (
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={toggleTheme}
                    className="data-[state=checked]:bg-electric-cyan"
                  />
                ) : (
                  <Switch
                    checked={item.enabled}
                    className="data-[state=checked]:bg-electric-cyan"
                  />
                )}
              </div>
            ))}
          </Card>
        </div>
      ))}

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">App Version</span>
            <span className="text-muted-foreground">2.1.0</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Terms of Service</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Privacy Policy</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </Card>

      <Button
        variant="destructive"
        className="w-full h-12"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5 mr-2" />
        Sign Out
      </Button>

      <div className="h-4" />
    </div>
  );
};

export default Profile;