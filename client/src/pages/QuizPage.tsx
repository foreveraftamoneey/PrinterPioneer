import { useParams, Link } from "wouter";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function QuizPage() {
  const { id } = useParams();
  const moduleId = parseInt(id);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  // Query to get module details
  const { data: module } = useQuery({
    queryKey: [`/api/modules/${moduleId}`],
    staleTime: 60000,
  });

  // Query to get quiz questions
  const { data: quizQuestions, isLoading } = useQuery({
    queryKey: [`/api/modules/${moduleId}/quiz`],
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
      setSubmitted(true);
      toast({
        title: "Quiz Completed",
        description: "Your answers have been submitted successfully.",
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
      moduleId,
      score,
      completedAt: new Date().toISOString()
    });
  };

  // Calculate result if submitted
  const calculateResult = () => {
    if (!quizQuestions || quizQuestions.length === 0) return { score: 0, total: 0, percentage: 0 };
    
    let score = 0;
    quizQuestions.forEach((question: any) => {
      if (selectedAnswers[question.id] === question.correctOption) {
        score++;
      }
    });
    
    return {
      score,
      total: quizQuestions.length,
      percentage: Math.round((score / quizQuestions.length) * 100)
    };
  };

  const result = calculateResult();

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/">
          <a className="hover:text-primary">Home</a>
        </Link>
        <i className="ri-arrow-right-s-line"></i>
        <Link href={`/module/${moduleId}`}>
          <a className="hover:text-primary">{module?.title || `Module ${moduleId}`}</a>
        </Link>
        <i className="ri-arrow-right-s-line"></i>
        <span>Quiz</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">Quiz: {module?.title || `Module ${moduleId}`}</h1>
          <p className="text-gray-600 mb-6">Test your knowledge of the concepts covered in this module.</p>

          {submitted ? (
            // Quiz results
            <div className="space-y-6">
              <div className="p-6 bg-primary-light rounded-xl text-center">
                <h2 className="text-xl font-bold text-primary-dark mb-2">Your Score</h2>
                <div className="text-4xl font-bold text-primary mb-2">{result.score}/{result.total}</div>
                <div className="text-lg">{result.percentage}%</div>
                <div className="mt-4 progress-bar">
                  <div className="progress" style={{ width: `${result.percentage}%` }}></div>
                </div>
                <p className="mt-4 text-gray-600">
                  {result.percentage >= 80 
                    ? "Excellent! You have a great understanding of the material." 
                    : result.percentage >= 60 
                    ? "Good job! You've grasped most of the concepts." 
                    : "You might want to review the module again to improve your understanding."}
                </p>
              </div>

              <div className="flex justify-between mt-6">
                <Link href={`/module/${moduleId}`}>
                  <a className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-200 transition-colors">
                    <i className="ri-arrow-left-line"></i>
                    Back to Module
                  </a>
                </Link>
                <Link href={`/module/${moduleId + 1}`}>
                  <a className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary-dark transition-colors">
                    Next Module
                    <i className="ri-arrow-right-line"></i>
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            // Quiz questions
            <div className="space-y-6">
              {isLoading ? (
                // Loading skeleton
                Array(3).fill(0).map((_, i) => (
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
                quizQuestions?.map((question: any, index: number) => {
                  const options = typeof question.options === 'string' 
                    ? JSON.parse(question.options) 
                    : question.options;
                  
                  return (
                    <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-3">{index + 1}. {question.question}</h3>
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

              <div className="flex justify-between mt-6">
                <Link href={`/module/${moduleId}`}>
                  <a className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-200 transition-colors">
                    <i className="ri-arrow-left-line"></i>
                    Back to Module
                  </a>
                </Link>
                <button 
                  className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary-dark transition-colors"
                  onClick={handleSubmitQuiz}
                  disabled={submitQuizMutation.isPending || Object.keys(selectedAnswers).length < (quizQuestions?.length || 0)}
                >
                  <i className="ri-check-line"></i>
                  {submitQuizMutation.isPending ? "Submitting..." : "Submit Answers"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
