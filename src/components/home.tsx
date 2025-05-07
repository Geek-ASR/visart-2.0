import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
  ArrowRight,
  CheckCircle,
  Laptop,
  Brain,
  Lightbulb,
  Rocket,
  Target,
  TrendingUp,
} from "lucide-react";

// Import components
import Layout from "./layout";
import LearningProgress from "./dashboard/LearningProgress";
import TopicGrid from "./dashboard/TopicGrid";
import AuthForm from "./auth/AuthForm";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Placeholder for authentication
  const handleLogin = () => {
    setIsLoggedIn(true);
    setAuthDialogOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Render authentication dialog
  const renderAuthDialog = () => (
    <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <AuthForm onSuccess={handleLogin} />
      </DialogContent>
    </Dialog>
  );

  // Feature highlights for the landing page
  const features = [
    {
      title: "Interactive Learning",
      description:
        "Visualize algorithms and data structures with interactive animations",
      icon: <Lightbulb className="h-10 w-10 text-amber-500" />,
      color: "bg-amber-50",
      route: "/topics",
    },
    {
      title: "Coding Challenges",
      description:
        "Practice with real-world coding problems and test your solutions",
      icon: <Code className="h-10 w-10 text-blue-500" />,
      color: "bg-blue-50",
      route: "/challenges",
    },
    {
      title: "Progress Tracking",
      description:
        "Track your learning journey with detailed progress analytics",
      icon: <TrendingUp className="h-10 w-10 text-green-500" />,
      color: "bg-green-50",
      route: "/progress",
    },
    {
      title: "Educational Blogs",
      description:
        "Learn from expert articles and participate in interactive workshops",
      icon: <BookOpen className="h-10 w-10 text-purple-500" />,
      color: "bg-purple-50",
      route: "/blogs",
    },
  ];

  // Statistics for the platform
  const stats = [
    {
      label: "DSA Topics",
      value: "40+",
      icon: <BookMarked className="h-5 w-5" />,
    },
    {
      label: "Coding Challenges",
      value: "200+",
      icon: <Code className="h-5 w-5" />,
    },
    { label: "Workshops", value: "25+", icon: <Users className="h-5 w-5" /> },
    {
      label: "Learning Paths",
      value: "10+",
      icon: <Compass className="h-5 w-5" />,
    },
  ];

  // Learning paths
  const learningPaths = [
    {
      title: "Beginner Path",
      description: "Master the fundamentals of data structures and algorithms",
      topics: ["Arrays", "Linked Lists", "Basic Sorting", "Recursion Basics"],
      color: "border-green-500",
      icon: <Target className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Intermediate Path",
      description: "Dive deeper into complex algorithms and problem-solving",
      topics: ["Trees & Graphs", "Dynamic Programming", "Greedy Algorithms"],
      color: "border-blue-500",
      icon: <Brain className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Advanced Path",
      description: "Tackle challenging problems and system design concepts",
      topics: ["Advanced Graphs", "NP-Complete Problems", "System Design"],
      color: "border-red-500",
      icon: <Rocket className="h-8 w-8 text-red-500" />,
    },
  ];

  // Render welcome screen for non-logged in users
  const renderWelcomeScreen = () => (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background pt-16 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
              <div>
                <Badge className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
                  New Platform Launch
                </Badge>
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                  <span className="block">Master Data Structures</span>
                  <span className="block text-primary">& Algorithms</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  An interactive learning platform with visualizations, practice
                  problems, and expert guidance to help you excel in technical
                  interviews.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                    <Button size="lg" onClick={() => setAuthDialogOpen(true)}>
                      Get Started
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => navigate("/topics")}
                    >
                      Explore Topics
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                  <img
                    className="w-full"
                    src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80"
                    alt="Learning platform screenshot"
                  />
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-white/90 hover:bg-white rounded-full h-16 w-16"
                    >
                      <Laptop className="h-8 w-8 text-primary" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="border-none shadow-none">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Platform Features</h2>
            <p className="text-lg text-muted-foreground mt-2">
              Everything you need to master algorithms and ace technical
              interviews
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-none shadow-md hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div
                    className={`rounded-full ${feature.color} p-4 inline-block mb-4`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto font-medium flex items-center"
                    onClick={() => navigate(feature.route)}
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Paths Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Learning Paths</h2>
            <p className="text-lg text-muted-foreground mt-2">
              Structured curriculum to guide your learning journey
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <Card key={index} className={`border-t-4 ${path.color}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{path.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {path.description}
                      </CardDescription>
                    </div>
                    {path.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {path.topics.map((topic, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Start This Path
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start your DSA journey?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of students mastering algorithms and preparing for
            technical interviews
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => setAuthDialogOpen(true)}
            className="font-semibold"
          >
            Create Free Account
          </Button>
        </div>
      </div>

      {renderAuthDialog()}
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-background">
      {isLoggedIn ? (
        <Layout>
          <h1 className="text-3xl font-bold mb-6">Welcome back, John!</h1>
          <LearningProgress />
          <div className="mt-8">
            <TopicGrid />
          </div>
        </Layout>
      ) : (
        <>{renderWelcomeScreen()}</>
      )}
    </div>
  );
};

export default Home;
