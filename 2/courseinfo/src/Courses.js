import React from 'react';

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((sum, part) => {
      return sum = sum + part.exercises
    }, 0)
    return(
      <b>Total of {sum} exercises</b>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map((part) => <Part part={part} key={part.id}/>)}
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    ) 
  }
  
  const Courses = ({ courses }) => {
    return(
      courses.map((course) => <Course course={course} key={course.id}/>)
    )
  }

  export default Courses;