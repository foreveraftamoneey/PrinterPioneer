import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Query to get glossary terms
  const { data: terms, isLoading, error } = useQuery({
    queryKey: ['/api/glossary'],
    staleTime: 60000,
  });

  // Get unique categories from terms
  const categories = terms
    ? Array.from(new Set(terms.map((term: any) => term.category)))
    : [];

  // Filter terms based on search query and active category
  const filteredTerms = terms
    ? terms.filter((term: any) => {
        const matchesSearch = 
          term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = 
          activeCategory === "all" || term.category === activeCategory;
        
        return matchesSearch && matchesCategory;
      })
    : [];

  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/">
          <a className="hover:text-primary">Home</a>
        </Link>
        <i className="ri-arrow-right-s-line"></i>
        <span>Glossary</span>
      </div>

      <div className="bg-primary-light rounded-xl p-6 md:p-8 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-dark mb-3">3D Printing Glossary</h1>
        <p className="text-gray-700 max-w-3xl mb-6">
          Master the language of 3D printing with our comprehensive glossary. Understanding the terminology is essential for success in 3D printing, whether you're a beginner or an experienced maker.
        </p>
        
        <div className="relative max-w-md">
          <Input
            type="search"
            placeholder="Search terms..."
            className="pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <i className="ri-search-line text-gray-400"></i>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-6">
          <Tabs defaultValue="all" onValueChange={setActiveCategory} className="w-full">
            <div className="mb-6 overflow-x-auto">
              <TabsList className="inline-flex h-auto p-1 w-auto">
                <TabsTrigger value="all" className="px-4 py-2 rounded-md">
                  All Terms
                </TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="px-4 py-2 rounded-md"
                  >
                    {formatCategoryName(category)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value={activeCategory} className="mt-0">
              {isLoading ? (
                // Loading skeleton
                <div className="grid gap-6 md:grid-cols-2">
                  {Array(8).fill(0).map((_, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg animate-pulse">
                      <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : filteredTerms.length > 0 ? (
                // Display terms
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredTerms.map((term: any) => (
                    <div key={term.id} className="p-4 bg-gray-50 rounded-lg hover:bg-primary-light transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-primary-dark">{term.term}</h3>
                        <span className="text-xs font-medium text-gray-500 px-2 py-1 bg-white rounded-full">
                          {formatCategoryName(term.category)}
                        </span>
                      </div>
                      <p className="text-gray-700">{term.definition}</p>
                    </div>
                  ))}
                </div>
              ) : (
                // No results
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <i className="ri-search-line text-3xl text-gray-400"></i>
                  </div>
                  <h3 className="text-lg font-medium mb-2">No matching terms found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter to find what you're looking for
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">Suggest a Term</h2>
          <p className="text-gray-700 mb-6">
            Don't see a term you're looking for? Help us improve our glossary by suggesting new terms to add.
          </p>
          <button className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary-dark transition-colors">
            <i className="ri-add-line"></i>
            Suggest a Term
          </button>
        </div>
      </div>
    </div>
  );
}
