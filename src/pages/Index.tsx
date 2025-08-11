import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { VendorDashboard } from "@/components/VendorDashboard";
import { SupplierDashboard } from "@/components/SupplierDashboard";

type UserRole = 'vendor' | 'supplier' | null;

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);

  const handleRoleSelect = (role: 'vendor' | 'supplier') => {
    setUserRole(role);
  };

  const handleBackToWelcome = () => {
    setUserRole(null);
  };

  if (userRole === 'vendor') {
    return <VendorDashboard onBack={handleBackToWelcome} />;
  }

  if (userRole === 'supplier') {
    return <SupplierDashboard onBack={handleBackToWelcome} />;
  }

  return <WelcomeScreen onRoleSelect={handleRoleSelect} />;
};

export default Index;
