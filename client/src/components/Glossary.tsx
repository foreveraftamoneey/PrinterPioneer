import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";

export default function Glossary() {
  const { data: terms, isLoading } = useQuery({
    queryKey: ['/api/glossary'],
    staleTime: 60000,
  });

  // Only display a subset of terms on the homepage
  const displayedTerms = terms?.slice(0, 4) || [];

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-6">3D Printing Glossary</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <p className="text-gray-700 mb-6">Confused by 3D printing terminology? Hover over or tap on highlighted terms throughout the lessons to see definitions, or browse our comprehensive glossary.</p>
          
          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-lg animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedTerms.map((term: any) => (
                <div key={term.id} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-primary-dark mb-2">{term.term}</h3>
                  <p className="text-gray-700">{term.definition}</p>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-6">
            <Link href="/glossary">
              <a className="text-primary flex items-center gap-1 text-sm font-medium">
                View full glossary
                <i className="ri-arrow-right-line"></i>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
