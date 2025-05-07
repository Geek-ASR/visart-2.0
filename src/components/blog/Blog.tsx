import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar } from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content?: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  imageUrl: string;
}

interface BlogProps {
  posts?: BlogPost[];
}

// Mock data for blog posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Big O Notation",
    summary:
      "A comprehensive guide to analyzing algorithm efficiency and why it matters in software development.",
    author: "Jane Smith",
    date: "2023-06-15",
    readTime: "8 min read",
    tags: ["Algorithms", "Computer Science", "Performance"],
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
  },
  {
    id: "2",
    title: "Mastering Binary Search Trees",
    summary:
      "Learn how to implement and optimize binary search trees for efficient data retrieval and manipulation.",
    author: "John Doe",
    date: "2023-07-22",
    readTime: "12 min read",
    tags: ["Data Structures", "Trees", "Algorithms"],
    imageUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
  },
  {
    id: "3",
    title: "Dynamic Programming: From Novice to Expert",
    summary:
      "A step-by-step approach to understanding and implementing dynamic programming solutions to complex problems.",
    author: "Alice Johnson",
    date: "2023-08-05",
    readTime: "15 min read",
    tags: ["Algorithms", "Dynamic Programming", "Problem Solving"],
    imageUrl:
      "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=800&q=80",
  },
  {
    id: "4",
    title: "Graph Algorithms for Interview Preparation",
    summary:
      "Essential graph algorithms every CS student should know before technical interviews at top tech companies.",
    author: "Michael Chen",
    date: "2023-09-10",
    readTime: "10 min read",
    tags: ["Graphs", "Interviews", "Algorithms"],
    imageUrl:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
  },
];

const Blog = ({ posts = mockBlogPosts }: BlogProps) => {
  return (
    <div className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold">
                  {post.title}
                </CardTitle>
              </div>
              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                <span>{post.author}</span>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {post.summary}
              </CardDescription>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Read More</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;
