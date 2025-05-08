import WelcomeSection from "@/components/WelcomeSection";
import ContinueLearning from "@/components/ContinueLearning";
import LearningModules from "@/components/LearningModules";
import InteractiveExplorer from "@/components/InteractiveExplorer";
import MaterialsComparison from "@/components/MaterialsComparison";
import QuizSection from "@/components/QuizSection";
import Glossary from "@/components/Glossary";
import CommunityResources from "@/components/CommunityResources";

export default function HomePage() {
  return (
    <>
      <WelcomeSection />
      <ContinueLearning />
      <LearningModules />
      <InteractiveExplorer />
      <MaterialsComparison />
      <QuizSection />
      <Glossary />
      <CommunityResources />
    </>
  );
}
