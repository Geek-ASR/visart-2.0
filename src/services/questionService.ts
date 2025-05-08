import { z } from "zod";

// Define the question schema for type safety
export const questionSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
  difficulty: z.enum(["easy", "medium", "hard"]),
  category: z.string().min(1),
  sampleInput: z.string().min(1),
  sampleOutput: z.string().min(1),
  constraints: z.string().optional(),
  hints: z.string().optional(),
});

export type Question = z.infer<typeof questionSchema>;

// Mock database for storing questions (in a real app, this would be a database)
const questions: Question[] = [];

/**
 * Submit a new question to the database
 * @param question The question to submit
 * @returns A promise that resolves to the submitted question
 */
export const submitQuestion = async (question: Question): Promise<Question> => {
  // Validate the question against the schema
  const validatedQuestion = questionSchema.parse(question);

  // In a real app, this would be an API call to a backend service
  // For now, we'll just add it to our mock database
  questions.push(validatedQuestion);

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return validatedQuestion;
};

/**
 * Get all questions from the database
 * @returns A promise that resolves to an array of questions
 */
export const getQuestions = async (): Promise<Question[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return questions;
};

/**
 * Get a question by its index
 * @param index The index of the question to get
 * @returns A promise that resolves to the question or undefined if not found
 */
export const getQuestionByIndex = async (
  index: number,
): Promise<Question | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return questions[index];
};
