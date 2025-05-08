// Type definitions for material-related data
export interface Material {
  id: number;
  name: string;
  fullName: string;
  difficulty: number;
  strength: number;
  flexibility: number;
  temperature: string;
  bedTemperature: string;
  useCases: string;
  icon: string;
  color: string;
}

export type PropertyType = 'difficulty' | 'strength' | 'flexibility';

/**
 * Maps rating value to descriptive text
 */
export function getRatingText(propertyType: PropertyType, rating: number): string {
  // Different texts for different property types
  const difficultyTexts = ['Very Easy', 'Easy', 'Medium', 'Difficult', 'Very Difficult'];
  const strengthTexts = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
  const flexibilityTexts = ['Very Rigid', 'Rigid', 'Semi-Flexible', 'Flexible', 'Very Flexible'];

  // Select the appropriate text array
  let texts;
  switch (propertyType) {
    case 'difficulty':
      texts = difficultyTexts;
      break;
    case 'strength':
      texts = strengthTexts;
      break;
    case 'flexibility':
      texts = flexibilityTexts;
      break;
    default:
      texts = ['Low', 'Medium-Low', 'Medium', 'Medium-High', 'High'];
  }

  // Return the appropriate text based on rating (1-5)
  return texts[Math.min(Math.max(rating - 1, 0), 4)];
}

/**
 * Returns color class for rating display
 * For some properties (like difficulty), lower is better (green)
 * For others (like strength), higher is better (green)
 */
export function getRatingColorClass(propertyType: PropertyType, rating: number, inverse: boolean = false): string {
  // Determine if we should invert the colors
  let shouldInvert = inverse;
  
  // For difficulty, lower is better by default
  if (propertyType === 'difficulty') {
    shouldInvert = !inverse;
  }

  // Choose color based on rating and inversion setting
  const colorClasses = shouldInvert
    ? ['text-green-500', 'text-green-500', 'text-yellow-500', 'text-orange-500', 'text-red-500']
    : ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-green-500', 'text-green-600'];

  return colorClasses[Math.min(Math.max(rating - 1, 0), 4)];
}

/**
 * Renders rating circles for material properties
 */
export function renderRatingCircles(rating: number, maxRating: number = 5, colorClass: string = 'text-yellow-500'): string {
  const filled = Array(rating).fill('<i class="ri-circle-fill"></i>').join('');
  const empty = Array(maxRating - rating).fill('<i class="ri-circle-line"></i>').join('');
  return `<div class="${colorClass}">${filled}${empty}</div>`;
}

/**
 * Compare materials based on a specific property
 */
export function compareMaterials(materials: Material[], property: keyof Material): Material[] {
  return [...materials].sort((a, b) => {
    if (typeof a[property] === 'number' && typeof b[property] === 'number') {
      return (b[property] as number) - (a[property] as number);
    }
    return String(a[property]).localeCompare(String(b[property]));
  });
}

/**
 * Filter materials based on use case search
 */
export function filterMaterialsByUseCase(materials: Material[], useCase: string): Material[] {
  if (!useCase.trim()) return materials;
  
  const searchTerm = useCase.toLowerCase().trim();
  return materials.filter(material => 
    material.useCases.toLowerCase().includes(searchTerm)
  );
}

/**
 * Get recommended materials for specific use cases
 */
export function getRecommendedMaterials(materials: Material[], useCase: string): Material[] {
  // Define mapping of use cases to optimal material properties
  const useCaseRequirements: Record<string, Partial<Record<PropertyType, number>>> = {
    'structural': { strength: 4, flexibility: 2 },
    'flexible': { flexibility: 4 },
    'beginner': { difficulty: 2 },
    'prototype': { difficulty: 2 },
    'decorative': { difficulty: 2 },
    'outdoor': { strength: 4 },
    'mechanical': { strength: 4, flexibility: 2 },
    'dental': { strength: 3, flexibility: 1 },
    'medical': { strength: 3 },
  };

  // Return filtered materials if we have requirements for this use case
  const requirements = useCaseRequirements[useCase.toLowerCase()];
  if (requirements) {
    return materials.filter(material => {
      // Check if material meets all requirements
      return Object.entries(requirements).every(([property, value]) => {
        const propertyName = property as PropertyType;
        return material[propertyName] >= (value as number);
      });
    });
  }
  
  // If no specific requirements, return all materials
  return materials;
}
