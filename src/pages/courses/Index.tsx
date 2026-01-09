import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { coursesData } from "@/data/courseDates";
import courseA1 from "@/assets/course-a1.jpg";
import courseA2 from "@/assets/course-a2.jpg";
import courseB1 from "@/assets/course-b1.jpg";
import courseB2 from "@/assets/course-b2.jpg";
import courseC1 from "@/assets/course-c1.jpg";

const courseImages = {
  A1: courseA1,
  A2: courseA2,
  B1: courseB1,
  B2: courseB2,
  C1: courseC1,
};

const Courses = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Deutsch-Intensivkurse in Dortmund
              </h1>
              <p className="text-xl text-primary-foreground/90">
                Professionelle Deutschkurse von A1 bis C1 – Präsenz oder Online
              </p>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Unsere Intensivkurse</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Wählen Sie den passenden Kurs für Ihr Sprachniveau. Alle Kurse starten alle 2 Monate 
                und sind sowohl online als auch vor Ort verfügbar.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coursesData.map((course) => (
                <CourseCard 
                  key={course.level} 
                  course={course} 
                  image={courseImages[course.level]}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Warum unsere Intensivkurse?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-semibold text-xl mb-3">📅 Flexible Kurszeiten</h3>
                  <p className="text-muted-foreground">
                    Kurse starten alle 2 Monate. Montag bis Donnerstag für intensive Lernfortschritte.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-semibold text-xl mb-3">🎓 Zertifizierte Abschlüsse</h3>
                  <p className="text-muted-foreground">
                    Bereiten Sie sich gezielt auf telc-Prüfungen vor oder nutzen Sie unsere Kurszertifikate.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-semibold text-xl mb-3">👥 Kleine Gruppen</h3>
                  <p className="text-muted-foreground">
                    Lernen Sie in kleinen Gruppen für maximalen Lernerfolg und individuelle Betreuung.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-semibold text-xl mb-3">🌐 Online oder Präsenz</h3>
                  <p className="text-muted-foreground">
                    Wählen Sie zwischen Präsenzunterricht in Dortmund oder flexiblem Online-Lernen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
