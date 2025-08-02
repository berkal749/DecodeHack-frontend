import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation, Clock, Bus, Train, Car } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between pt-8">
        <div>
          <h1 className="text-2xl font-bold text-gradient-primary">CityFlow</h1>
          <p className="text-muted-foreground">Your smart city companion</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-electric-cyan to-electric-green flex items-center justify-center">
          <span className="font-semibold text-background">JD</span>
        </div>
      </div>

      <Card className="relative h-48 bg-gradient-to-br from-city-gray/20 to-background border-electric-cyan/20 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300D9FF' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative p-4 h-full flex flex-col justify-between">
          <div className="flex items-center gap-2 text-electric-cyan">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">Downtown Area</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-electric-green animate-pulse"></div>
              <span className="text-sm">3 buses nearby</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse"></div>
              <span className="text-sm">Metro: 2 min away</span>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <Button variant="glow" size="sm">
            View Full Map
          </Button>
        </div>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="electric" className="h-24 flex-col">
            <Navigation className="w-6 h-6 mb-2" />
            Plan Route
          </Button>
          <Button variant="neon" className="h-24 flex-col">
            <Clock className="w-6 h-6 mb-2" />
            Live Times
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Nearby Transport</h2>
        <div className="space-y-3">
          <Card className="p-4 bg-card/50 border-electric-cyan/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-electric-cyan/20 flex items-center justify-center">
                  <Bus className="w-5 h-5 text-electric-cyan" />
                </div>
                <div>
                  <p className="font-medium">Bus 47</p>
                  <p className="text-sm text-muted-foreground">Central Station</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-electric-green">2 min</p>
                <p className="text-xs text-muted-foreground">Next: 8 min</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card/50 border-electric-green/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-electric-green/20 flex items-center justify-center">
                  <Train className="w-5 h-5 text-electric-green" />
                </div>
                <div>
                  <p className="font-medium">Metro Blue Line</p>
                  <p className="text-sm text-muted-foreground">City Center</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-electric-cyan">5 min</p>
                <p className="text-xs text-muted-foreground">Next: 12 min</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card/50 border-neon-purple/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                  <Car className="w-5 h-5 text-neon-purple" />
                </div>
                <div>
                  <p className="font-medium">Ride Share</p>
                  <p className="text-sm text-muted-foreground">UberX nearby</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-neon-purple">3 min</p>
                <p className="text-xs text-muted-foreground">$12-15</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;