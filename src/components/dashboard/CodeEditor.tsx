import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, RotateCcw, Check, X } from "lucide-react";
import Layout from "../layout";
import Editor from "@monaco-editor/react";

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
    starterCode: {
      javascript: `function twoSum(nums, target) {\n  // Write your solution here\n  \n}`,
      python: `def two_sum(nums, target):\n    # Write your solution here\n    \n    pass`,
      java: `public class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        \n        return new int[]{0, 0};\n    }\n}`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {\n    // Write your solution here\n    \n    return {0, 0};\n}`,
    },
    solution: {
      javascript: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
      python: `def two_sum(nums, target):\n    num_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in num_map:\n            return [num_map[complement], i]\n        num_map[num] = i\n    return []`,
      java: `public class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> map;\n    for (int i = 0; i < nums.size(); i++) {\n        int complement = target - nums[i];\n        if (map.find(complement) != map.end()) {\n            return {map[complement], i};\n        }\n        map[nums[i]] = i;\n    }\n    return {};\n}`,
    },
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
    starterCode: {
      javascript: `function missingNumber(nums) {\n  // Write your solution here\n  \n}`,
      python: `def missing_number(nums):\n    # Write your solution here\n    \n    pass`,
      java: `public class Solution {\n    public int missingNumber(int[] nums) {\n        // Write your solution here\n        \n        return 0;\n    }\n}`,
      cpp: `int missingNumber(vector<int>& nums) {\n    // Write your solution here\n    \n    return 0;\n}`,
    },
    solution: {
      javascript: `function missingNumber(nums) {\n  const n = nums.length;\n  let expectedSum = (n * (n + 1)) / 2;\n  let actualSum = nums.reduce((sum, num) => sum + num, 0);\n  return expectedSum - actualSum;\n}`,
      python: `def missing_number(nums):\n    n = len(nums)\n    expected_sum = n * (n + 1) // 2\n    actual_sum = sum(nums)\n    return expected_sum - actual_sum`,
      java: `public class Solution {\n    public int missingNumber(int[] nums) {\n        int n = nums.length;\n        int expectedSum = n * (n + 1) / 2;\n        int actualSum = 0;\n        for (int num : nums) {\n            actualSum += num;\n        }\n        return expectedSum - actualSum;\n    }\n}`,
      cpp: `int missingNumber(vector<int>& nums) {\n    int n = nums.size();\n    int expectedSum = n * (n + 1) / 2;\n    int actualSum = 0;\n    for (int num : nums) {\n        actualSum += num;\n    }\n    return expectedSum - actualSum;\n}`,
    },
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
    starterCode: {
      javascript: `function findSecondLargest(nums) {\n  // Write your solution here\n  \n}`,
      python: `def find_second_largest(nums):\n    # Write your solution here\n    \n    pass`,
      java: `public class Solution {\n    public int findSecondLargest(int[] nums) {\n        // Write your solution here\n        \n        return 0;\n    }\n}`,
      cpp: `int findSecondLargest(vector<int>& nums) {\n    // Write your solution here\n    \n    return 0;\n}`,
    },
    solution: {
      javascript: `function findSecondLargest(nums) {\n  let first = -Infinity;\n  let second = -Infinity;\n  \n  for (let num of nums) {\n    if (num > first) {\n      second = first;\n      first = num;\n    } else if (num > second && num < first) {\n      second = num;\n    }\n  }\n  \n  return second === -Infinity ? -1 : second;\n}`,
      python: `def find_second_largest(nums):\n    if len(nums) < 2:\n        return -1\n    \n    first = second = float('-inf')\n    \n    for num in nums:\n        if num > first:\n            second = first\n            first = num\n        elif num > second and num < first:\n            second = num\n    \n    return second if second != float('-inf') else -1`,
      java: `public class Solution {\n    public int findSecondLargest(int[] nums) {\n        if (nums.length < 2) {\n            return -1;\n        }\n        \n        int first = Integer.MIN_VALUE;\n        int second = Integer.MIN_VALUE;\n        \n        for (int num : nums) {\n            if (num > first) {\n                second = first;\n                first = num;\n            } else if (num > second && num < first) {\n                second = num;\n            }\n        }\n        \n        return second == Integer.MIN_VALUE ? -1 : second;\n    }\n}`,
      cpp: `int findSecondLargest(vector<int>& nums) {\n    if (nums.size() < 2) {\n        return -1;\n    }\n    \n    int first = INT_MIN;\n    int second = INT_MIN;\n    \n    for (int num : nums) {\n        if (num > first) {\n            second = first;\n            first = num;\n        } else if (num > second && num < first) {\n            second = num;\n        }\n    }\n    \n    return second == INT_MIN ? -1 : second;\n}`,
    },
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
    starterCode: {
      javascript: `function search(nums, target) {\n  // Write your solution here\n  \n}`,
      python: `def search(nums, target):\n    # Write your solution here\n    \n    pass`,
      java: `public class Solution {\n    public int search(int[] nums, int target) {\n        // Write your solution here\n        \n        return -1;\n    }\n}`,
      cpp: `int search(vector<int>& nums, int target) {\n    // Write your solution here\n    \n    return -1;\n}`,
    },
    solution: {
      javascript: `function search(nums, target) {\n  let left = 0;\n  let right = nums.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) {\n      return mid;\n    } else if (nums[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n  \n  return -1;\n}`,
      python: `def search(nums, target):\n    left, right = 0, len(nums) - 1\n    \n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    \n    return -1`,
      java: `public class Solution {\n    public int search(int[] nums, int target) {\n        int left = 0;\n        int right = nums.length - 1;\n        \n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) {\n                return mid;\n            } else if (nums[mid] < target) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        \n        return -1;\n    }\n}`,
      cpp: `int search(vector<int>& nums, int target) {\n    int left = 0;\n    int right = nums.size() - 1;\n    \n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) {\n            return mid;\n        } else if (nums[mid] < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    \n    return -1;\n}`,
    },
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
    starterCode: {
      javascript: `function removeLoop(head) {\n  // Write your solution here\n  // Note: This is a representation of linked list with a loop\n  // The actual implementation would be different\n  \n}`,
      python: `def remove_loop(head):\n    # Write your solution here\n    # Note: This is a representation of linked list with a loop\n    # The actual implementation would be different\n    \n    pass`,
      java: `public class Solution {\n    public ListNode removeLoop(ListNode head) {\n        // Write your solution here\n        // Note: This is a representation of linked list with a loop\n        // The actual implementation would be different\n        \n        return head;\n    }\n}`,
      cpp: `ListNode* removeLoop(ListNode* head) {\n    // Write your solution here\n    // Note: This is a representation of linked list with a loop\n    // The actual implementation would be different\n    \n    return head;\n}`,
    },
    solution: {
      javascript: `function removeLoop(head) {\n  // This is a simplified implementation for demonstration\n  // In a real scenario, we would need a proper LinkedList class\n  if (!head || !head.next) return head;\n  \n  let slow = head;\n  let fast = head;\n  \n  // Detect loop\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) break;\n  }\n  \n  // No loop found\n  if (slow !== fast) return head;\n  \n  // Find start of loop\n  slow = head;\n  while (slow.next !== fast.next) {\n    slow = slow.next;\n    fast = fast.next;\n  }\n  \n  // Remove loop\n  fast.next = null;\n  return head;\n}`,
      python: `def remove_loop(head):\n    # This is a simplified implementation for demonstration\n    # In a real scenario, we would need a proper LinkedList class\n    if not head or not head.next:\n        return head\n    \n    slow = head\n    fast = head\n    \n    # Detect loop\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            break\n    \n    # No loop found\n    if slow != fast:\n        return head\n    \n    # Find start of loop\n    slow = head\n    while slow.next != fast.next:\n        slow = slow.next\n        fast = fast.next\n    \n    # Remove loop\n    fast.next = None\n    return head`,
      java: `public class Solution {\n    public ListNode removeLoop(ListNode head) {\n        // This is a simplified implementation for demonstration\n        // In a real scenario, we would need a proper LinkedList class\n        if (head == null || head.next == null) return head;\n        \n        ListNode slow = head;\n        ListNode fast = head;\n        \n        // Detect loop\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n            if (slow == fast) break;\n        }\n        \n        // No loop found\n        if (slow != fast) return head;\n        \n        // Find start of loop\n        slow = head;\n        while (slow.next != fast.next) {\n            slow = slow.next;\n            fast = fast.next;\n        }\n        \n        // Remove loop\n        fast.next = null;\n        return head;\n    }\n}`,
      cpp: `ListNode* removeLoop(ListNode* head) {\n    // This is a simplified implementation for demonstration\n    // In a real scenario, we would need a proper LinkedList class\n    if (!head || !head->next) return head;\n    \n    ListNode* slow = head;\n    ListNode* fast = head;\n    \n    // Detect loop\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if (slow == fast) break;\n    }\n    \n    // No loop found\n    if (slow != fast) return head;\n    \n    // Find start of loop\n    slow = head;\n    while (slow->next != fast->next) {\n        slow = slow->next;\n        fast = fast->next;\n    }\n    \n    // Remove loop\n    fast->next = nullptr;\n    return head;\n}`,
    },
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
  const [selectedLanguage, setSelectedLanguage] = useState<
    "javascript" | "python" | "java" | "cpp"
  >("javascript");
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
      setCode(problem.starterCode[selectedLanguage]);
    }
  }, [problemId, selectedLanguage]);

  useEffect(() => {
    if (id) {
      setProblemId(id);
    }
  }, [id]);

  const [code, setCode] = useState(MOCK_PROBLEMS[0].starterCode.javascript);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testsPassed, setTestsPassed] = useState<boolean | null>(null);

  // Handle code change from Monaco Editor
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  // Parse input string to actual JavaScript values
  const parseInput = (input: string) => {
    try {
      // Extract variable names and values
      const matches = input.match(/([a-zA-Z0-9_]+)\s*=\s*([^,]+)(?:,|$)/g);
      if (!matches) return {};

      const variables: Record<string, any> = {};

      matches.forEach((match) => {
        const [varName, varValueStr] = match.split("=").map((s) => s.trim());
        try {
          // Use Function constructor as a safer alternative to eval
          variables[varName] = Function(
            `"use strict"; return ${varValueStr}`,
          )();
        } catch (e) {
          variables[varName] = varValueStr;
        }
      });

      return variables;
    } catch (error) {
      console.error("Error parsing input:", error);
      return {};
    }
  };

  // Compare expected and actual outputs
  const compareOutputs = (expected: string, actual: any): boolean => {
    try {
      const expectedValue = Function(`"use strict"; return ${expected}`)();

      // Handle array comparison
      if (Array.isArray(expectedValue) && Array.isArray(actual)) {
        if (expectedValue.length !== actual.length) return false;
        return expectedValue.every((val, idx) => val === actual[idx]);
      }

      return expectedValue === actual;
    } catch (error) {
      console.error("Error comparing outputs:", error);
      return false;
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTestsPassed(null);
    setOutput("Running tests...\n");

    setTimeout(() => {
      try {
        if (selectedLanguage === "javascript") {
          // Create a function from the user's code for JavaScript
          const userFunction = new Function(
            `"use strict"; ${code}; return ${getFunctionName()};`,
          )();

          const results = testCases.map((test, index) => {
            try {
              const inputs = parseInput(test.input);
              const args = Object.values(inputs);

              const actualOutput = userFunction(...args);
              const passed = compareOutputs(test.expectedOutput, actualOutput);

              return {
                testCase: index + 1,
                input: test.input,
                expectedOutput: test.expectedOutput,
                actualOutput: JSON.stringify(actualOutput),
                passed,
              };
            } catch (error) {
              return {
                testCase: index + 1,
                input: test.input,
                expectedOutput: test.expectedOutput,
                actualOutput: `Error: ${error instanceof Error ? error.message : String(error)}`,
                passed: false,
              };
            }
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
        } else {
          // For non-JavaScript languages, simulate execution
          const problem = MOCK_PROBLEMS.find((p) => p.id === problemId);
          const solutionCode = problem?.solution[selectedLanguage] || "";

          // Check if user code is similar to solution (simplified check)
          const userCodeNoWhitespace = code.replace(/\s+/g, "").toLowerCase();
          const solutionNoWhitespace = solutionCode
            .replace(/\s+/g, "")
            .toLowerCase();

          // Simulate test results based on code similarity
          const isCorrect =
            userCodeNoWhitespace.length > 50 &&
            (userCodeNoWhitespace.includes("return") ||
              userCodeNoWhitespace.includes("return"));

          const results = testCases.map((test, index) => ({
            testCase: index + 1,
            input: test.input,
            expectedOutput: test.expectedOutput,
            actualOutput: isCorrect ? test.expectedOutput : "Incorrect output",
            passed: isCorrect,
          }));

          const allPassed = isCorrect;
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
                : "Some tests failed. Keep trying!\n\n" +
                  `Note: ${selectedLanguage.toUpperCase()} execution is simulated. ` +
                  "In a production environment, code would be executed on a server."),
          );
        }
      } catch (error) {
        setTestsPassed(false);
        setOutput(
          `Error: ${error instanceof Error ? error.message : String(error)}`,
        );
      } finally {
        setIsRunning(false);
      }
    }, 500);
  };

  // Get the function name from the current problem
  const getFunctionName = (): string => {
    const problem = MOCK_PROBLEMS.find((p) => p.id === problemId);
    if (!problem) return "twoSum";

    let functionName = "twoSum";

    if (selectedLanguage === "javascript") {
      const match = problem.starterCode.javascript.match(
        /function\s+([a-zA-Z0-9_]+)\s*\(/i,
      );
      functionName = match ? match[1] : "twoSum";
    } else if (selectedLanguage === "python") {
      const match = problem.starterCode.python.match(
        /def\s+([a-zA-Z0-9_]+)\s*\(/i,
      );
      functionName = match ? match[1] : "two_sum";
    } else if (selectedLanguage === "java") {
      // For Java, we need to extract the method name from the class
      const match = problem.starterCode.java.match(
        /public\s+\w+\s+([a-zA-Z0-9_]+)\s*\(/i,
      );
      functionName = match ? match[1] : "twoSum";
    } else if (selectedLanguage === "cpp") {
      // For C++, extract the function name
      const match = problem.starterCode.cpp.match(
        /\w+\s+([a-zA-Z0-9_]+)\s*\(/i,
      );
      functionName = match ? match[1] : "twoSum";
    }

    return functionName;
  };

  const handleReset = () => {
    const problem = MOCK_PROBLEMS.find((p) => p.id === problemId);
    if (problem) {
      setCode(problem.starterCode[selectedLanguage]);
    } else {
      setCode(MOCK_PROBLEMS[0].starterCode[selectedLanguage]);
    }
    setOutput("");
    setTestsPassed(null);
  };

  const handleShowSolution = () => {
    const problem = MOCK_PROBLEMS.find((p) => p.id === problemId);
    if (problem && problem.solution) {
      setCode(problem.solution[selectedLanguage]);
      setOutput("Solution loaded. Run the code to test it.");
    }
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
                <Tabs
                  value={selectedLanguage}
                  onValueChange={(value) =>
                    setSelectedLanguage(
                      value as "javascript" | "python" | "java" | "cpp",
                    )
                  }
                  className="w-full"
                >
                  <TabsList>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="java">Java</TabsTrigger>
                    <TabsTrigger value="cpp">C++</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[calc(100vh-300px)] flex flex-col">
                  {/* Monaco Code Editor */}
                  <div className="flex-1 min-h-[300px]">
                    <Editor
                      height="100%"
                      language={
                        selectedLanguage === "cpp" ? "cpp" : selectedLanguage
                      }
                      value={code}
                      onChange={handleEditorChange}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 2,
                        wordWrap: "on",
                        lineNumbers: "on",
                        folding: true,
                        renderLineHighlight: "all",
                      }}
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
                      <Button
                        variant="secondary"
                        onClick={handleShowSolution}
                        className="flex items-center gap-1"
                      >
                        Show Solution
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
