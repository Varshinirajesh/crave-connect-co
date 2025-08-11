import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChefHat, Store, ArrowRight } from "lucide-react";
import streetMarketHero from "@/assets/street-market-hero.jpg";
import vendorAvatar from "@/assets/vendor-avatar.jpg";
import supplierAvatar from "@/assets/supplier-avatar.jpg";

interface WelcomeScreenProps {
  onRoleSelect: (role: 'vendor' | 'supplier') => void;
}

export const WelcomeScreen = ({ onRoleSelect }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={streetMarketHero} 
          alt="Vibrant street food market" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 animate-slide-up">
            Welcome to StreetSource
          </h1>
          <p className="text-lg text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Your trusted partner for the street food ecosystem
          </p>
        </div>
      </div>

      {/* Role Selection */}
      <div className="px-6 py-8 max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            How would you like to get started?
          </h2>
          <p className="text-muted-foreground">
            Choose your role to access your personalized dashboard
          </p>
        </div>

        <div className="space-y-4">
          {/* Vendor Card */}
          <Card 
            className="p-6 cursor-pointer transition-all duration-300 hover:shadow-warm hover:scale-105 bg-card animate-scale-in"
            onClick={() => onRoleSelect('vendor')}
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src={vendorAvatar} 
                  alt="Street food vendor" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                />
                <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                  <ChefHat className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground">I'm a Vendor</h3>
                <p className="text-muted-foreground text-sm">
                  Find suppliers, manage orders, and grow your street food business
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-primary" />
            </div>
          </Card>

          {/* Supplier Card */}
          <Card 
            className="p-6 cursor-pointer transition-all duration-300 hover:shadow-warm hover:scale-105 bg-card animate-scale-in"
            style={{ animationDelay: '0.2s' }}
            onClick={() => onRoleSelect('supplier')}
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src={supplierAvatar} 
                  alt="Food supplier" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-accent/20"
                />
                <div className="absolute -bottom-1 -right-1 bg-accent rounded-full p-1">
                  <Store className="w-4 h-4 text-accent-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground">I'm a Supplier</h3>
                <p className="text-muted-foreground text-sm">
                  Connect with vendors, manage inventory, and track your business
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-accent" />
            </div>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            🌟 You're all set for a great day of connecting food entrepreneurs!
          </p>
        </div>
      </div>
    </div>
  );
};