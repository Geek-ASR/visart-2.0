import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

interface TopicCardProps {
  id: string;
  title: string;
  difficulty: "basic" | "easy" | "medium" | "hard";
  estimatedTime: string;
  progress: number;
  imageUrl: string;
}

const TopicCard = ({
  id = "1",
  title = "Arrays and Strings",
  difficulty = "basic",
  estimatedTime = "2 hours",
  progress = 65,
  imageUrl = "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80",
}: TopicCardProps) => {
  const navigate = useNavigate();
  const difficultyColors = {
    basic: "bg-green-100 text-green-800 hover:bg-green-200",
    easy: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    hard: "bg-red-100 text-red-800 hover:bg-red-200",
  };

  const handleContinueLearning = () => {
    navigate(`/topic/${id}`);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg bg-white">
      <div
        className="relative h-40 overflow-hidden cursor-pointer"
        onClick={handleContinueLearning}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <Badge
          className={`absolute top-2 right-2 ${difficultyColors[difficulty]}`}
        >
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3
          className="text-lg font-semibold mb-2 cursor-pointer hover:text-primary transition-colors"
          onClick={handleContinueLearning}
        >
          {title}
        </h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">{estimatedTime}</span>
          <span className="text-sm font-medium">{progress}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button
          variant="link"
          className="p-0 h-auto text-sm text-primary font-medium"
          onClick={handleContinueLearning}
        >
          Continue Learning
        </Button>
      </CardFooter>
    </Card>
  );
};

const TopicGrid = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("basic");
  // Mock data for different difficulty levels
  const basicTopics: TopicCardProps[] = [
    {
      id: "1",
      title: "Arrays and Strings",
      difficulty: "basic",
      estimatedTime: "2 hours",
      progress: 65,
      imageUrl:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80",
    },
    {
      id: "2",
      title: "Linked Lists",
      difficulty: "basic",
      estimatedTime: "1.5 hours",
      progress: 40,
      imageUrl:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80",
    },
    {
      id: "3",
      title: "Stacks and Queues",
      difficulty: "basic",
      estimatedTime: "2.5 hours",
      progress: 20,
      imageUrl:
        "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&q=80",
    },
    {
      id: "4",
      title: "Hash Tables",
      difficulty: "basic",
      estimatedTime: "3 hours",
      progress: 10,
      imageUrl:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80",
    },
  ];

  const easyTopics: TopicCardProps[] = [
    {
      id: "5",
      title: "Trees and Graphs",
      difficulty: "easy",
      estimatedTime: "4 hours",
      progress: 30,
      imageUrl:
        "https://images.unsplash.com/photo-1503437313881-503a91226402?w=400&q=80",
    },
    {
      id: "6",
      title: "Recursion",
      difficulty: "easy",
      estimatedTime: "3 hours",
      progress: 15,
      imageUrl:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
    },
    {
      id: "7",
      title: "Sorting Algorithms",
      difficulty: "easy",
      estimatedTime: "3.5 hours",
      progress: 5,
      imageUrl:
        "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=400&q=80",
    },
    {
      id: "8",
      title: "Searching Algorithms",
      difficulty: "easy",
      estimatedTime: "2.5 hours",
      progress: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&q=80",
    },
  ];

  const mediumTopics: TopicCardProps[] = [
    {
      id: "9",
      title: "Dynamic Programming",
      difficulty: "medium",
      estimatedTime: "6 hours",
      progress: 10,
      imageUrl:
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&q=80",
    },
    {
      id: "10",
      title: "Greedy Algorithms",
      difficulty: "medium",
      estimatedTime: "4 hours",
      progress: 5,
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    },
    {
      id: "11",
      title: "Backtracking",
      difficulty: "medium",
      estimatedTime: "5 hours",
      progress: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=400&q=80",
    },
    {
      id: "12",
      title: "Divide and Conquer",
      difficulty: "medium",
      estimatedTime: "4.5 hours",
      progress: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&q=80",
    },
  ];

  const hardTopics: TopicCardProps[] = [
    {
      id: "13",
      title: "Advanced Graph Algorithms",
      difficulty: "hard",
      estimatedTime: "8 hours",
      progress: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    },
    {
      id: "14",
      title: "Advanced Dynamic Programming",
      difficulty: "hard",
      estimatedTime: "7 hours",
      progress: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1580894732930-0babd100d356?w=400&q=80",
    },
    {
      id: "15",
      title: "NP-Complete Problems",
      difficulty: "hard",
      estimatedTime: "6 hours",
      progress: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1517373116369-9bdb8cdc9f62?w=400&q=80",
    },
    {
      id: "16",
      title: "System Design",
      difficulty: "hard",
      estimatedTime: "10 hours",
      progress: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
    },
  ];

  // Filter topics based on search query
  const filterTopics = (topics: TopicCardProps[]) => {
    if (!searchQuery) return topics;
    return topics.filter((topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold">DSA Topics</h2>

        <div className="relative mt-2 md:mt-0 w-full md:w-64">
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search topics..."
            className="w-full pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs
        defaultValue="basic"
        className="w-full"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="mb-6 bg-white">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="easy">Easy</TabsTrigger>
          <TabsTrigger value="medium">Medium</TabsTrigger>
          <TabsTrigger value="hard">Hard</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          {filterTopics(basicTopics).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filterTopics(basicTopics).map((topic) => (
                <TopicCard key={topic.id} {...topic} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No basic topics match your search.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="easy">
          {filterTopics(easyTopics).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filterTopics(easyTopics).map((topic) => (
                <TopicCard key={topic.id} {...topic} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No easy topics match your search.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="medium">
          {filterTopics(mediumTopics).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filterTopics(mediumTopics).map((topic) => (
                <TopicCard key={topic.id} {...topic} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No medium topics match your search.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="hard">
          {filterTopics(hardTopics).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filterTopics(hardTopics).map((topic) => (
                <TopicCard key={topic.id} {...topic} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No hard topics match your search.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TopicGrid;
