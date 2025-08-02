import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Clock, ArrowRight, Bus, Train, Car, User } from "lucide-react";

const RoutePlanner = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  const routeOptions = [
    {
      type: "Fastest",
      time: "23 min",
      cost: "Free",
      steps: [
        { icon: User, text: "Walk 3 min", color: "text-muted-foreground" },
        { icon: Bus, text: "Bus 47 • 15 min", color: "text-electric-cyan" },
        { icon: User, text: "Walk 5 min", color: "text-muted-foreground" },
      ],
      primary: true
    },
    {
      type: "Cheapest",
      time: "31 min",
      cost: "Free",
      steps: [
        { icon: User, text: "Walk 8 min", color: "text-muted-foreground" },
        { icon: Train, text: "Metro Blue • 18 min", color: "text-electric-green" },
        { icon: User, text: "Walk 5 min", color: "text-muted-foreground" },
      ]
    },
    {
      type: "Comfortable",
      time: "18 min",
      cost: "$12-15",
      steps: [
        { icon: User, text: "Walk 2 min", color: "text-muted-foreground" },
        { icon: Car, text: "UberX • 16 min", color: "text-neon-purple" },
      ]
    }
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="pt-8">
        <h1 className="text-2xl font-bold">Plan Your Route</h1>
        <p className="text-muted-foreground">Find the best way to get around</p>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-electric-cyan" />
          <Input
            placeholder="From: Current location"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            className="pl-12 h-14 bg-card/50 border-electric-cyan/30 text-base"
          />
        </div>
        
        <div className="relative">
          <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-electric-green" />
          <Input
            placeholder="To: Where are you going?"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            className="pl-12 h-14 bg-card/50 border-electric-green/30 text-base"
          />
        </div>

        <Button variant="electric" className="w-full h-14 text-base">
          <Navigation className="w-5 h-5 mr-2" />
          Find Routes
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Route Options</h2>
        
        {routeOptions.map((route, index) => (
          <Card 
            key={index} 
            className={`p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
              route.primary 
                ? "border-electric-cyan bg-electric-cyan/5 glow-cyan" 
                : "border-border hover:border-electric-cyan/50"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <h3 className={`font-semibold ${route.primary ? "text-electric-cyan" : ""}`}>
                  {route.type}
                </h3>
                {route.primary && (
                  <span className="px-2 py-1 text-xs bg-electric-cyan/20 text-electric-cyan rounded-full">
                    Recommended
                  </span>
                )}
              </div>
              <div className="text-right">
                <p className="font-medium">{route.time}</p>
                <p className="text-sm text-muted-foreground">{route.cost}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {route.steps.map((step, stepIndex) => (
                <div key={stepIndex} className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <step.icon className={`w-4 h-4 ${step.color}`} />
                    <span className={`text-sm ${step.color}`}>{step.text}</span>
                  </div>
                  {stepIndex < route.steps.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Departs every 5-8 min</span>
                </div>
                <Button variant="glow" size="sm">
                  Select Route
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Quick Destinations</h2>
        <div className="grid grid-cols-2 gap-3">
          {["City Center", "Airport", "University", "Mall"].map((destination) => (
            <Button key={destination} variant="outline" className="h-12">
              <MapPin className="w-4 h-4 mr-2" />
              {destination}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutePlanner;