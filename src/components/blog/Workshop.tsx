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
import { Calendar, Clock, Code, DollarSign } from "lucide-react";

export interface Workshop {
  id: string;
  title: string;
  description: string;
  instructor: string;
  date: string;
  duration: string;
  techStack: string[];
  isPaid: boolean;
  price?: string;
  imageUrl: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

interface WorkshopProps {
  workshops?: Workshop[];
}

// Mock data for workshops
export const mockWorkshops: Workshop[] = [
  {
    id: "1",
    title: "React Fundamentals for Beginners",
    description:
      "Learn the basics of React.js and build your first interactive web application from scratch.",
    instructor: "Sarah Johnson",
    date: "2023-10-15",
    duration: "3 hours",
    techStack: ["React", "JavaScript", "HTML/CSS"],
    isPaid: false,
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    level: "Beginner",
  },
  {
    id: "2",
    title: "Advanced Data Structures Implementation",
    description:
      "Deep dive into implementing complex data structures like AVL trees, Red-Black trees, and B-trees.",
    instructor: "David Chen",
    date: "2023-11-05",
    duration: "4 hours",
    techStack: ["C++", "Java", "Python"],
    isPaid: true,
    price: "$49.99",
    imageUrl:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
    level: "Advanced",
  },
  {
    id: "3",
    title: "Building Microservices with Node.js",
    description:
      "Learn how to design, develop, and deploy scalable microservices architecture using Node.js and Docker.",
    instructor: "Michael Rodriguez",
    date: "2023-11-20",
    duration: "6 hours",
    techStack: ["Node.js", "Express", "Docker", "MongoDB"],
    isPaid: true,
    price: "$79.99",
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    level: "Intermediate",
  },
  {
    id: "4",
    title: "Introduction to Machine Learning with Python",
    description:
      "Get started with machine learning concepts and implement basic algorithms using Python and scikit-learn.",
    instructor: "Emily Wong",
    date: "2023-12-10",
    duration: "5 hours",
    techStack: ["Python", "NumPy", "Pandas", "scikit-learn"],
    isPaid: false,
    imageUrl:
      "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800&q=80",
    level: "Beginner",
  },
];

const Workshop = ({ workshops = mockWorkshops }: WorkshopProps) => {
  return (
    <div className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workshops.map((workshop) => (
          <Card
            key={workshop.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={workshop.imageUrl}
                alt={workshop.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold">
                  {workshop.title}
                </CardTitle>
                <Badge
                  variant={workshop.isPaid ? "default" : "outline"}
                  className={
                    workshop.isPaid
                      ? "bg-primary"
                      : "border-primary text-primary"
                  }
                >
                  {workshop.isPaid ? (
                    <span className="flex items-center">
                      <DollarSign size={14} className="mr-1" />
                      {workshop.price}
                    </span>
                  ) : (
                    "Free"
                  )}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                <span>{workshop.instructor}</span>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  <span>{workshop.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{workshop.duration}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {workshop.description}
              </CardDescription>
              <div className="mt-4">
                <Badge variant="secondary" className="mr-2">
                  {workshop.level}
                </Badge>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Code size={14} className="mr-1" />
                  <span>Tech Stack:</span>
                </div>
                {workshop.techStack.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                {workshop.isPaid ? "Enroll Now" : "Register Free"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Workshop;
