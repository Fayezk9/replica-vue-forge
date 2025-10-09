import { CourseDetailsPage } from "@/components/CourseDetailsPage";
import { coursesData } from "@/data/courseDates";
import courseA2 from "@/assets/course-a2.jpg";

const CourseA2 = () => {
  const course = coursesData.find(c => c.level === 'A2')!;
  return <CourseDetailsPage course={course} image={courseA2} />;
};

export default CourseA2;
