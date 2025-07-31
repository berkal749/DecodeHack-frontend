import { NavLink } from "react-router-dom";
import { Home, Route, Map, User } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/routes", icon: Route, label: "Routes" },
    { to: "/map", icon: Map, label: "Live Map" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
      <div className="grid grid-cols-4 h-16">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 text-xs transition-all duration-300",
                isActive 
                  ? "text-electric-cyan glow-cyan" 
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;