import {
  User, InsertUser, Module, InsertModule, 
  QuizQuestion, InsertQuizQuestion, QuizResult, InsertQuizResult,
  GlossaryTerm, InsertGlossaryTerm, PrinterPart, InsertPrinterPart,
  Material, InsertMaterial, Progress, InsertProgress
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProgress(userId: number, progressData: any): Promise<User>;

  // Module methods
  getModules(): Promise<Module[]>;
  getModule(id: number): Promise<Module | undefined>;
  getModulesByType(type: string): Promise<Module[]>;
  createModule(module: InsertModule): Promise<Module>;

  // Quiz methods
  getQuizQuestions(moduleId: number): Promise<QuizQuestion[]>;
  createQuizQuestion(question: InsertQuizQuestion): Promise<QuizQuestion>;
  saveQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  getQuizResults(userId: number, moduleId?: number): Promise<QuizResult[]>;

  // Glossary methods
  getGlossaryTerms(): Promise<GlossaryTerm[]>;
  getGlossaryTerm(id: number): Promise<GlossaryTerm | undefined>;
  createGlossaryTerm(term: InsertGlossaryTerm): Promise<GlossaryTerm>;

  // Printer parts methods
  getPrinterParts(): Promise<PrinterPart[]>;
  getPrinterPart(id: number): Promise<PrinterPart | undefined>;
  createPrinterPart(part: InsertPrinterPart): Promise<PrinterPart>;

  // Materials methods
  getMaterials(): Promise<Material[]>;
  getMaterial(id: number): Promise<Material | undefined>;
  createMaterial(material: InsertMaterial): Promise<Material>;

  // Progress tracking methods
  getProgress(userId: number): Promise<Progress[]>;
  updateProgress(progress: InsertProgress): Promise<Progress>;
  getOverallProgress(userId: number): Promise<number>; // Returns percentage completed
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private modules: Map<number, Module>;
  private quizQuestions: Map<number, QuizQuestion>;
  private quizResults: Map<number, QuizResult>;
  private glossaryTerms: Map<number, GlossaryTerm>;
  private printerParts: Map<number, PrinterPart>;
  private materials: Map<number, Material>;
  private progress: Map<number, Progress>;

  private userIdCounter: number;
  private moduleIdCounter: number;
  private questionIdCounter: number;
  private resultIdCounter: number;
  private termIdCounter: number;
  private partIdCounter: number;
  private materialIdCounter: number;
  private progressIdCounter: number;

  constructor() {
    this.users = new Map();
    this.modules = new Map();
    this.quizQuestions = new Map();
    this.quizResults = new Map();
    this.glossaryTerms = new Map();
    this.printerParts = new Map();
    this.materials = new Map();
    this.progress = new Map();

    this.userIdCounter = 1;
    this.moduleIdCounter = 1;
    this.questionIdCounter = 1;
    this.resultIdCounter = 1;
    this.termIdCounter = 1;
    this.partIdCounter = 1;
    this.materialIdCounter = 1;
    this.progressIdCounter = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Add sample modules
    this.createModule({
      title: "Introduction to 3D Printing",
      description: "Learn the fundamental concepts of 3D printing technology and its applications.",
      content: { sections: [{ title: "What is 3D Printing?", content: "3D printing is..." }] },
      type: "intro",
      level: "beginner",
      order: 1,
      estimatedMinutes: 30,
      imageUrl: "https://images.unsplash.com/photo-1563874257547-d19fbb71b46c?auto=format&fit=crop&w=800&h=400"
    });

    this.createModule({
      title: "Printer Anatomy Explorer",
      description: "Discover the key components of a 3D printer through our interactive model.",
      content: { sections: [{ title: "Main Components", content: "The main components include..." }] },
      type: "printer",
      level: "beginner",
      order: 2,
      estimatedMinutes: 30,
      imageUrl: "https://images.unsplash.com/photo-1563874257547-d19fbb71b46c?auto=format&fit=crop&w=800&h=400"
    });

    this.createModule({
      title: "Materials Comparison",
      description: "Compare different filament types and learn when to use each material.",
      content: { sections: [{ title: "Types of Filaments", content: "There are several types of filaments..." }] },
      type: "materials",
      level: "intermediate",
      order: 3,
      estimatedMinutes: 45,
      imageUrl: "https://pixabay.com/get/gc5ba1c3217a4634a0056a3b5602f6fce865997559f203a2d957e5c110f1454309820d8f21f873d97abbc63a6caced0a4c96349e8309385ae45b2a9c356760d56_1280.jpg"
    });

    this.createModule({
      title: "Slicing Basics",
      description: "Learn how to prepare 3D models for printing with slicing software.",
      content: { sections: [{ title: "What is Slicing?", content: "Slicing is..." }] },
      type: "process",
      level: "beginner",
      order: 4,
      estimatedMinutes: 40,
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&h=400"
    });

    // Add sample printer parts
    this.createPrinterPart({
      name: "Extruder",
      description: "The part of a 3D printer that pushes filament through the hot end and nozzle.",
      function: "Melts filament to deposit layer by layer",
      position: { x: 30, y: 40 }
    });

    this.createPrinterPart({
      name: "Build Plate",
      description: "The flat surface on which the 3D print is created.",
      function: "Provides the foundation for the printed object",
      position: { x: 50, y: 60 }
    });

    this.createPrinterPart({
      name: "Frame",
      description: "The structural component that holds all the printer parts together.",
      function: "Provides stability and support for the printer",
      position: { x: 70, y: 30 }
    });

    this.createPrinterPart({
      name: "Filament",
      description: "The raw material used for printing objects.",
      function: "Source material that gets melted and deposited",
      position: { x: 20, y: 50 }
    });

    // Add sample materials
    this.createMaterial({
      name: "PLA",
      fullName: "Polylactic Acid",
      difficulty: 2,
      strength: 3,
      flexibility: 1,
      temperature: "180-220°C",
      bedTemperature: "60°C",
      useCases: "Prototypes, toys, decorative items",
      icon: "ri-blaze-line",
      color: "blue"
    });

    this.createMaterial({
      name: "ABS",
      fullName: "Acrylonitrile Butadiene Styrene",
      difficulty: 3,
      strength: 4,
      flexibility: 2,
      temperature: "220-250°C",
      bedTemperature: "95-110°C",
      useCases: "Functional parts, automotive, electronics housings",
      icon: "ri-hammer-line",
      color: "purple"
    });

    this.createMaterial({
      name: "TPU",
      fullName: "Thermoplastic Polyurethane",
      difficulty: 4,
      strength: 3,
      flexibility: 5,
      temperature: "220-250°C",
      bedTemperature: "50-60°C",
      useCases: "Flexible parts, phone cases, shoe soles",
      icon: "ri-seedling-line",
      color: "green"
    });

    // Add sample glossary terms
    this.createGlossaryTerm({
      term: "Extruder",
      definition: "The part of a 3D printer that pushes filament through the hot end and nozzle. It typically consists of a motor, gear mechanism, and hot end assembly.",
      category: "printer_part"
    });

    this.createGlossaryTerm({
      term: "Slicing",
      definition: "The process of converting a 3D model into a series of thin layers and creating G-code instructions for the printer to follow.",
      category: "process"
    });

    this.createGlossaryTerm({
      term: "Build Plate",
      definition: "The flat surface on which the 3D print is created. Also called a print bed, it may be heated for better adhesion with certain materials.",
      category: "printer_part"
    });

    this.createGlossaryTerm({
      term: "G-code",
      definition: "The programming language used to control automated machine tools. In 3D printing, G-code tells the printer how to move and when to extrude material.",
      category: "technical"
    });

    // Add sample quiz questions
    this.createQuizQuestion({
      moduleId: 1,
      question: "Which of these is NOT a common 3D printing technology?",
      options: JSON.stringify([
        "Fused Deposition Modeling (FDM)",
        "Stereolithography (SLA)",
        "Quantum Deposition Processing (QDP)",
        "Selective Laser Sintering (SLS)"
      ]),
      correctOption: 2,
      explanation: "Quantum Deposition Processing is not a real 3D printing technology."
    });

    this.createQuizQuestion({
      moduleId: 1,
      question: "What does the term \"layer height\" refer to in 3D printing?",
      options: JSON.stringify([
        "The total height of the printed object",
        "The thickness of each deposited layer of material",
        "The maximum height capability of a 3D printer",
        "The distance between the nozzle and the print bed"
      ]),
      correctOption: 1,
      explanation: "Layer height refers to the thickness of each layer of material deposited during the printing process."
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async updateUserProgress(userId: number, progressData: any): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    user.progressData = progressData;
    this.users.set(userId, user);
    return user;
  }

  // Module methods
  async getModules(): Promise<Module[]> {
    return Array.from(this.modules.values()).sort((a, b) => a.order - b.order);
  }

  async getModule(id: number): Promise<Module | undefined> {
    return this.modules.get(id);
  }

  async getModulesByType(type: string): Promise<Module[]> {
    return Array.from(this.modules.values())
      .filter(module => module.type === type)
      .sort((a, b) => a.order - b.order);
  }

  async createModule(insertModule: InsertModule): Promise<Module> {
    const id = this.moduleIdCounter++;
    const module: Module = { ...insertModule, id };
    this.modules.set(id, module);
    return module;
  }

  // Quiz methods
  async getQuizQuestions(moduleId: number): Promise<QuizQuestion[]> {
    return Array.from(this.quizQuestions.values())
      .filter(question => question.moduleId === moduleId);
  }

  async createQuizQuestion(insertQuestion: InsertQuizQuestion): Promise<QuizQuestion> {
    const id = this.questionIdCounter++;
    const question: QuizQuestion = { ...insertQuestion, id };
    this.quizQuestions.set(id, question);
    return question;
  }

  async saveQuizResult(insertResult: InsertQuizResult): Promise<QuizResult> {
    const id = this.resultIdCounter++;
    const result: QuizResult = { ...insertResult, id };
    this.quizResults.set(id, result);
    return result;
  }

  async getQuizResults(userId: number, moduleId?: number): Promise<QuizResult[]> {
    let results = Array.from(this.quizResults.values())
      .filter(result => result.userId === userId);
    
    if (moduleId) {
      results = results.filter(result => result.moduleId === moduleId);
    }
    
    return results;
  }

  // Glossary methods
  async getGlossaryTerms(): Promise<GlossaryTerm[]> {
    return Array.from(this.glossaryTerms.values())
      .sort((a, b) => a.term.localeCompare(b.term));
  }

  async getGlossaryTerm(id: number): Promise<GlossaryTerm | undefined> {
    return this.glossaryTerms.get(id);
  }

  async createGlossaryTerm(insertTerm: InsertGlossaryTerm): Promise<GlossaryTerm> {
    const id = this.termIdCounter++;
    const term: GlossaryTerm = { ...insertTerm, id };
    this.glossaryTerms.set(id, term);
    return term;
  }

  // Printer parts methods
  async getPrinterParts(): Promise<PrinterPart[]> {
    return Array.from(this.printerParts.values());
  }

  async getPrinterPart(id: number): Promise<PrinterPart | undefined> {
    return this.printerParts.get(id);
  }

  async createPrinterPart(insertPart: InsertPrinterPart): Promise<PrinterPart> {
    const id = this.partIdCounter++;
    const part: PrinterPart = { ...insertPart, id };
    this.printerParts.set(id, part);
    return part;
  }

  // Materials methods
  async getMaterials(): Promise<Material[]> {
    return Array.from(this.materials.values());
  }

  async getMaterial(id: number): Promise<Material | undefined> {
    return this.materials.get(id);
  }

  async createMaterial(insertMaterial: InsertMaterial): Promise<Material> {
    const id = this.materialIdCounter++;
    const material: Material = { ...insertMaterial, id };
    this.materials.set(id, material);
    return material;
  }

  // Progress tracking methods
  async getProgress(userId: number): Promise<Progress[]> {
    return Array.from(this.progress.values())
      .filter(progress => progress.userId === userId);
  }

  async updateProgress(insertProgress: InsertProgress): Promise<Progress> {
    // Check if progress record already exists
    const existing = Array.from(this.progress.values()).find(
      p => p.userId === insertProgress.userId && p.moduleId === insertProgress.moduleId
    );
    
    if (existing) {
      // Update existing record
      existing.completed = insertProgress.completed;
      existing.lastAccessed = insertProgress.lastAccessed;
      existing.timeSpent += insertProgress.timeSpent;
      this.progress.set(existing.id, existing);
      return existing;
    } else {
      // Create new record
      const id = this.progressIdCounter++;
      const progress: Progress = { ...insertProgress, id };
      this.progress.set(id, progress);
      return progress;
    }
  }

  async getOverallProgress(userId: number): Promise<number> {
    const userProgress = await this.getProgress(userId);
    const totalModules = this.modules.size;
    
    if (totalModules === 0) return 0;
    
    const completedModules = userProgress.filter(p => p.completed).length;
    return Math.round((completedModules / totalModules) * 100);
  }
}

export const storage = new MemStorage();
