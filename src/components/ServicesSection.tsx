import studentsExam from "@/assets/students-exam.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ServicesSection = () => {
  const services = [
    {
      title: "Intensivkurse A1-C1",
      subtitle: "Schnell und einfach anmelden",
      description: "Ihr Kurs wartet auf Sie!",
      link: "#termine",
      linkText: "Termine und Preise",
      image: studentsExam,
    },
    {
      title: "telc-Prüfungen",
      subtitle: "Benötigen Sie ein anerkanntes Sprachzertifikat?",
      description: "Offizielle telc-Prüfungen bei inlingua Dortmund",
      link: "#telc",
      linkText: "Mehr erfahren",
      image: studentsExam,
    },
    {
      title: "Integrationskurse",
      subtitle: "Für EU-Bürger, Neuzuwanderer, Ausländer mit Aufenthaltstitel",
      description: "Spätaussiedler, Asylberechtigte, deutsche Staatsangehörige mit Integrationsbedarf",
      link: "#integration",
      linkText: "Mehr erfahren",
      image: studentsExam,
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-4xl font-bold text-center mb-12">
          Unser Angebot
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-2xl font-bold mb-3">{service.title}</h3>
                <p className="font-semibold mb-2">{service.subtitle}</p>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Button asChild variant="default" className="w-full">
                  <a href={service.link}>{service.linkText}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
