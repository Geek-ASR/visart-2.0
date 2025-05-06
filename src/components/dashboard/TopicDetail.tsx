import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  BookOpen,
  Code,
  FileText,
  Play,
  CheckCircle,
} from "lucide-react";
import Layout from "../layout";
import Quiz, { QuizQuestion } from "./Quiz";

interface TopicDetailProps {
  id?: string;
}

interface TopicData {
  id?: string;
  title: string;
  difficulty: string;
  description: string;
  progress: number;
  estimatedTime: string;
  imageUrl: string;
  concepts: string[];
  prerequisites: string[];
  quizQuestions?: QuizQuestion[];
  quizCompleted?: boolean;
  quizScore?: number;
}

const TopicDetail = ({ id: propId }: TopicDetailProps) => {
  const params = useParams();
  const navigate = useNavigate();
  const id = propId || params.id;
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Load saved quiz state from localStorage on component mount
  useEffect(() => {
    const savedQuizData = localStorage.getItem(`quiz-${id}`);
    if (savedQuizData) {
      const parsedData = JSON.parse(savedQuizData);
      setQuizCompleted(parsedData.completed || false);
      setQuizScore(parsedData.score || null);
    }
  }, [id]);

  // Mock data - in a real app, this would be fetched based on the ID
  const topicData: TopicData = {
    quizCompleted: quizCompleted,
    id: id,
    title:
      id === "1"
        ? "Arrays and Strings"
        : id === "2"
          ? "Linked Lists"
          : id === "3"
            ? "Stacks and Queues"
            : id === "9"
              ? "Dynamic Programming"
              : "Data Structure Topic",
    difficulty:
      id === "1" || id === "2"
        ? "basic"
        : id === "3" || id === "5"
          ? "easy"
          : id === "9" || id === "10"
            ? "medium"
            : "hard",
    description:
      "This topic covers fundamental concepts and operations related to this data structure, including common algorithms, time complexity analysis, and practical applications.",
    progress: id === "1" ? 65 : id === "2" ? 40 : id === "3" ? 20 : 10,
    estimatedTime:
      id === "1"
        ? "2 hours"
        : id === "2"
          ? "1.5 hours"
          : id === "3"
            ? "2.5 hours"
            : "4 hours",
    imageUrl: `https://images.unsplash.com/photo-${
      id === "1"
        ? "1516116216624-53e697fedbea"
        : id === "2"
          ? "1558494949-ef010cbdcc31"
          : id === "3"
            ? "1509228627152-72ae9ae6848d"
            : id === "9"
              ? "1504639725590-34d0984388bd"
              : "1551288049-bebda4e38f71"
    }?w=800&q=80`,
    concepts: [
      "Basic operations and implementation",
      "Time and space complexity analysis",
      "Common algorithms and techniques",
      "Real-world applications and use cases",
    ],
    prerequisites: [
      id === "2" || id === "3" ? "Arrays and Strings" : null,
      id === "9" ? "Recursion" : null,
      id === "9" ? "Trees and Graphs" : null,
    ].filter(Boolean),
    quizQuestions: [
      {
        id: 1,
        question:
          id === "1"
            ? "What is the time complexity of accessing an element in an array?"
            : id === "2"
              ? "What is the time complexity of inserting at the beginning of a linked list?"
              : id === "3"
                ? "Which operation is not possible in a queue?"
                : "What is the primary advantage of using this data structure?",
        options:
          id === "1"
            ? ["O(1)", "O(log n)", "O(n)", "O(n²)"]
            : id === "2"
              ? ["O(1)", "O(log n)", "O(n)", "O(n²)"]
              : id === "3"
                ? ["Enqueue", "Dequeue", "Peek", "Access middle element"]
                : [
                    "Fast access",
                    "Memory efficiency",
                    "Simplicity",
                    "All of the above",
                  ],
        correctAnswer: id === "1" ? 0 : id === "2" ? 0 : id === "3" ? 3 : 1,
        explanation:
          id === "1"
            ? "Array access is constant time because the memory address can be calculated directly."
            : id === "2"
              ? "Inserting at the beginning of a linked list is O(1) because we only need to update a few pointers."
              : id === "3"
                ? "Queues only allow access to the front and back elements. Accessing the middle element would require dequeuing multiple elements."
                : "This data structure is optimized for memory efficiency compared to alternatives.",
      },
      {
        id: 2,
        question:
          id === "1"
            ? "What is the worst-case time complexity of searching in an unsorted array?"
            : id === "2"
              ? "Which traversal is more efficient in a singly linked list?"
              : id === "3"
                ? "Which data structure follows the LIFO principle?"
                : "Which algorithm is commonly used with this data structure?",
        options:
          id === "1"
            ? ["O(1)", "O(log n)", "O(n)", "O(n²)"]
            : id === "2"
              ? [
                  "Forward traversal",
                  "Backward traversal",
                  "Random access",
                  "Binary search",
                ]
              : id === "3"
                ? ["Queue", "Stack", "Linked List", "Tree"]
                : [
                    "Bubble sort",
                    "Quick sort",
                    "Merge sort",
                    "Depends on the implementation",
                  ],
        correctAnswer: id === "1" ? 2 : id === "2" ? 0 : id === "3" ? 1 : 3,
        explanation:
          id === "1"
            ? "In the worst case, we need to check every element in an unsorted array to find a target element."
            : id === "2"
              ? "Singly linked lists only maintain references to the next node, making forward traversal efficient."
              : id === "3"
                ? "Stacks follow the Last In, First Out (LIFO) principle."
                : "The choice of algorithm depends on the specific implementation and requirements.",
      },
      {
        id: 3,
        question:
          id === "1"
            ? "Which operation is most efficient in an array?"
            : id === "2"
              ? "What is a key advantage of a doubly linked list over a singly linked list?"
              : id === "3"
                ? "What is the space complexity of implementing a stack using an array?"
                : "What is a common application of this data structure?",
        options:
          id === "1"
            ? [
                "Access by index",
                "Insertion at beginning",
                "Deletion from middle",
                "Searching in unsorted array",
              ]
            : id === "2"
              ? [
                  "Less memory usage",
                  "Faster insertion at beginning",
                  "Bidirectional traversal",
                  "Better cache locality",
                ]
              : id === "3"
                ? ["O(1)", "O(n)", "O(log n)", "O(n²)"]
                : [
                    "Database indexing",
                    "Expression evaluation",
                    "Memory management",
                    "All of the above",
                  ],
        correctAnswer: id === "1" ? 0 : id === "2" ? 2 : id === "3" ? 1 : 3,
        explanation:
          id === "1"
            ? "Arrays provide O(1) constant time access by index because they use contiguous memory locations."
            : id === "2"
              ? "Doubly linked lists maintain references to both next and previous nodes, enabling traversal in both directions."
              : id === "3"
                ? "The space complexity is O(n) where n is the maximum number of elements to be stored in the stack."
                : "This data structure is versatile and used in all these applications and more.",
      },
    ],
  };

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
    <Layout>
      <div className="container mx-auto py-6">
        <Button
          variant="ghost"
          className="mb-4 flex items-center gap-1"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} /> Back to Topics
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Topic Overview */}
          <div className="lg:col-span-2">
            <Card className="bg-white">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={topicData.imageUrl}
                  alt={topicData.title}
                  className="w-full h-full object-cover"
                />
                <Badge
                  className={`absolute top-4 right-4 ${getDifficultyColor(topicData.difficulty)}`}
                >
                  {topicData.difficulty.charAt(0).toUpperCase() +
                    topicData.difficulty.slice(1)}
                </Badge>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-bold">
                    {topicData.title}
                  </CardTitle>
                  <div className="text-sm text-gray-500">
                    Estimated time: {topicData.estimatedTime}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Your progress</span>
                    <span className="text-sm">
                      {topicData.progress}% complete
                    </span>
                  </div>
                  <Progress value={topicData.progress} className="h-2" />
                </div>

                <p className="text-gray-700 mb-6">{topicData.description}</p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Key Concepts</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {topicData.concepts.map((concept, index) => (
                      <li key={index} className="text-gray-700">
                        {concept}
                      </li>
                    ))}
                  </ul>
                </div>

                {topicData.prerequisites.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Prerequisites
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {topicData.prerequisites.map((prereq, index) => (
                        <li key={index} className="text-gray-700">
                          {prereq}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Actions Panel */}
          <div>
            <Card className="bg-white mb-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Start Learning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full flex items-center justify-center gap-2">
                  <BookOpen size={18} /> Start Tutorial
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Play size={18} /> Watch Video Explanation
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <FileText size={18} /> View Cheat Sheet
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Code size={18} /> Practice Problems
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Related Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  id === "1" ? "Strings" : "Arrays",
                  id === "1" || id === "2" ? "Hash Tables" : "Binary Search",
                  id === "9" ? "Greedy Algorithms" : "Recursion",
                ].map((topic, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    {topic}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Learning Content Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="learn" className="w-full">
            <TabsList className="bg-white mb-6">
              <TabsTrigger value="learn">Learn</TabsTrigger>
              <TabsTrigger value="visualize">Visualize</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
            </TabsList>

            <TabsContent value="learn" className="space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Introduction to {topicData.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    This section provides a comprehensive introduction to{" "}
                    {topicData.title}, covering fundamental concepts,
                    implementation details, and common operations.
                  </p>
                  <p>
                    Content for the learning section would be displayed here,
                    including text explanations, code examples, and
                    illustrations to help understand the topic.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visualize" className="space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Interactive Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 h-80 flex items-center justify-center rounded-md">
                    <p className="text-gray-500">
                      Interactive visualization would be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="practice" className="space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Practice Problems</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((problem) => (
                      <Card key={problem} className="bg-gray-50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">
                            Problem {problem}: Example Problem Title
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-2">
                            Difficulty:{" "}
                            {problem === 1
                              ? "Easy"
                              : problem === 2
                                ? "Medium"
                                : "Hard"}
                          </p>
                          <p className="mb-4">
                            Brief description of the problem would go here...
                          </p>
                          <Button>Solve Problem</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quiz" className="space-y-6">
              {!showQuiz ? (
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Knowledge Check Quiz</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Test your understanding of {topicData.title} with this
                      quiz.
                    </p>
                    <div className="flex items-center gap-4">
                      <Button onClick={() => setShowQuiz(true)}>
                        {quizCompleted ? "Retake Quiz" : "Start Quiz"}
                      </Button>
                      {quizCompleted && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle size={18} />
                          <span>
                            Completed with score: {quizScore}/
                            {topicData.quizQuestions?.length || 0}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Quiz
                  title={`${topicData.title} Knowledge Check`}
                  questions={topicData.quizQuestions || []}
                  onComplete={(score, total) => {
                    console.log(`Quiz completed with score: ${score}/${total}`);
                    // Save quiz completion data to localStorage
                    localStorage.setItem(
                      `quiz-${id}`,
                      JSON.stringify({
                        completed: true,
                        score: score,
                        total: total,
                        completedAt: new Date().toISOString(),
                      }),
                    );

                    // Update state
                    setQuizCompleted(true);
                    setQuizScore(score);

                    // Here you could also update user progress in a database
                  }}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default TopicDetail;
