import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { submitQuestion, questionSchema } from "@/services/questionService";

// Use the same schema from the question service
const formSchema = questionSchema.extend({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  sampleInput: z.string().min(1, {
    message: "Sample input is required.",
  }),
  sampleOutput: z.string().min(1, {
    message: "Sample output is required.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const AddQuestionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "medium",
      category: "",
      sampleInput: "",
      sampleOutput: "",
      constraints: "",
      hints: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      console.log("Form submitted:", data);
      // Submit the question to the API service
      await submitQuestion(data);

      setSubmitSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting question:", error);
      setSubmitError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Add New Question</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Question Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Two Sum" {...field} />
                      </FormControl>
                      <FormDescription>
                        A concise title for the question.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="arrays">Arrays</SelectItem>
                          <SelectItem value="strings">Strings</SelectItem>
                          <SelectItem value="linked-lists">
                            Linked Lists
                          </SelectItem>
                          <SelectItem value="trees">Trees</SelectItem>
                          <SelectItem value="graphs">Graphs</SelectItem>
                          <SelectItem value="dynamic-programming">
                            Dynamic Programming
                          </SelectItem>
                          <SelectItem value="sorting">Sorting</SelectItem>
                          <SelectItem value="searching">Searching</SelectItem>
                          <SelectItem value="recursion">Recursion</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The category this question belongs to.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The difficulty level of this question.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Problem Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the problem in detail..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A detailed description of the problem, including what the
                      function should do.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="sampleInput"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sample Input</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="[2, 7, 11, 15], target = 9"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Example input for the problem.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sampleOutput"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sample Output</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="[0, 1]"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Expected output for the sample input.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="constraints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Constraints (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Any constraints on the input or solution.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hints (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Consider using a hash map to store values you've seen..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional hints to help users solve the problem.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {submitError && (
                <div className="bg-destructive/15 text-destructive p-3 rounded-md mb-4">
                  Error: {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4">
                  Question submitted successfully!
                </div>
              )}

              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Question"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddQuestionForm;
