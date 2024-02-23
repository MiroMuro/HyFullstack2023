const App = () => {
  interface CourseNameProps {
    name: string;
  }
  interface Course {
    name: string;
    exerciseCount: number;
  }
  interface CoursePartsProps {
    courses: Course[];
  }

  const Header = (props: CourseNameProps) => {
    return <h1>{props.name}</h1>;
  };
  const Content = (props: CoursePartsProps) => {
    return props.courses.map((course) => (
      <p>
        {course.name} {course.exerciseCount}
      </p>
    ));
  };
  const Total = (props: CoursePartsProps) => {
    const totalExercises = props.courses.reduce(
      (sum, part) => sum + part.exerciseCount,
      0
    );
    return <p>Number of exercises: {totalExercises}</p>;
  };
  const courseName = "Half Stack application development";

  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  //const totalExercises = courseParts.reduce(
  //  (sum, part) => sum + part.exerciseCount,
  //  0
  //);

  return (
    <div>
      <Header name={courseName}></Header>
      <Content courses={courseParts}></Content>
      <Total courses={courseParts}></Total>
    </div>
  );
};

export default App;
