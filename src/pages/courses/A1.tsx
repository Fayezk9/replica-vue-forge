import { CourseDetailsPage } from "@/components/CourseDetailsPage";
import { coursesData } from "@/data/courseDates";
import courseA1 from "@/assets/course-a1.jpg";

const CourseA1 = () => {
  const course = coursesData.find(c => c.level === 'A1')!;
  return <CourseDetailsPage course={course} image={courseA1} />;
};

export default CourseA1;
