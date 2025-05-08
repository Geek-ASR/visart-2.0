import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, List, Users, BookOpen, BarChart } from "lucide-react";

const AdminDashboard = () => {
  // Mock statistics for the dashboard
  const stats = [
    {
      title: "Total Questions",
      value: "124",
      icon: <BookOpen className="h-8 w-8" />,
    },
    {
      title: "Active Users",
      value: "1,893",
      icon: <Users className="h-8 w-8" />,
    },
    {
      title: "Submissions Today",
      value: "257",
      icon: <BarChart className="h-8 w-8" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link to="/admin/questions/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Question
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Quick Actions</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Manage Questions</CardTitle>
            <CardDescription>
              View, edit or delete existing DSA questions
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link to="/admin/questions" className="w-full">
              <Button variant="outline" className="w-full">
                <List className="mr-2 h-4 w-4" />
                View All Questions
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add New Question</CardTitle>
            <CardDescription>
              Create a new DSA question for users
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link to="/admin/questions/add" className="w-full">
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Question
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
