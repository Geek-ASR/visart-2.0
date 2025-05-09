import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, RotateCcw, Check, X } from "lucide-react";
import Layout from "../layout";

interface CodeEditorProps {
  problemId?: string;
  problemTitle?: string;
  problemDescription?: string;
  difficulty?: "easy" | "medium" | "hard";
}

const MOCK_PROBLEMS = [
  {
    id: "1",
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    difficulty: "easy",
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]" },
      { input: "nums = [3,3], target = 6", expectedOutput: "[0,1]" },
    ],
    starterCode: `function twoSum(nums, target) {\n  // Write your solution here\n  \n}`,
  },
  {
    id: "2",
    title: "Missing Numbers in Array",
    description:
      "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
    difficulty: "easy",
    testCases: [
      { input: "nums = [3,0,1]", expectedOutput: "2" },
      { input: "nums = [0,1]", expectedOutput: "2" },
      { input: "nums = [9,6,4,2,3,5,7,0,1]", expectedOutput: "8" },
    ],
    starterCode: `function missingNumber(nums) {\n  // Write your solution here\n  \n}`,
  },
  {
    id: "3",
    title: "Second Largest in Array",
    description:
      "Given an array of integers, find the second largest element in the array.",
    difficulty: "medium",
    testCases: [
      { input: "nums = [12, 35, 1, 10, 34, 1]", expectedOutput: "34" },
      { input: "nums = [10, 5, 10]", expectedOutput: "5" },
      { input: "nums = [10, 10, 10]", expectedOutput: "-1" },
    ],
    starterCode: `function findSecondLargest(nums) {\n  // Write your solution here\n  \n}`,
  },
  {
    id: "4",
    title: "Binary Search",
    description:
      "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
    difficulty: "easy",
    testCases: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", expectedOutput: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", expectedOutput: "-1" },
      { input: "nums = [5], target = 5", expectedOutput: "0" },
    ],
    starterCode: `function search(nums, target) {\n  // Write your solution here\n  \n}`,
  },
  {
    id: "5",
    title: "Remove Loop from Linked List",
    description:
      "Given a linked list, detect and remove a loop if present in the linked list.",
    difficulty: "medium",
    testCases: [
      { input: "head = [1,2,3,4,2]", expectedOutput: "[1,2,3,4]" },
      { input: "head = [1,2,3,4,5,6,3]", expectedOutput: "[1,2,3,4,5,6]" },
      { input: "head = [1,2,3,4]", expectedOutput: "[1,2,3,4]" },
    ],
    starterCode: `function removeLoop(head) {\n  // Write your solution here\n  // Note: This is a representation of linked list with a loop\n  // The actual implementation would be different\n  \n}`,
  },
];

const CodeEditor = () => {
  const { id } = useParams();
  const [problemId, setProblemId] = useState(id || "1");
  const [problemTitle, setProblemTitle] = useState("Two Sum");
  const [problemDescription, setProblemDescription] = useState(
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
  );
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy",
  );
  const [testCases, setTestCases] = useState([
    { input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]" },
    { input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]" },
    { input: "nums = [3,3], target = 6", expectedOutput: "[0,1]" },
  ]);

  useEffect(() => {
    // Find the problem by ID
    const problem = MOCK_PROBLEMS.find((p) => p.id === problemId);
    if (problem) {
      setProblemTitle(problem.title);
      setProblemDescription(problem.description);
      setDifficulty(problem.difficulty as "easy" | "medium" | "hard");
      setTestCases(problem.testCases);
      setCode(problem.starterCode);
    }
  }, [problemId]);

  useEffect(() => {
    if (id) {
      setProblemId(id);
    }
  }, [id]);
  const [code, setCode] = useState(
    `function twoSum(nums, target) {\n  // Write your solution here\n  \n}`,
  );
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testsPassed, setTestsPassed] = useState<boolean | null>(null);

  // testCases are now set in the state

  const handleRunCode = () => {
    setIsRunning(true);
    setTestsPassed(null);
    setOutput("Running tests...\n");

    // Simulate code execution with a delay
    setTimeout(() => {
      try {
        // This is a simplified simulation of code execution
        // In a real app, you would evaluate the code against test cases
        const results = testCases.map((test, index) => {
          const passed = Math.random() > 0.3; // Randomly pass or fail for demo
          return {
            testCase: index + 1,
            input: test.input,
            expectedOutput: test.expectedOutput,
            actualOutput: passed ? test.expectedOutput : "[1,0]",
            passed,
          };
        });

        const allPassed = results.every((r) => r.passed);
        setTestsPassed(allPassed);

        const outputText = results
          .map(
            (r) =>
              `Test Case ${r.testCase}: ${r.passed ? "✓" : "✗"}\n` +
              `  Input: ${r.input}\n` +
              `  Expected: ${r.expectedOutput}\n` +
              `  Actual: ${r.actualOutput}\n`,
          )
          .join("\n");

        setOutput(
          outputText +
            "\n" +
            (allPassed
              ? "All tests passed! Great job!"
              : "Some tests failed. Keep trying!"),
        );
      } catch (error) {
        setTestsPassed(false);
        setOutput(
          `Error: ${error instanceof Error ? error.message : String(error)}`,
        );
      } finally {
        setIsRunning(false);
      }
    }, 1500);
  };

  const handleReset = () => {
    setCode(
      `function twoSum(nums, target) {\n  // Write your solution here\n  \n}`,
    );
    setOutput("");
    setTestsPassed(null);
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "easy":
        return "text-green-600";
      case "medium":
        return "text-amber-600";
      case "hard":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Problem Description */}
          <div className="lg:col-span-1">
            <Card className="bg-white h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold">
                    {problemTitle}
                  </CardTitle>
                  <span
                    className={`font-medium ${getDifficultyColor(difficulty)}`}
                  >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="mb-4">{problemDescription}</p>

                  <h3 className="text-lg font-semibold mb-2">Examples:</h3>
                  <div className="space-y-4">
                    {testCases.map((test, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md">
                        <p className="font-medium">Example {index + 1}:</p>
                        <p className="font-mono text-sm">Input: {test.input}</p>
                        <p className="font-mono text-sm">
                          Output: {test.expectedOutput}
                        </p>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold mt-4 mb-2">
                    Constraints:
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>2 ≤ nums.length ≤ 10^4</li>
                    <li>-10^9 ≤ nums[i] ≤ 10^9</li>
                    <li>-10^9 ≤ target ≤ 10^9</li>
                    <li>Only one valid answer exists.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Editor and Output */}
          <div className="lg:col-span-2">
            <Card className="bg-white h-full">
              <CardHeader className="border-b">
                <Tabs defaultValue="javascript" className="w-full">
                  <TabsList>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python" disabled>
                      Python
                    </TabsTrigger>
                    <TabsTrigger value="java" disabled>
                      Java
                    </TabsTrigger>
                    <TabsTrigger value="cpp" disabled>
                      C++
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[calc(100vh-300px)] flex flex-col">
                  {/* Code Editor */}
                  <div className="flex-1 min-h-[300px] font-mono">
                    <textarea
                      className="w-full h-full p-4 bg-gray-50 font-mono text-sm resize-none focus:outline-none"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      spellCheck="false"
                    />
                  </div>

                  {/* Controls */}
                  <div className="border-t border-b p-2 flex justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="flex items-center gap-1"
                      >
                        <Play size={16} />
                        {isRunning ? "Running..." : "Run Code"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleReset}
                        className="flex items-center gap-1"
                      >
                        <RotateCcw size={16} />
                        Reset
                      </Button>
                    </div>

                    {testsPassed !== null && (
                      <div className="flex items-center gap-2">
                        {testsPassed ? (
                          <div className="flex items-center text-green-600 gap-1">
                            <Check size={18} />
                            All tests passed
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600 gap-1">
                            <X size={18} />
                            Tests failed
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Output Console */}
                  <div className="flex-1 min-h-[150px] max-h-[200px] overflow-auto bg-gray-900 text-gray-100 p-4 font-mono text-sm">
                    <pre>
                      {output ||
                        "// Output will appear here after running your code"}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CodeEditor;
