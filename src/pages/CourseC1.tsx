import { CourseDetailsPage } from "@/components/CourseDetailsPage";
import { coursesData } from "@/data/courseDates";
import courseC1 from "@/assets/course-c1.jpg";

const CourseC1 = () => {
  const course = coursesData.find(c => c.level === 'C1')!;
  return <CourseDetailsPage course={course} image={courseC1} />;
};

export default CourseC1;
