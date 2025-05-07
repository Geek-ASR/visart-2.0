import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Layout from "../layout";
import { Link } from "react-router-dom";

interface Challenge {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
}

const MOCK_CHALLENGES: Challenge[] = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "easy",
    topic: "Array",
  },
  {
    id: "2",
    title: "Missing numbers in an array",
    difficulty: "easy",
    topic: "Array",
  },
  {
    id: "3",
    title: "Finding the second largest in an array",
    difficulty: "medium",
    topic: "Array",
  },
  {
    id: "4",
    title: "Binary Search",
    difficulty: "easy",
    topic: "Search",
  },
  {
    id: "5",
    title: "Remove loop from linked list",
    difficulty: "medium",
    topic: "Linked List",
  },
  {
    id: "6",
    title: "Rotate an array",
    difficulty: "medium",
    topic: "Array",
  },
  {
    id: "7",
    title: "Indexes of sub array",
    difficulty: "hard",
    topic: "Array",
  },
];

const TOPICS = [
  "All",
  "Array",
  "Linked List",
  "Search",
  "Tree",
  "Graph",
  "Dynamic Programming",
];
const DIFFICULTY_LEVELS = ["All", "easy", "medium", "hard"];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-amber-100 text-amber-800";
    case "hard":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Challenges = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");

  const filteredChallenges = MOCK_CHALLENGES.filter((challenge) => {
    const matchesSearch = challenge.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTopic =
      selectedTopic === "All" || challenge.topic === selectedTopic;
    const matchesDifficulty =
      selectedDifficulty === "All" ||
      challenge.difficulty === selectedDifficulty;

    return matchesSearch && matchesTopic && matchesDifficulty;
  });

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Challenges</h1>
        <Button variant="default" className="bg-primary hover:bg-primary/90">
          Solve Problem of the day
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 max-w-xs">
          <div className="flex items-center">
            <span className="mr-2">Topic</span>
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {TOPICS.map((topic) => (
                  <SelectItem key={topic} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-1 max-w-xs">
          <div className="flex items-center">
            <span className="mr-2">Difficulty level</span>
            <Select
              value={selectedDifficulty}
              onValueChange={setSelectedDifficulty}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {DIFFICULTY_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredChallenges.map((challenge) => (
          <Card
            key={challenge.id}
            className="p-4 bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">{challenge.title}</h3>
                <div className="flex items-center mt-1 gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(challenge.difficulty)}`}
                  >
                    {challenge.difficulty.charAt(0).toUpperCase() +
                      challenge.difficulty.slice(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {challenge.topic}
                  </span>
                </div>
              </div>
              <Link to={`/problem/${challenge.id}`}>
                <Button
                  variant="outline"
                  className="hover:bg-primary hover:text-white"
                >
                  Solve
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
