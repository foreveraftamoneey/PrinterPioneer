// Type definitions for glossary-related data
export interface GlossaryTerm {
  id: number;
  term: string;
  definition: string;
  category: string;
}

// All possible glossary categories
export type GlossaryCategory = 'printer_part' | 'process' | 'material' | 'software' | 'technical' | 'general';

/**
 * Format category name for display
 */
export function formatCategoryName(category: string): string {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get icon for a category
 */
export function getCategoryIcon(category: string): string {
  const categoryIcons: Record<string, string> = {
    printer_part: 'ri-tools-line',
    process: 'ri-settings-5-line',
    material: 'ri-paint-line',
    software: 'ri-code-s-slash-line',
    technical: 'ri-file-code-line',
    general: 'ri-information-line',
  };

  return categoryIcons[category] || 'ri-question-line';
}

/**
 * Get color for a category
 */
export function getCategoryColor(category: string): { bg: string; text: string; border: string } {
  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    printer_part: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
    process: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
    material: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
    software: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-200' },
    technical: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' },
    general: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' },
  };

  return categoryColors[category] || { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' };
}

/**
 * Group terms by category
 */
export function groupTermsByCategory(terms: GlossaryTerm[]): Record<string, GlossaryTerm[]> {
  return terms.reduce((acc: Record<string, GlossaryTerm[]>, term) => {
    if (!acc[term.category]) {
      acc[term.category] = [];
    }
    acc[term.category].push(term);
    return acc;
  }, {});
}

/**
 * Filter terms by search query
 */
export function filterTermsBySearch(terms: GlossaryTerm[], query: string): GlossaryTerm[] {
  if (!query.trim()) return terms;
  
  const searchTerm = query.toLowerCase().trim();
  return terms.filter(term => 
    term.term.toLowerCase().includes(searchTerm) || 
    term.definition.toLowerCase().includes(searchTerm)
  );
}

/**
 * Filter terms by category
 */
export function filterTermsByCategory(terms: GlossaryTerm[], category: string): GlossaryTerm[] {
  if (category === 'all') return terms;
  return terms.filter(term => term.category === category);
}

/**
 * Sort terms alphabetically
 */
export function sortTermsAlphabetically(terms: GlossaryTerm[]): GlossaryTerm[] {
  return [...terms].sort((a, b) => a.term.localeCompare(b.term));
}

/**
 * Generate alphabetical index of terms
 */
export function generateAlphabeticalIndex(terms: GlossaryTerm[]): Record<string, GlossaryTerm[]> {
  return terms.reduce((acc: Record<string, GlossaryTerm[]>, term) => {
    const firstLetter = term.term.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(term);
    return acc;
  }, {});
}

/**
 * Identify technical terms in a text string and wrap them with span
 */
export function highlightTerms(text: string, terms: GlossaryTerm[]): string {
  let result = text;
  
  // Sort terms by length (longest first) to prevent partial matches
  const sortedTerms = [...terms].sort((a, b) => b.term.length - a.term.length);
  
  sortedTerms.forEach(term => {
    // Create a regex that matches the whole word only
    const regex = new RegExp(`\\b${term.term}\\b`, 'gi');
    result = result.replace(regex, `<span class="glossary-term" title="${term.definition}">${term.term}</span>`);
  });
  
  return result;
}
