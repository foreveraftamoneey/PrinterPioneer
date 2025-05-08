import { Switch, Route } from "wouter";
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";
import HomePage from "@/pages/HomePage";
import ModulePage from "@/pages/ModulePage";
import MaterialsPage from "@/pages/MaterialsPage";
import QuizPage from "@/pages/QuizPage";
import GlossaryPage from "@/pages/GlossaryPage";
import NotFound from "@/pages/not-found";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className="flex-1 pt-6 px-4 md:px-8 pb-16 overflow-y-auto">
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/module/:id" component={ModulePage} />
            <Route path="/materials" component={MaterialsPage} />
            <Route path="/quiz/:id" component={QuizPage} />
            <Route path="/glossary" component={GlossaryPage} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
      
      <MobileNavigation />
    </div>
  );
}

export default App;
