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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={`${course.level} Deutschkurs`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="default" className="text-lg px-4 py-1">
            {course.level}
          </Badge>
          <span className="text-2xl font-bold text-primary">{course.price} €</span>
        </div>
        <CardTitle className="text-xl">{course.level} Deutsch-Intensivkurs</CardTitle>
        <CardDescription className="text-base">
          Sprachzertifikat in 8 Wochen
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Dauer: {course.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{course.courseDays}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>Kursort: {course.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="w-4 h-4" />
          <span>Prüfung: {course.exam}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <a href={`/kurse/${course.level.toLowerCase()}`}>
            Mehr erfahren
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
