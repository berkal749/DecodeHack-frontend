import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Navigation,
  Clock,
  ArrowRight,
  Bus,
  Train,
  Car,
  User
} from "lucide-react";
import { api } from "@/lib/api";

const RoutePlanner = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFindRoutes = async () => {
    setError("");
    setJourneys([]);
    if (!fromLocation || !toLocation) {
      setError("Please fill in both From and To fields.");
      return;
    }

    setLoading(true);
    try {
      const resp = await api.get("/journeys", {
        params: { start: fromLocation, end: toLocation },
      });
      if (resp.data.success) {
        setJourneys(resp.data.journeys);
      } else {
        setError(resp.data.error || "No journeys found.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const iconFor = (serviceName) => {
    // crude mapping, extend as needed
    if (serviceName.toLowerCase().includes("bus")) return Bus;
    if (serviceName.toLowerCase().includes("tram")) return Train;
    if (serviceName.toLowerCase().includes("uber")) return Car;
    return User;
  };

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
            placeholder="From"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            className="pl-12 h-14 bg-card/50 border-electric-cyan/30 text-base"
          />
        </div>

        <div className="relative">
          <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-electric-green" />
          <Input
            placeholder="To"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            className="pl-12 h-14 bg-card/50 border-electric-green/30 text-base"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button
          variant="electric"
          className="w-full h-14 text-base"
          onClick={handleFindRoutes}
          disabled={loading}
        >
          {loading ? "Searching..." : <>
            <Navigation className="w-5 h-5 mr-2" />
            Find Routes
          </>}
        </Button>
      </div>

      {journeys.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Route Options</h2>
          {journeys.map((journey, idx) => (
            <Card
              key={idx}
              className={`p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                idx === 0
                  ? "border-electric-cyan bg-electric-cyan/5 glow-cyan"
                  : "border-border hover:border-electric-cyan/50"
              }`}
            >
              <div className="mb-2">
                <span className="uppercase text-sm font-medium">
                  {journey.type}
                </span>
              </div>
              <div className="space-y-2">
                {journey.segments.map((seg, sidx) => {
                  const Icon = iconFor(seg.service);
                  return (
                    <div key={sidx} className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Icon className="w-5 h-5 text-electric-cyan" />
                        <span className="font-semibold">{seg.service}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {seg.stops.join(" → ")}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Up to 20 stops</span>
                </div>
                <Button variant="glow" size="sm">
                  Select Route
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoutePlanner;
