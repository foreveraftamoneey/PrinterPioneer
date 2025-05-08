// Type definitions for quiz-related data
export interface QuizOption {
  id: number;
  text: string;
}

export interface QuizQuestion {
  id: number;
  moduleId: number;
  question: string;
  options: string | QuizOption[]; // Could be stored as JSON string
  correctOption: number;
  explanation: string;
}

export interface QuizResult {
  id: number;
  userId: number;
  moduleId: number;
  score: number;
  completedAt: string;
}

/**
 * Parses options from string if needed
 */
export function getQuizOptions(options: string | QuizOption[]): string[] {
  if (typeof options === 'string') {
    try {
      return JSON.parse(options);
    } catch (e) {
      console.error('Failed to parse quiz options', e);
      return [];
    }
  }
  return options.map(opt => typeof opt === 'string' ? opt : opt.text);
}

/**
 * Calculates the score percentage for a quiz result
 */
export function calculateScorePercentage(score: number, totalQuestions: number): number {
  if (totalQuestions === 0) return 0;
  return Math.round((score / totalQuestions) * 100);
}

/**
 * Returns feedback message based on quiz score percentage
 */
export function getScoreFeedback(scorePercentage: number): string {
  if (scorePercentage >= 90) {
    return "Excellent! You have a thorough understanding of the material.";
  } else if (scorePercentage >= 80) {
    return "Great job! You've mastered most of the concepts.";
  } else if (scorePercentage >= 70) {
    return "Good work! You have a solid understanding of the material.";
  } else if (scorePercentage >= 60) {
    return "Not bad! You've grasped many of the concepts, but there's room for improvement.";
  } else {
    return "You might want to review the module again to improve your understanding.";
  }
}

/**
 * Determines the appropriate CSS color class based on quiz score
 */
export function getScoreColorClass(scorePercentage: number): string {
  if (scorePercentage >= 80) {
    return 'text-green-600';
  } else if (scorePercentage >= 60) {
    return 'text-yellow-600';
  } else {
    return 'text-red-600';
  }
}

/**
 * Returns a map of question IDs to the user's selected answers
 */
export function createInitialAnswersMap(questions: QuizQuestion[]): Record<number, number | null> {
  return questions.reduce((map: Record<number, number | null>, question) => {
    map[question.id] = null;
    return map;
  }, {});
}

/**
 * Checks if all questions have been answered
 */
export function areAllQuestionsAnswered(selectedAnswers: Record<number, number | null>, questions: QuizQuestion[]): boolean {
  return questions.every(question => selectedAnswers[question.id] !== null);
}
