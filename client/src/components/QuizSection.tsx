import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function QuizSection() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const { toast } = useToast();

  // Query to get quiz questions for the first module
  const { data: quizQuestions, isLoading } = useQuery({
    queryKey: ['/api/modules/1/quiz'],
    staleTime: 60000,
  });

  // Mutation to submit quiz results
  const submitQuizMutation = useMutation({
    mutationFn: async (data: any) => {
      return await fetch('/api/quiz/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      }).then(res => {
        if (!res.ok) throw new Error('Failed to submit quiz');
        return res.json();
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users/1/quiz/results'] });
      toast({
        title: "Quiz Submitted",
        description: "Your quiz has been successfully submitted.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Handle answer selection
  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // Handle quiz submission
  const handleSubmitQuiz = () => {
    if (!quizQuestions || quizQuestions.length === 0) return;
    
    // Calculate score
    let score = 0;
    quizQuestions.forEach((question: any) => {
      if (selectedAnswers[question.id] === question.correctOption) {
        score++;
      }
    });
    
    // Submit quiz results
    submitQuizMutation.mutate({
      userId: 1, // Mock user ID
      moduleId: 1, // First module
      score,
      completedAt: new Date().toISOString()
    });
  };

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-6">Test Your Knowledge</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h3 className="font-bold text-lg mb-4">Quick Quiz: 3D Printing Basics</h3>
          <p className="text-gray-700 mb-6">Test your knowledge of 3D printing fundamentals with this quick quiz.</p>
          
          <div className="space-y-6">
            {isLoading ? (
              // Loading skeleton
              Array(2).fill(0).map((_, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-lg animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="space-y-2">
                    {Array(4).fill(0).map((_, j) => (
                      <div key={j} className="p-3 bg-white rounded border border-gray-200">
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Actual quiz questions
              quizQuestions?.map((question: any, index: number) => {
                const options = typeof question.options === 'string' 
                  ? JSON.parse(question.options) 
                  : question.options;
                
                return (
                  <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-3">{index + 1}. {question.question}</h4>
                    <div className="space-y-2">
                      {options.map((option: string, optionIndex: number) => (
                        <label 
                          key={optionIndex}
                          className={`flex items-center p-3 bg-white rounded border ${
                            selectedAnswers[question.id] === optionIndex
                              ? 'bg-primary-light border-primary'
                              : 'border-gray-200 hover:bg-primary-light hover:border-primary'
                          } cursor-pointer transition-colors`}
                        >
                          <input 
                            type="radio" 
                            name={`question${question.id}`}
                            className="mr-3 text-primary focus:ring-primary"
                            checked={selectedAnswers[question.id] === optionIndex}
                            onChange={() => handleAnswerSelect(question.id, optionIndex)}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          
          <div className="mt-6 flex justify-between">
            <button 
              className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary-dark transition-colors"
              onClick={handleSubmitQuiz}
              disabled={submitQuizMutation.isPending}
            >
              <i className="ri-check-line"></i>
              {submitQuizMutation.isPending ? "Submitting..." : "Check Answers"}
            </button>
            <button className="text-primary bg-white border border-primary px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary-light transition-colors">
              <i className="ri-question-line"></i>
              More Quiz Questions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
