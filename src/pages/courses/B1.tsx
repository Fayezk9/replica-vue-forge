import { CourseDetailsPage } from "@/components/CourseDetailsPage";
import { coursesData } from "@/data/courseDates";
import courseB1 from "@/assets/course-b1.jpg";

const CourseB1 = () => {
  const course = coursesData.find(c => c.level === 'B1')!;
  return <CourseDetailsPage course={course} image={courseB1} />;
};

export default CourseB1;
