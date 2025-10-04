import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { TelcHeroBanner } from "@/components/TelcHeroBanner";
import { TelcC1ExamDetails } from "@/components/TelcC1ExamDetails";
import { Footer } from "@/components/Footer";

const TelcC1 = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main>
        <TelcHeroBanner />
        <TelcC1ExamDetails />
      </main>
      <Footer />
    </div>
  );
};

export default TelcC1;
