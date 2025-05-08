import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, List, Home, Settings } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Admin Sidebar */}
      <div className="w-64 border-r bg-muted/20 p-4">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>

        <Separator className="my-4" />

        <nav className="space-y-2">
          <Link to="/admin" className="block">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link to="/admin/questions/add" className="block">
            <Button variant="ghost" className="w-full justify-start">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </Link>
          <Link to="/admin/questions" className="block">
            <Button variant="ghost" className="w-full justify-start">
              <List className="mr-2 h-4 w-4" />
              Manage Questions
            </Button>
          </Link>
          <Link to="/admin/settings" className="block">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>

        <Separator className="my-4" />

        <div className="mt-auto pt-4">
          <Link to="/" className="block">
            <Button variant="outline" className="w-full">
              Back to Main Site
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">{children}</div>
    </div>
  );
};

export default AdminLayout;
