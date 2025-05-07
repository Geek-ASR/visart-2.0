import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  BarChart2,
  Bookmark,
  Trophy,
  FolderTree,
  Code,
  BookOpen,
  Briefcase,
  LogOut,
  Settings,
} from "lucide-react";

interface SidebarProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

const Sidebar = ({
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
}: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="w-[280px] h-full bg-background border-r flex flex-col">
      {/* User Profile Section */}
      <div className="p-4 flex items-center space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback>
            {userName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{userName}</span>
          <span className="text-xs text-muted-foreground">{userEmail}</span>
        </div>
      </div>

      <Separator />

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <NavItem icon={<Home size={18} />} label="Home" to="/" />
        <NavItem
          icon={<BarChart2 size={18} />}
          label="My Progress"
          to="/progress"
        />
        <NavItem
          icon={<Bookmark size={18} />}
          label="Bookmarks"
          to="/bookmarks"
        />
        <NavItem
          icon={<Trophy size={18} />}
          label="Leaderboard"
          to="/leaderboard"
        />
        <NavItem
          icon={<FolderTree size={18} />}
          label="DSA Topics"
          to="/topics"
        />
        <NavItem
          icon={<Code size={18} />}
          label="Challenges"
          to="/challenges"
          isActive={currentPath === "/challenges"}
        />
        <NavItem
          icon={<BookOpen size={18} />}
          label="Blogs & Workshops"
          to="/blogs"
        />
        <NavItem
          icon={<Briefcase size={18} />}
          label="Career Paths"
          to="/careers"
        />
      </nav>

      <div className="p-4 space-y-2 mt-auto">
        <NavItem
          icon={<Settings size={18} />}
          label="Settings"
          to="/settings"
        />
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
}

const NavItem = ({
  icon,
  label,
  to,
  isActive: forcedActive = false,
}: NavItemProps) => {
  const location = useLocation();
  const isActive = forcedActive || location.pathname === to;
  return (
    <Link to={to} className="block">
      <Button
        variant="ghost"
        className={`w-full justify-start ${isActive ? "bg-accent text-accent-foreground" : ""}`}
      >
        <span className="mr-2">{icon}</span>
        {label}
      </Button>
    </Link>
  );
};

export default Sidebar;
