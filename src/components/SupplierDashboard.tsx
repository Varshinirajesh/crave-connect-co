import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Package, 
  TrendingUp, 
  Clock,
  Check,
  X,
  Plus,
  Minus,
  AlertTriangle,
  Phone,
  MessageCircle,
  ChevronLeft,
  Eye
} from "lucide-react";

interface SupplierDashboardProps {
  onBack: () => void;
}

export const SupplierDashboard = ({ onBack }: SupplierDashboardProps) => {
  const [todayRevenue] = useState(1247.50);
  const [pendingOrders] = useState(8);
  const [lowStockItems] = useState(3);

  const todayOrders = [
    {
      id: "ORD-001",
      vendor: "Taco Express",
      items: ["Tomatoes (5kg)", "Onions (3kg)", "Cilantro (1kg)"],
      total: 45.50,
      time: "2 hours ago",
      status: "pending"
    },
    {
      id: "ORD-002", 
      vendor: "Burger Corner",
      items: ["Ground Beef (10kg)", "Cheese (2kg)", "Lettuce (2kg)"],
      total: 125.75,
      time: "1 hour ago", 
      status: "accepted"
    },
    {
      id: "ORD-003",
      vendor: "Spice Street",
      items: ["Cumin (500g)", "Paprika (300g)", "Chili Powder (1kg)"],
      total: 28.25,
      time: "30 minutes ago",
      status: "pending"
    }
  ];

  const inventory = [
    { name: "Tomatoes", stock: 15, unit: "kg", lowThreshold: 10, status: "good" },
    { name: "Onions", stock: 8, unit: "kg", lowThreshold: 10, status: "low" },
    { name: "Ground Beef", stock: 25, unit: "kg", lowThreshold: 15, status: "good" },
    { name: "Cilantro", stock: 3, unit: "kg", lowThreshold: 5, status: "low" },
    { name: "Cheese", stock: 2, unit: "kg", lowThreshold: 8, status: "critical" }
  ];

  const handleOrderAction = (orderId: string, action: 'accept' | 'decline') => {
    console.log(`Order ${orderId} ${action}ed`);
    // Handle order action
  };

  const adjustStock = (itemName: string, change: number) => {
    console.log(`Adjusting ${itemName} stock by ${change}`);
    // Handle stock adjustment
  };

  const getStockStatus = (item: any) => {
    const percentage = (item.stock / item.lowThreshold) * 100;
    if (percentage <= 50) return { color: "bg-destructive", text: "Critical" };
    if (percentage <= 100) return { color: "bg-warning", text: "Low" };
    return { color: "bg-success", text: "Good" };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b px-4 py-3">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="hover:bg-accent"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-semibold text-lg">Supplier Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your business efficiently</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="px-4 py-6 space-y-4">
        <h2 className="font-semibold text-lg">Today's Overview</h2>
        
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center animate-scale-in">
            <DollarSign className="w-6 h-6 text-success mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Revenue</p>
            <p className="font-bold text-lg text-success">${todayRevenue.toFixed(2)}</p>
          </Card>
          
          <Card className="p-4 text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <Clock className="w-6 h-6 text-warning mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="font-bold text-lg text-warning">{pendingOrders}</p>
          </Card>
          
          <Card className="p-4 text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <AlertTriangle className="w-6 h-6 text-destructive mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Low Stock</p>
            <p className="font-bold text-lg text-destructive">{lowStockItems}</p>
          </Card>
        </div>
      </div>

      {/* Today's Orders */}
      <div className="px-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Today's Orders</h2>
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4 mr-1" />
            View All
          </Button>
        </div>
        
        {todayOrders.map((order, index) => (
          <Card 
            key={order.id} 
            className="p-4 animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{order.vendor}</h4>
                  <p className="text-sm text-muted-foreground">{order.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">${order.total.toFixed(2)}</p>
                  <Badge 
                    className={order.status === 'pending' ? 'bg-warning' : 'bg-success'}
                  >
                    {order.status === 'pending' ? 'Pending' : 'Accepted'}
                  </Badge>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Items:</p>
                <div className="space-y-1">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-sm">• {item}</p>
                  ))}
                </div>
              </div>
              
              {order.status === 'pending' && (
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleOrderAction(order.id, 'decline')}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Decline
                  </Button>
                  <Button 
                    variant="hero" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleOrderAction(order.id, 'accept')}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Accept
                  </Button>
                </div>
              )}
              
              {order.status === 'accepted' && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="w-4 h-4 mr-1" />
                    Call Vendor
                  </Button>
                  <Button variant="warm" size="sm" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Inventory Management */}
      <div className="px-4 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Inventory Management</h2>
          <Button variant="ghost" size="sm">
            <Package className="w-4 h-4 mr-1" />
            Full Inventory
          </Button>
        </div>
        
        {inventory.map((item, index) => {
          const status = getStockStatus(item);
          return (
            <Card 
              key={item.name} 
              className="p-4 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-sm text-muted-foreground">
                      {item.stock} {item.unit} in stock
                    </p>
                    <Badge className={status.color} variant="secondary">
                      {status.text}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => adjustStock(item.name, -1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="font-medium min-w-8 text-center">{item.stock}</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => adjustStock(item.name, 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Performance Analytics Preview */}
      <div className="px-4 pb-8 space-y-4">
        <h2 className="font-semibold text-lg">Performance Analytics</h2>
        
        <Card className="p-6 text-center animate-scale-in">
          <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Great work this week! 📈</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Your orders are up 23% compared to last week
          </p>
          <Button variant="hero" className="w-full">
            View Detailed Analytics
          </Button>
        </Card>
      </div>

      {/* Bottom padding for mobile */}
      <div className="h-20" />
    </div>
  );
};