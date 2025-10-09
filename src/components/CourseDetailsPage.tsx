import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, BookOpen, Clock, ExternalLink } from "lucide-react";
import { CourseInfo } from "@/data/courseDates";

interface CourseDetailsPageProps {
  course: CourseInfo;
  image: string;
}

export const CourseDetailsPage = ({ course, image }: CourseDetailsPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative h-[400px] overflow-hidden">
          <img 
            src={image} 
            alt={`${course.level} Deutschkurs`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center text-white">
              <Badge variant="secondary" className="mb-4 text-lg px-6 py-2">
                {course.level}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                📘 {course.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Course Overview */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground mb-8">
                {course.description}
              </p>

              {/* Course Info Card */}
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{course.level} Deutsch-Intensivkurs</CardTitle>
                    <span className="text-3xl font-bold text-primary">{course.price} €</span>
                  </div>
                  <CardDescription>
                    (Die telc-Prüfung findet bei unserem Partner inlingua Dortmund statt)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span><strong>Dauer:</strong> {course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span><strong>Kurstage:</strong> {course.courseDays}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span><strong>Kursort:</strong> {course.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span><strong>Prüfung:</strong> {course.exam}</span>
                    </div>
                  </div>

                  {/* Available Dates */}
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-3">📅 Verfügbare Termine:</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {course.availableDates.map((date, index) => (
                        <div key={index} className="bg-muted/50 p-3 rounded-md">
                          {date.startDate} – {date.endDate}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button size="lg" className="w-full mt-6">
                    Jetzt anmelden
                  </Button>
                </CardContent>
              </Card>

              {/* Target Audience */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">🔵 Für wen ist dieser Kurs geeignet?</h2>
                <div className="space-y-3">
                  {course.targetAudience.map((audience, index) => (
                    <p key={index} className="text-muted-foreground">
                      {audience}
                    </p>
                  ))}
                </div>
              </div>

              {/* Course Materials */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">📖 Kursmaterial – Deutschkurs {course.level}</h2>
                <div className="space-y-3">
                  {course.materials.coursebook && (
                    <div className="flex items-start gap-2">
                      <span className="font-semibold">📚 Kursbuch:</span>
                      <div>
                        <a 
                          href={course.materials.coursebook.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                          „{course.materials.coursebook.name}"
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <span className="text-muted-foreground ml-2">
                          (ISBN {course.materials.coursebook.isbn})
                        </span>
                      </div>
                    </div>
                  )}
                  {course.materials.additional && (
                    <div className="flex items-start gap-2">
                      <span className="font-semibold">📄 Zusatzmaterial:</span>
                      <div>
                        <a 
                          href={course.materials.additional.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                          {course.materials.additional.name}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <span className="text-muted-foreground ml-2">
                          (ISBN {course.materials.additional.isbn})
                        </span>
                      </div>
                    </div>
                  )}
                  {course.materials.note && (
                    <div className="bg-muted/50 p-4 rounded-md">
                      <p className="text-sm">📌 {course.materials.note}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Section */}
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-2xl">Bereit anzufangen?</CardTitle>
                  <CardDescription className="text-primary-foreground/80">
                    Sichern Sie sich jetzt Ihren Platz im {course.level} Deutsch-Intensivkurs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="lg" variant="secondary" className="w-full">
                    Jetzt Kurs buchen
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
