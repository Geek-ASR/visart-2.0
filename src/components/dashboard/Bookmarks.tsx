import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, BookOpen, Code, Bookmark } from "lucide-react";

interface BookmarkItem {
  id: number;
  title: string;
  type: "problem" | "article" | "video";
  difficulty?: "easy" | "medium" | "hard";
  topics: string[];
  dateBookmarked: string;
  url: string;
}

const MOCK_BOOKMARKS: BookmarkItem[] = [
  {
    id: 1,
    title: "Two Sum",
    type: "problem",
    difficulty: "easy",
    topics: ["Array", "Hash Table"],
    dateBookmarked: "2023-08-15",
    url: "/problem/1",
  },
  {
    id: 2,
    title: "Understanding Binary Search Trees",
    type: "article",
    topics: ["Tree", "Binary Search Tree"],
    dateBookmarked: "2023-08-10",
    url: "/blogs/binary-search-trees",
  },
  {
    id: 3,
    title: "Merge Sort Implementation",
    type: "problem",
    difficulty: "medium",
    topics: ["Sorting", "Divide and Conquer"],
    dateBookmarked: "2023-08-05",
    url: "/problem/24",
  },
  {
    id: 4,
    title: "Graph Traversal Algorithms",
    type: "article",
    topics: ["Graph", "BFS", "DFS"],
    dateBookmarked: "2023-07-28",
    url: "/blogs/graph-traversal",
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    type: "problem",
    difficulty: "medium",
    topics: ["String", "Dynamic Programming"],
    dateBookmarked: "2023-07-20",
    url: "/problem/5",
  },
  {
    id: 6,
    title: "Introduction to Dynamic Programming",
    type: "video",
    topics: ["Dynamic Programming"],
    dateBookmarked: "2023-07-15",
    url: "/blogs/dynamic-programming-intro",
  },
  {
    id: 7,
    title: "Trapping Rain Water",
    type: "problem",
    difficulty: "hard",
    topics: ["Array", "Two Pointers", "Stack"],
    dateBookmarked: "2023-07-10",
    url: "/problem/42",
  },
  {
    id: 8,
    title: "Advanced Recursion Techniques",
    type: "article",
    topics: ["Recursion", "Backtracking"],
    dateBookmarked: "2023-07-05",
    url: "/blogs/advanced-recursion",
  },
];

const Bookmarks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredBookmarks = MOCK_BOOKMARKS.filter((bookmark) => {
    const matchesSearch = bookmark.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = activeTab === "all" || bookmark.type === activeTab;
    return matchesSearch && matchesType;
  });

  return (
    <div className="container mx-auto py-6 bg-background">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Bookmarks</h1>
          <div className="flex items-center space-x-2 w-64">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookmarks..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
              All
            </TabsTrigger>
            <TabsTrigger
              value="problem"
              onClick={() => setActiveTab("problem")}
            >
              Problems
            </TabsTrigger>
            <TabsTrigger
              value="article"
              onClick={() => setActiveTab("article")}
            >
              Articles
            </TabsTrigger>
            <TabsTrigger value="video" onClick={() => setActiveTab("video")}>
              Videos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <BookmarksList bookmarks={filteredBookmarks} />
          </TabsContent>
          <TabsContent value="problem" className="mt-6">
            <BookmarksList bookmarks={filteredBookmarks} />
          </TabsContent>
          <TabsContent value="article" className="mt-6">
            <BookmarksList bookmarks={filteredBookmarks} />
          </TabsContent>
          <TabsContent value="video" className="mt-6">
            <BookmarksList bookmarks={filteredBookmarks} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface BookmarksListProps {
  bookmarks: BookmarkItem[];
}

const BookmarksList = ({ bookmarks }: BookmarksListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="border rounded-lg p-4 hover:bg-accent transition-colors"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              {bookmark.type === "problem" && (
                <Code className="h-5 w-5 text-blue-500" />
              )}
              {bookmark.type === "article" && (
                <BookOpen className="h-5 w-5 text-green-500" />
              )}
              {bookmark.type === "video" && (
                <BookOpen className="h-5 w-5 text-purple-500" />
              )}
              <h3 className="font-medium">{bookmark.title}</h3>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {bookmark.topics.map((topic) => (
              <Badge key={topic} variant="secondary">
                {topic}
              </Badge>
            ))}
          </div>

          {bookmark.difficulty && (
            <div className="mt-2">
              <Badge
                className={`${bookmark.difficulty === "easy" ? "bg-green-500" : bookmark.difficulty === "medium" ? "bg-yellow-500" : "bg-red-500"} text-white`}
              >
                {bookmark.difficulty}
              </Badge>
            </div>
          )}

          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            <span>Bookmarked on {bookmark.dateBookmarked}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;
