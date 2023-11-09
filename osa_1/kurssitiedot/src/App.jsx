
const App = () =>{

  
  const course = {
    name: "Half Stack application development",
    parts: [
    {osa : "fundamentals of React", tehtävät : 10},
    {osa : "Using props to pass data", tehtävät: 7},
    {osa: "State of a component", tehtävät: 14}
    ]
  }
 
  return(
    <>
      <Header otsikko={course.name}/>
      <Content taulukko={course.parts}/>
      <Total taulukko = {course.parts.map(value => value.tehtävät)}/>
      
      
    </>
  )
}


const Header = (props) => {
  return(
  <h1>{props.otsikko}</h1>
  )
}
const Content = (props) => {
  return(
    <>
    <Part osa={props.taulukko[0].osa} harjoitukset={props.taulukko[0].tehtävät}/>
    <Part osa={props.taulukko[1].osa} harjoitukset={props.taulukko[1].tehtävät}/>
    <Part osa={props.taulukko[2].osa} harjoitukset={props.taulukko[2].tehtävät}/>
    </>
  )
}
const Part = (props) => {
  return(
    <p>
      {props.osa} {props.harjoitukset}
    </p>
  )
}

const Total = (props) =>{
  console.log("Total funktiossa", {props})
  return(
    <p>
      Number of exercises {props.taulukko[0]+props.taulukko[1]+props.taulukko[2]}
    </p>
  )
}


export default App
