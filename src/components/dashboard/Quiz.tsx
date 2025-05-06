import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle } from "lucide-react";

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizProps {
  title: string;
  description?: string;
  questions: QuizQuestion[];
  onComplete?: (score: number, totalQuestions: number) => void;
}

const Quiz = ({
  title = "Knowledge Check",
  description = "Test your understanding with this quiz.",
  questions = [
    {
      id: 1,
      question:
        "What is the time complexity of accessing an element in an array?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 0,
      explanation:
        "Array access is constant time because the memory address can be calculated directly.",
    },
    {
      id: 2,
      question:
        "Which data structure uses LIFO (Last In, First Out) principle?",
      options: ["Queue", "Stack", "Linked List", "Tree"],
      correctAnswer: 1,
      explanation:
        "A stack follows the Last In, First Out principle where the last element added is the first one to be removed.",
    },
    {
      id: 3,
      question: "What is the worst-case time complexity of quicksort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
      correctAnswer: 2,
      explanation:
        "Quicksort's worst-case time complexity is O(n²) when the pivot selection consistently results in highly unbalanced partitions.",
    },
  ],
  onComplete = () => {},
}: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(newAnswers);

    setShowResult(true);
  };

  const handleContinue = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      const score = answers.reduce((total, answer, index) => {
        return total + (answer === questions[index].correctAnswer ? 1 : 0);
      }, 0);
      onComplete(score, questions.length);
    }
  };

  const calculateScore = () => {
    return answers.reduce((total, answer, index) => {
      return total + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setAnswers([]);
    setQuizCompleted(false);

    // Scroll to top of quiz container for better UX
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (quizCompleted) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    const performanceLevel =
      percentage >= 90
        ? "Excellent"
        : percentage >= 75
          ? "Good"
          : percentage >= 60
            ? "Satisfactory"
            : "Needs Improvement";

    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-6">
            <div className="text-4xl font-bold mb-2">
              {score} / {questions.length}
            </div>
            <div className="text-lg text-gray-600 mb-2">Your Score</div>
            <div
              className="text-md font-medium mb-4"
              style={{
                color:
                  percentage >= 90
                    ? "#10b981"
                    : percentage >= 75
                      ? "#3b82f6"
                      : percentage >= 60
                        ? "#f59e0b"
                        : "#ef4444",
              }}
            >
              {performanceLevel}
            </div>
            <Progress
              value={percentage}
              className={`h-2 w-full max-w-md mx-auto ${percentage >= 75 ? "bg-green-100" : percentage >= 60 ? "bg-amber-100" : "bg-red-100"}`}
            />
            <div className="mt-2 text-sm text-gray-500">
              {percentage.toFixed(0)}%
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <h3 className="font-medium">Question Review:</h3>
            {questions.map((question, index) => {
              const isCorrect = answers[index] === question.correctAnswer;
              return (
                <div key={question.id} className="border rounded-md p-4">
                  <div className="flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle
                        className="text-green-500 mt-1 flex-shrink-0"
                        size={18}
                      />
                    ) : (
                      <XCircle
                        className="text-red-500 mt-1 flex-shrink-0"
                        size={18}
                      />
                    )}
                    <div>
                      <p className="font-medium">{question.question}</p>
                      <p className="text-sm mt-1">
                        <span className="font-medium">Your answer:</span>{" "}
                        {question.options[answers[index]]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm mt-1">
                          <span className="font-medium">Correct answer:</span>{" "}
                          {question.options[question.correctAnswer]}
                        </p>
                      )}
                      {question.explanation && (
                        <p className="text-sm text-gray-600 mt-2">
                          {question.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={restartQuiz} className="w-full">
            Restart Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <div className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
        {description && <p className="text-gray-600 mt-2">{description}</p>}
        <Progress
          value={(currentQuestionIndex / questions.length) * 100}
          className="h-1 mt-4"
        />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">
            {currentQuestion.question}
          </h3>

          <RadioGroup
            value={selectedOption?.toString()}
            onValueChange={(value) => handleOptionSelect(parseInt(value))}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 border rounded-md p-3 ${
                  showResult
                    ? index === currentQuestion.correctAnswer
                      ? "border-green-500 bg-green-50"
                      : index === selectedOption
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  disabled={showResult}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-grow cursor-pointer py-1"
                >
                  {option}
                </Label>
                {showResult && index === currentQuestion.correctAnswer && (
                  <CheckCircle className="text-green-500" size={18} />
                )}
                {showResult &&
                  index === selectedOption &&
                  index !== currentQuestion.correctAnswer && (
                    <XCircle className="text-red-500" size={18} />
                  )}
              </div>
            ))}
          </RadioGroup>
        </div>

        {showResult && currentQuestion.explanation && (
          <div className="bg-blue-50 border border-blue-100 rounded-md p-4 text-sm text-blue-800">
            <p className="font-medium mb-1">Explanation:</p>
            <p>{currentQuestion.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!showResult ? (
          <Button
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
            className="w-full"
          >
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleContinue} className="w-full">
            {currentQuestionIndex < questions.length - 1
              ? "Next Question"
              : "See Results"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Quiz;
