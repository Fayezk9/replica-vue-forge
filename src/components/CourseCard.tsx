import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, BookOpen, Clock } from "lucide-react";
import { CourseInfo } from "@/data/courseDates";

interface CourseCardProps {
  course: CourseInfo;
  image: string;
}

export const CourseCard = ({ course, image }: CourseCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 group">
      <div className="aspect-video overflow-hidden bg-muted">
        <img
          src={image}
          alt={`${course.level} Deutschkurs`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <CardHeader className="transition-all duration-300">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="default" className="text-lg px-4 py-1 transition-all duration-200 group-hover:scale-110">
            {course.level}
          </Badge>
          <span className="text-2xl font-bold text-primary transition-all duration-200">€{course.price}</span>
        </div>
        <CardTitle className="text-xl transition-colors duration-200 group-hover:text-primary">
          {course.level} Deutsch-Intensivkurs
        </CardTitle>
        <CardDescription className="text-base transition-colors duration-200">
          Sprachzertifikat in 8 Wochen
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 transition-all duration-300">
        <div className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-200 group-hover:text-foreground group-hover:translate-x-1">
          <Clock className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12" />
          <span>Dauer: {course.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-200 group-hover:text-foreground group-hover:translate-x-1">
          <Calendar className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12" />
          <span>{course.courseDays}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-200 group-hover:text-foreground group-hover:translate-x-1">
          <MapPin className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12" />
          <span>Kursort: {course.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-200 group-hover:text-foreground group-hover:translate-x-1">
          <BookOpen className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12" />
          <span>Prüfung: {course.exam}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full transition-all duration-200 group-hover:shadow-lg">
          <a href={`/kurse/${course.level.toLowerCase()}`}>
            Mehr erfahren
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
