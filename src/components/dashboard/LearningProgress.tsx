import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Clock } from "lucide-react";

interface TopicProgress {
  id: string;
  title: string;
  progress: number;
  lastAccessed: string;
  estimatedTimeToComplete: string;
  difficulty: "basic" | "easy" | "medium" | "hard";
}

interface DifficultyProgress {
  level: string;
  completed: number;
  total: number;
  color: string;
}

interface LearningProgressProps {
  recentTopics?: TopicProgress[];
  difficultyProgress?: DifficultyProgress[];
}

const LearningProgress = ({
  recentTopics = [
    {
      id: "1",
      title: "Arrays and Linked Lists",
      progress: 65,
      lastAccessed: "2 days ago",
      estimatedTimeToComplete: "25 min",
      difficulty: "basic",
    },
    {
      id: "2",
      title: "Binary Search Trees",
      progress: 40,
      lastAccessed: "1 week ago",
      estimatedTimeToComplete: "45 min",
      difficulty: "medium",
    },
    {
      id: "3",
      title: "Dynamic Programming",
      progress: 20,
      lastAccessed: "3 days ago",
      estimatedTimeToComplete: "1 hr",
      difficulty: "hard",
    },
  ],
  difficultyProgress = [
    { level: "Basic", completed: 8, total: 10, color: "bg-green-500" },
    { level: "Easy", completed: 12, total: 20, color: "bg-blue-500" },
    { level: "Medium", completed: 5, total: 15, color: "bg-amber-500" },
    { level: "Hard", completed: 2, total: 10, color: "bg-red-500" },
  ],
}: LearningProgressProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "basic":
        return "bg-green-100 text-green-800";
      case "easy":
        return "bg-blue-100 text-blue-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm">
      <div className="flex flex-col space-y-6">
        {/* Overall Progress Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Learning Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {difficultyProgress.map((item, index) => (
              <Card key={index} className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {item.level}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold">
                      {Math.round((item.completed / item.total) * 100)}%
                    </span>
                    <span className="text-sm text-gray-500">
                      {item.completed}/{item.total} completed
                    </span>
                  </div>
                  <Progress
                    value={(item.completed / item.total) * 100}
                    className="h-2"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recently Accessed Topics */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Continue Learning</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary flex items-center gap-1"
            >
              View all <ArrowRight size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentTopics.map((topic) => (
              <Card
                key={topic.id}
                className="bg-white hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg">{topic.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(topic.difficulty)}`}
                    >
                      {topic.difficulty.charAt(0).toUpperCase() +
                        topic.difficulty.slice(1)}
                    </span>
                  </div>
                  <Progress value={topic.progress} className="h-2 mb-3" />
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <BarChart2 size={14} />
                      <span>{topic.progress}% complete</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{topic.estimatedTimeToComplete} left</span>
                    </div>
                  </div>
                  <Button className="w-full mt-3">Continue</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningProgress;
