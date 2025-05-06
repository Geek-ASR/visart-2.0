import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ChevronRight,
  BookOpen,
  Award,
  BarChart2,
  BookMarked,
  Users,
  Code,
  FileText,
  Compass,
} from "lucide-react";

// Import components
import Sidebar from "./layout/Sidebar";
import LearningProgress from "./dashboard/LearningProgress";
import TopicGrid from "./dashboard/TopicGrid";
import AuthForm from "./auth/AuthForm";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  // Mock data for UI scaffolding
  const recentTopics = [
    {
      id: 1,
      title: "Arrays",
      progress: 65,
      difficulty: "Basic",
      timeEstimate: "30 min",
    },
    {
      id: 2,
      title: "Linked Lists",
      progress: 40,
      difficulty: "Easy",
      timeEstimate: "45 min",
    },
    {
      id: 3,
      title: "Binary Trees",
      progress: 20,
      difficulty: "Medium",
      timeEstimate: "60 min",
    },
  ];

  const topicsByDifficulty = {
    basic: [
      {
        id: 1,
        title: "Arrays",
        progress: 65,
        difficulty: "Basic",
        timeEstimate: "30 min",
      },
      {
        id: 2,
        title: "Strings",
        progress: 80,
        difficulty: "Basic",
        timeEstimate: "25 min",
      },
      {
        id: 3,
        title: "Recursion Basics",
        progress: 50,
        difficulty: "Basic",
        timeEstimate: "40 min",
      },
      {
        id: 4,
        title: "Basic Sorting",
        progress: 75,
        difficulty: "Basic",
        timeEstimate: "35 min",
      },
    ],
    easy: [
      {
        id: 5,
        title: "Linked Lists",
        progress: 40,
        difficulty: "Easy",
        timeEstimate: "45 min",
      },
      {
        id: 6,
        title: "Stacks",
        progress: 60,
        difficulty: "Easy",
        timeEstimate: "40 min",
      },
      {
        id: 7,
        title: "Queues",
        progress: 30,
        difficulty: "Easy",
        timeEstimate: "40 min",
      },
      {
        id: 8,
        title: "Hash Tables",
        progress: 20,
        difficulty: "Easy",
        timeEstimate: "50 min",
      },
    ],
    medium: [
      {
        id: 9,
        title: "Binary Trees",
        progress: 20,
        difficulty: "Medium",
        timeEstimate: "60 min",
      },
      {
        id: 10,
        title: "Heaps",
        progress: 10,
        difficulty: "Medium",
        timeEstimate: "55 min",
      },
      {
        id: 11,
        title: "Graphs",
        progress: 5,
        difficulty: "Medium",
        timeEstimate: "70 min",
      },
      {
        id: 12,
        title: "Dynamic Programming",
        progress: 0,
        difficulty: "Medium",
        timeEstimate: "90 min",
      },
    ],
    hard: [
      {
        id: 13,
        title: "Advanced Graph Algorithms",
        progress: 0,
        difficulty: "Hard",
        timeEstimate: "120 min",
      },
      {
        id: 14,
        title: "Advanced Dynamic Programming",
        progress: 0,
        difficulty: "Hard",
        timeEstimate: "120 min",
      },
      {
        id: 15,
        title: "Segment Trees",
        progress: 0,
        difficulty: "Hard",
        timeEstimate: "100 min",
      },
      {
        id: 16,
        title: "Trie Data Structure",
        progress: 0,
        difficulty: "Hard",
        timeEstimate: "90 min",
      },
    ],
  };

  const progressStats = {
    basic: 68,
    easy: 37,
    medium: 12,
    hard: 0,
    overall: 29,
  };

  // Placeholder for authentication
  const handleLogin = () => {
    setIsLoggedIn(true);
    setAuthDialogOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Render sidebar navigation
  const renderSidebar = () => (
    <Sidebar
      userName="John Doe"
      userEmail="john.doe@example.com"
      userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
    />
  );

  // Render learning progress section
  const renderLearningProgress = () => (
    <LearningProgress
      difficultyProgress={[
        { level: "Basic", completed: 8, total: 10, color: "bg-green-500" },
        { level: "Easy", completed: 12, total: 20, color: "bg-blue-500" },
        { level: "Medium", completed: 5, total: 15, color: "bg-amber-500" },
        { level: "Hard", completed: 2, total: 10, color: "bg-red-500" },
      ]}
    />
  );

  // Render topic grid section
  const renderTopicGrid = () => <TopicGrid />;

  // Render authentication dialog
  const renderAuthDialog = () => (
    <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <AuthForm onSuccess={handleLogin} />
      </DialogContent>
    </Dialog>
  );

  // Render welcome screen for non-logged in users
  const renderWelcomeScreen = () => (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold">DSA Learning Platform</h1>
        <p className="text-muted-foreground">
          Master Data Structures and Algorithms through interactive
          visualizations, practice problems, and quizzes.
        </p>
        <div className="flex flex-col space-y-2">
          <Button onClick={() => setAuthDialogOpen(true)}>Sign In</Button>
          <Button variant="outline" onClick={() => setAuthDialogOpen(true)}>
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-background">
      {isLoggedIn ? (
        <div className="flex">
          {renderSidebar()}
          <div className="flex-1 p-6 overflow-auto">
            <h1 className="text-3xl font-bold mb-6">Welcome back, John!</h1>
            {renderLearningProgress()}
            {renderTopicGrid()}
          </div>
        </div>
      ) : (
        <>
          {renderWelcomeScreen()}
          {renderAuthDialog()}
        </>
      )}
    </div>
  );
};

export default Home;
