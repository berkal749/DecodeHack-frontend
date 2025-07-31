import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Layers, 
  Navigation, 
  Bus, 
  Train, 
  MapPin, 
  Clock,
  Locate,
  Filter
} from "lucide-react";

const LiveMap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const vehicleTypes = [
    { type: "Bus", icon: Bus, color: "text-electric-cyan", count: 12 },
    { type: "Metro", icon: Train, color: "text-electric-green", count: 8 },
    { type: "Tram", icon: Train, color: "text-neon-purple", count: 5 },
  ];

  const nearbyVehicles = [
    { id: "B47", type: "Bus", route: "Downtown Loop", eta: "2 min", distance: "0.2 km" },
    { id: "M1", type: "Metro", route: "Blue Line", eta: "5 min", distance: "0.4 km" },
    { id: "B23", type: "Bus", route: "University", eta: "8 min", distance: "0.6 km" },
  ];

  return (
    <div className="relative h-screen bg-background">
      {/* Search Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 pt-12 bg-gradient-to-b from-background to-transparent">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search locations, routes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card/95 backdrop-blur-md border-electric-cyan/30"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="glow" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Layers className="w-4 h-4 mr-2" />
              Layers
            </Button>
            <Button variant="outline" size="sm">
              <Locate className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Map Area - Simulated with gradient and patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-city-gray/10 via-background to-electric-cyan/5">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300D9FF' fill-opacity='0.2'%3E%3Cpath d='M20 20h20v20H20zM0 0h20v20H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Simulated vehicles on map */}
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-electric-cyan rounded-full animate-pulse glow-cyan"></div>
        <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-electric-green rounded-full animate-pulse glow-green"></div>
        <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-neon-purple rounded-full animate-pulse"></div>
        
        {/* Route lines */}
        <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-electric-cyan/50 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-1/3 w-0.5 bg-gradient-to-b from-transparent via-electric-green/50 to-transparent"></div>
      </div>

      {/* Vehicle Type Filters */}
      {showFilters && (
        <div className="absolute top-32 left-4 right-4 z-10">
          <Card className="p-4 bg-card/95 backdrop-blur-md border-electric-cyan/20">
            <h3 className="font-semibold mb-3">Vehicle Types</h3>
            <div className="space-y-2">
              {vehicleTypes.map(({ type, icon: Icon, color, count }) => (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${color}`} />
                    <span className="font-medium">{type}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{count} active</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Bottom Panel - Nearby Vehicles */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-background to-transparent">
        <Card className="p-4 bg-card/95 backdrop-blur-md border-electric-cyan/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Nearby Vehicles</h3>
            <Button variant="glow" size="sm">
              <Navigation className="w-4 h-4 mr-2" />
              Track
            </Button>
          </div>
          
          <div className="space-y-3 max-h-32 overflow-y-auto">
            {nearbyVehicles.map((vehicle) => (
              <div key={vehicle.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    vehicle.type === 'Bus' ? 'bg-electric-cyan/20' :
                    vehicle.type === 'Metro' ? 'bg-electric-green/20' : 'bg-neon-purple/20'
                  }`}>
                    <span className={`text-xs font-bold ${
                      vehicle.type === 'Bus' ? 'text-electric-cyan' :
                      vehicle.type === 'Metro' ? 'text-electric-green' : 'text-neon-purple'
                    }`}>
                      {vehicle.id}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{vehicle.route}</p>
                    <p className="text-xs text-muted-foreground">{vehicle.distance} away</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-electric-cyan" />
                    <span className="text-sm font-medium text-electric-cyan">{vehicle.eta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Floating Action Button */}
      <Button 
        variant="electric" 
        size="fab"
        className="absolute bottom-24 right-4 z-20"
      >
        <MapPin className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default LiveMap;