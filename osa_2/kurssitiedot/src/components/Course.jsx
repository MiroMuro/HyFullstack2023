const Header = ({otsikko}) => (<h1>{otsikko}</h1>)

const Course = ({course}) =>{
    return(
      <>
      <Header otsikko={course.name}/>
      <Content course={course}/>
      <Total exercises={course.parts.map((part)=> (part.exercises))}/>
      </>
    )
  }
  
  const Total = ({exercises}) =>{
    return(
      <p><strong>Total of exercises {exercises.reduce((total, exercises) => total + exercises,0)} </strong> </p>
    )
  }
  
  const Part = ({name, exercises}) =>{
    return(
      <p>
        {name} {exercises}
      </p>
    )
  }
  
  const Content = ({course}) =>{
    return(
      <>
      {course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
      </>
    )
  }

  export default Course