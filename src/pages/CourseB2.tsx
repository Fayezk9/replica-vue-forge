import { CourseDetailsPage } from "@/components/CourseDetailsPage";
import { coursesData } from "@/data/courseDates";
import courseB2 from "@/assets/course-b2.jpg";

const CourseB2 = () => {
  const course = coursesData.find(c => c.level === 'B2')!;
  return <CourseDetailsPage course={course} image={courseB2} />;
};

export default CourseB2;
