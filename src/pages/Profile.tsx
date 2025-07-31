import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  MapPin, 
  Moon, 
  Volume2,
  Smartphone,
  HelpCircle,
  LogOut,
  ChevronRight,
  Settings
} from "lucide-react";

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    memberSince: "March 2023"
  };

  const settingSections = [
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { label: "Route Updates", enabled: true },
        { label: "Delay Alerts", enabled: true },
        { label: "Promotional Offers", enabled: false },
        { label: "Weekly Summary", enabled: true },
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      items: [
        { label: "Location Services", enabled: true },
        { label: "Data Analytics", enabled: false },
        { label: "Biometric Login", enabled: true },
      ]
    },
    {
      title: "Preferences",
      icon: Settings,
      items: [
        { label: "Dark Mode", enabled: true },
        { label: "Sound Effects", enabled: true },
        { label: "Vibration", enabled: true },
        { label: "Auto-refresh Map", enabled: true },
      ]
    }
  ];

  const menuItems = [
    { label: "Payment Methods", icon: CreditCard, action: "manage" },
    { label: "Saved Locations", icon: MapPin, action: "view" },
    { label: "Trip History", icon: Smartphone, action: "view" },
    { label: "Help & Support", icon: HelpCircle, action: "contact" },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-8">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* User Info Card */}
      <Card className="p-6 bg-gradient-to-br from-electric-cyan/10 to-electric-green/10 border-electric-cyan/20">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-electric-cyan to-electric-green flex items-center justify-center text-xl font-bold text-background">
            JD
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground mt-1">Member since {user.memberSince}</p>
            <Button variant="glow" size="sm" className="mt-3">
              <User className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        {menuItems.map((item) => (
          <Card key={item.label} className="p-4 hover:border-electric-cyan/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-electric-cyan/20 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-electric-cyan" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{item.label}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>

      {/* Settings Sections */}
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
                <Switch 
                  checked={item.enabled}
                  className="data-[state=checked]:bg-electric-cyan"
                />
              </div>
            ))}
          </Card>
        </div>
      ))}

      {/* App Info */}
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

      {/* Logout */}
      <Button variant="destructive" className="w-full h-12">
        <LogOut className="w-5 h-5 mr-2" />
        Sign Out
      </Button>

      {/* Bottom spacing for navigation */}
      <div className="h-4" />
    </div>
  );
};

export default Profile;