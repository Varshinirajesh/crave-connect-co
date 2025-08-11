import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Star, 
  ShoppingCart, 
  Heart,
  Search,
  Filter,
  Phone,
  MessageCircle,
  Clock,
  Truck,
  ChevronLeft,
  Store
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface VendorDashboardProps {
  onBack: () => void;
}

export const VendorDashboard = ({ onBack }: VendorDashboardProps) => {
  const [cartItems, setCartItems] = useState(0);
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

  const suppliers = [
    {
      id: "1",
      name: "Fresh Valley Produce",
      rating: 4.8,
      distance: "0.5 km",
      status: "online",
      categories: ["Vegetables", "Fruits", "Herbs"],
      description: "Premium fresh produce from local farms",
      estimatedDelivery: "30 min",
      image: "/api/placeholder/100/100"
    },
    {
      id: "2", 
      name: "Spice Master Co.",
      rating: 4.9,
      distance: "1.2 km", 
      status: "online",
      categories: ["Spices", "Seasonings", "Oils"],
      description: "Authentic spices and seasonings for street food",
      estimatedDelivery: "45 min",
      image: "/api/placeholder/100/100"
    },
    {
      id: "3",
      name: "Meat & More",
      rating: 4.7,
      distance: "2.1 km",
      status: "offline", 
      categories: ["Meat", "Poultry", "Seafood"],
      description: "Fresh meat and seafood daily delivery",
      estimatedDelivery: "1 hour",
      image: "/api/placeholder/100/100"
    }
  ];

  const recentOrders = [
    { id: "1", supplier: "Fresh Valley Produce", status: "delivered", total: "$45.50", items: "Tomatoes, Onions, Cilantro" },
    { id: "2", supplier: "Spice Master Co.", status: "in-transit", total: "$28.75", items: "Cumin, Paprika, Chili Powder" },
    { id: "3", supplier: "Meat & More", status: "preparing", total: "$67.20", items: "Chicken Breast, Ground Beef" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-success";
      case "offline": return "bg-muted-foreground";
      case "delivered": return "bg-success";
      case "in-transit": return "bg-warning";
      case "preparing": return "bg-primary";
      default: return "bg-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered": return "Delivered";
      case "in-transit": return "Your veggies are on the way! 🚛";
      case "preparing": return "Getting your order ready...";
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
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
              <h1 className="font-semibold text-lg">Find Suppliers</h1>
              <p className="text-sm text-muted-foreground">Discover fresh ingredients nearby</p>
            </div>
          </div>
          <div className="relative">
            <Button variant="hero" size="icon">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            {cartItems > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground min-w-5 h-5 flex items-center justify-center p-1 text-xs">
                {cartItems}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="px-4 py-4 space-y-3">
        <div className="flex space-x-2">
          <Input 
            placeholder="Search suppliers or ingredients..." 
            className="flex-1"
          />
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {["All", "Vegetables", "Spices", "Meat", "Dairy", "Grains"].map((category) => (
            <Badge 
              key={category}
              variant={category === "All" ? "default" : "secondary"}
              className="whitespace-nowrap cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Suppliers Map/List */}
      <div className="px-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Suppliers Near You</h2>
          <Button variant="ghost" size="sm">
            <MapPin className="w-4 h-4 mr-1" />
            Map View
          </Button>
        </div>

        {suppliers.map((supplier, index) => (
          <Card 
            key={supplier.id} 
            className="p-4 cursor-pointer transition-all duration-300 hover:shadow-warm animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedSupplier(supplier.id)}
          >
            <div className="flex space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-warm rounded-lg flex items-center justify-center">
                  <Store className="w-8 h-8 text-foreground" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${getStatusColor(supplier.status)}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{supplier.name}</h3>
                    <p className="text-sm text-muted-foreground">{supplier.description}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm font-medium">{supplier.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{supplier.distance}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{supplier.estimatedDelivery}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex space-x-1">
                    {supplier.categories.slice(0, 2).map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                    {supplier.categories.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{supplier.categories.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                    <Button variant="default" size="sm">
                      Order Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="px-4 py-6 space-y-4">
        <h2 className="font-semibold text-lg">Recent Orders</h2>
        
        {recentOrders.map((order, index) => (
          <Card 
            key={order.id} 
            className="p-4 animate-scale-in"
            style={{ animationDelay: `${(index + 3) * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{order.supplier}</h4>
                  <span className="font-semibold text-primary">{order.total}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{order.items}</p>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(order.status)}>
                    {order.status === "in-transit" && <Truck className="w-3 h-3 mr-1" />}
                    {getStatusText(order.status)}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom padding for mobile */}
      <div className="h-20" />
    </div>
  );
};