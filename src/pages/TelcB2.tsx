import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { TelcHeroBanner } from "@/components/TelcHeroBanner";
import { TelcB2ExamDetails } from "@/components/TelcB2ExamDetails";
import { Footer } from "@/components/Footer";

const TelcB2 = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main>
        <TelcHeroBanner />
        <TelcB2ExamDetails />
      </main>
      <Footer />
    </div>
  );
};

export default TelcB2;
