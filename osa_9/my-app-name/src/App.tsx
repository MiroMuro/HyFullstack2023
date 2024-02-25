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

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartBasic extends CoursePartDescription {
    //description: string;
    kind: "basic";
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
  }

  interface CoursePartBackground extends CoursePartDescription {
    //description: string;
    backgroundMaterial: string;
    kind: "background";
  }

  interface CoursePartSpecial extends CoursePartDescription {
    requirements: string[];
    kind: "special";
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }

  type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartSpecial;

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  const Header = (props: CourseNameProps) => {
    return <h1>{props.name}</h1>;
  };
  const Content = (props: { courses: CoursePart[] }) => {
    return props.courses.map((course) => (
      <div>
        <Part course={course}></Part>
      </div>
    ));
  };
  const Total = (props: CoursePartsProps) => {
    const totalExercises = props.courses.reduce(
      (sum, part) => sum + part.exerciseCount,
      0
    );
    return <p>Number of exercises: {totalExercises}</p>;
  };

  const Part = (props: { course: CoursePart }) => {
    switch (props.course.kind) {
      case "background":
        return (
          <div>
            <div>
              <b>
                {props.course.name} {props.course.exerciseCount}
              </b>
            </div>
            <div>
              <i>{props.course.description}</i>
            </div>
            <div>Submit to: {props.course.backgroundMaterial}</div>
            <br />
          </div>
        );
      case "basic":
        return (
          <div>
            <div>
              <b>
                {props.course.name} {props.course.exerciseCount}
              </b>
            </div>
            <div>
              <i>{props.course.description}</i>
            </div>
            <br />
          </div>
        );
      case "group":
        return (
          <div>
            <div>
              <b>
                {props.course.name} {props.course.exerciseCount}
              </b>
            </div>
            <div>projet exercises: {props.course.groupProjectCount}</div>
            <br />
          </div>
        );
      case "special":
        return (
          <div>
            <div>
              <b>
                {props.course.name} {props.course.exerciseCount}
              </b>
            </div>
            <div>
              <i> {props.course.description}</i>
            </div>
            <div>
              Required skills:
              {props.course.requirements.map((item, i, list) => (
                <span key={i}>
                  {item}
                  {i !== list.length - 1 && ", "}
                </span>
              ))}
            </div>
            <br />
          </div>
        );

      default:
        return assertNever(props.course);
    }
  };

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
