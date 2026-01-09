import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { TelcHeroBanner } from "@/components/TelcHeroBanner";
import { TelcExamDetails } from "@/components/TelcExamDetails";
import { Footer } from "@/components/Footer";

const TelcB1 = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main>
        <TelcHeroBanner />
        <TelcExamDetails />
      </main>
      <Footer />
    </div>
  );
};

export default TelcB1;
