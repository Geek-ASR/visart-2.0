import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

interface LeaderboardUser {
  id: number;
  rank: number;
  name: string;
  avatar: string;
  score: number;
  problemsSolved: number;
  streak: number;
}

const MOCK_USERS: LeaderboardUser[] = [
  {
    id: 1,
    rank: 1,
    name: "Alex Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    score: 9850,
    problemsSolved: 342,
    streak: 65,
  },
  {
    id: 2,
    rank: 2,
    name: "Samantha Lee",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samantha",
    score: 9720,
    problemsSolved: 335,
    streak: 42,
  },
  {
    id: 3,
    rank: 3,
    name: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    score: 9540,
    problemsSolved: 328,
    streak: 51,
  },
  {
    id: 4,
    rank: 4,
    name: "Emily Rodriguez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    score: 9350,
    problemsSolved: 315,
    streak: 38,
  },
  {
    id: 5,
    rank: 5,
    name: "David Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    score: 9120,
    problemsSolved: 305,
    streak: 29,
  },
  {
    id: 6,
    rank: 6,
    name: "Jessica Taylor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    score: 8950,
    problemsSolved: 298,
    streak: 33,
  },
  {
    id: 7,
    rank: 7,
    name: "Ryan Patel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
    score: 8780,
    problemsSolved: 285,
    streak: 27,
  },
  {
    id: 8,
    rank: 8,
    name: "Olivia Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    score: 8650,
    problemsSolved: 276,
    streak: 22,
  },
  {
    id: 9,
    rank: 9,
    name: "Daniel Martinez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
    score: 8520,
    problemsSolved: 268,
    streak: 19,
  },
  {
    id: 10,
    rank: 10,
    name: "Sophia Brown",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    score: 8410,
    problemsSolved: 259,
    streak: 15,
  },
];

const Leaderboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeframe, setTimeframe] = useState("all-time");

  const filteredUsers = MOCK_USERS.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container mx-auto py-6 bg-background">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <div className="flex items-center space-x-2 w-64">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="all-time" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger
              value="all-time"
              onClick={() => setTimeframe("all-time")}
            >
              All Time
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              onClick={() => setTimeframe("monthly")}
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger value="weekly" onClick={() => setTimeframe("weekly")}>
              Weekly
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all-time" className="mt-6">
            <LeaderboardTable users={filteredUsers} />
          </TabsContent>
          <TabsContent value="monthly" className="mt-6">
            <LeaderboardTable users={filteredUsers} />
          </TabsContent>
          <TabsContent value="weekly" className="mt-6">
            <LeaderboardTable users={filteredUsers} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface LeaderboardTableProps {
  users: LeaderboardUser[];
}

const LeaderboardTable = ({ users }: LeaderboardTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="py-3 px-4 text-left font-medium">Rank</th>
            <th className="py-3 px-4 text-left font-medium">User</th>
            <th className="py-3 px-4 text-right font-medium">Score</th>
            <th className="py-3 px-4 text-right font-medium">
              Problems Solved
            </th>
            <th className="py-3 px-4 text-right font-medium">Streak</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-muted/50">
              <td className="py-3 px-4 font-medium">{user.rank}</td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span>{user.name}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-right font-medium">{user.score}</td>
              <td className="py-3 px-4 text-right">{user.problemsSolved}</td>
              <td className="py-3 px-4 text-right">{user.streak} days</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
