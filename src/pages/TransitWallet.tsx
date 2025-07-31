import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Plus, 
  History, 
  Download,
  Bus,
  Train,
  CheckCircle,
  Clock
} from "lucide-react";

const TransitWallet = () => {
  const balance = 45.80;
  
  const activePass = {
    type: "Monthly Metro Pass",
    validUntil: "Jan 31, 2024",
    rides: 47,
    unlimited: true
  };

  const recentTransactions = [
    { id: 1, type: "Bus Ride", route: "Line 47", amount: -2.50, time: "2 hours ago", status: "completed" },
    { id: 2, type: "Metro Trip", route: "Blue Line", amount: -3.20, time: "Yesterday", status: "completed" },
    { id: 3, type: "Top Up", route: "", amount: +25.00, time: "2 days ago", status: "completed" },
    { id: 4, type: "Day Pass", route: "All Lines", amount: -12.00, time: "3 days ago", status: "completed" },
  ];

  const quickTopUpAmounts = [10, 25, 50, 100];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-8">
        <h1 className="text-2xl font-bold">Transit Wallet</h1>
        <p className="text-muted-foreground">Manage your transit payments</p>
      </div>

      {/* Balance Card */}
      <Card className="p-6 bg-gradient-to-br from-electric-cyan/10 to-electric-green/10 border-electric-cyan/20 glow-cyan">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p className="text-3xl font-bold text-gradient-primary">${balance.toFixed(2)}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-electric-cyan/20 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-electric-cyan" />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="electric" className="flex-1">
            <Plus className="w-4 h-4 mr-2" />
            Top Up
          </Button>
          <Button variant="glow">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Active Pass */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Active Passes</h2>
        <Card className="p-4 bg-electric-green/5 border-electric-green/20">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg bg-electric-green/20 flex items-center justify-center">
                <Train className="w-6 h-6 text-electric-green" />
              </div>
              <div>
                <h3 className="font-semibold">{activePass.type}</h3>
                <p className="text-sm text-muted-foreground">Valid until {activePass.validUntil}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="bg-electric-green/20 text-electric-green">
                    Unlimited Rides
                  </Badge>
                  <span className="text-sm text-muted-foreground">{activePass.rides} rides used</span>
                </div>
              </div>
            </div>
            <CheckCircle className="w-5 h-5 text-electric-green" />
          </div>
        </Card>
      </div>

      {/* Quick Top Up */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Quick Top Up</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickTopUpAmounts.map((amount) => (
            <Button key={amount} variant="outline" className="h-16 flex-col">
              <span className="text-lg font-bold">${amount}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Purchase Options */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Buy Passes</h2>
        <div className="space-y-3">
          <Card className="p-4 hover:border-electric-cyan/50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-electric-cyan/20 flex items-center justify-center">
                  <Bus className="w-5 h-5 text-electric-cyan" />
                </div>
                <div>
                  <h3 className="font-medium">Day Pass</h3>
                  <p className="text-sm text-muted-foreground">Unlimited rides for 24 hours</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">$12.00</p>
                <Button variant="glow" size="sm" className="mt-1">
                  Buy
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:border-electric-green/50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-electric-green/20 flex items-center justify-center">
                  <Train className="w-5 h-5 text-electric-green" />
                </div>
                <div>
                  <h3 className="font-medium">Weekly Pass</h3>
                  <p className="text-sm text-muted-foreground">7 days of unlimited travel</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">$35.00</p>
                <Button variant="glow" size="sm" className="mt-1">
                  Buy
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <Button variant="ghost" size="sm">
            <History className="w-4 h-4 mr-2" />
            View All
          </Button>
        </div>
        
        <div className="space-y-2">
          {recentTransactions.map((transaction) => (
            <Card key={transaction.id} className="p-3 bg-card/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    transaction.type.includes('Bus') ? 'bg-electric-cyan/20' :
                    transaction.type.includes('Metro') ? 'bg-electric-green/20' :
                    transaction.amount > 0 ? 'bg-electric-green/20' : 'bg-city-gray/20'
                  }`}>
                    {transaction.type.includes('Bus') ? (
                      <Bus className="w-4 h-4 text-electric-cyan" />
                    ) : transaction.type.includes('Metro') ? (
                      <Train className="w-4 h-4 text-electric-green" />
                    ) : transaction.amount > 0 ? (
                      <Plus className="w-4 h-4 text-electric-green" />
                    ) : (
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{transaction.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.route && `${transaction.route} • `}{transaction.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${transaction.amount > 0 ? 'text-electric-green' : 'text-foreground'}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-electric-green" />
                    <span className="text-xs text-muted-foreground">Completed</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransitWallet;