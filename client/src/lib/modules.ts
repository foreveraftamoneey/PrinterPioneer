// Type definitions for module-related data
export interface ModuleSection {
  title: string;
  content: string;
}

export interface ModuleContent {
  sections: ModuleSection[];
}

export interface Module {
  id: number;
  title: string;
  description: string;
  content: ModuleContent;
  type: string;
  level: string;
  order: number;
  estimatedMinutes: number;
  imageUrl?: string;
}

// Helper functions for working with modules

/**
 * Calculates the estimated time to complete a module in a human-readable format
 */
export function formatModuleTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    } else {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${remainingMinutes} min`;
    }
  }
}

/**
 * Returns the appropriate badge color class for a module's level
 */
export function getLevelBadgeClasses(level: string): { bg: string; text: string } {
  switch (level.toLowerCase()) {
    case 'beginner':
      return { bg: 'bg-secondary-light', text: 'text-secondary' };
    case 'intermediate':
      return { bg: 'bg-blue-100', text: 'text-blue-600' };
    case 'advanced':
      return { bg: 'bg-purple-100', text: 'text-purple-600' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-600' };
  }
}

/**
 * Returns the appropriate icon for a module based on its type
 */
export function getModuleTypeIcon(type: string): string {
  const typeIcons: Record<string, string> = {
    intro: 'ri-home-line',
    printer: 'ri-printer-cloud-line',
    materials: 'ri-paint-line',
    process: 'ri-file-code-line',
    design: 'ri-pencil-ruler-2-line',
  };

  return typeIcons[type] || 'ri-file-list-line';
}

/**
 * Returns a readable label for a module type
 */
export function getModuleTypeLabel(type: string): string {
  const typeLabels: Record<string, string> = {
    intro: 'Introduction',
    printer: 'Printer Basics',
    materials: 'Materials',
    process: 'Printing Process',
    design: 'Design',
  };

  return typeLabels[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

/**
 * Groups modules by their type property
 */
export function groupModulesByType(modules: Module[]): Record<string, Module[]> {
  return modules.reduce((acc: Record<string, Module[]>, module: Module) => {
    if (!acc[module.type]) {
      acc[module.type] = [];
    }
    acc[module.type].push(module);
    return acc;
  }, {});
}

/**
 * Determines if a module is accessible based on user progress
 * (currently just returns true, but could be extended with real progress tracking)
 */
export function isModuleAccessible(module: Module, completedModuleIds: number[]): boolean {
  // Simple implementation - could be expanded based on prerequisites
  return true;
}
