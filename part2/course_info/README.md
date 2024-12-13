# Exercises 2.1.-2.5.

[Problem Statement](https://fullstackopen.com/en/part2/rendering_a_collection_modules#exercises-2-1-2-5)

>2.1: Course information step 6
Let's finish the code for rendering course contents from exercises 1.1 - 1.5. You can start with the code from the model answers. The model answers for part 1 can be found by going to the submission system, clicking on my submissions at the top, and in the row corresponding to part 1 under the solutions column clicking on show. To see the solution to the course info exercise, click on index.js under kurssitiedot ("kurssitiedot" means "course info").

>Note that if you copy a project from one place to another, you might have to delete the node_modules directory and install the dependencies again with the command npm install before you can start the application.

>Generally, it's not recommended that you copy a project's whole contents and/or add the node_modules directory to the version control system.

>Let's change the App component like so:
> ```javascript
> const App = () => {
>   const course = {
>     id: 1,
>     name: 'Half Stack application development',
>     parts: [
>       {
>         name: 'Fundamentals of React',
>         exercises: 10,
>         id: 1
>       },
>       {
>         name: 'Using props to pass data',
>         exercises: 7,
>         id: 2
>       },
>       {
>         name: 'State of a component',
>         exercises: 14,
>         id: 3
>       }
>     ]
>   }
> 
>   return <Course course={course} />
> }
> 
> export default App
> ```

> Define a component responsible for formatting a single course called Course.

> The component structure of the application can be, for example, the following:

> App
>   Course
>     Header
>     Content
>       Part
>       Part
>       ...

> Hence, the Course component contains the components defined in the previous part, which are responsible for rendering the course name and its parts.

> 2.2: Course information step 7
Show also the sum of the exercises of the course.

>2.3*: Course information step 8
If you haven't done so already, calculate the sum of exercises with the array method reduce.

>2.4: Course information step 9
Let's extend our application to allow for an arbitrary number of courses:
```javascript
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      // ...
    </div>
  )
}
```

>2.5: Separate module step 10
Declare the Course component as a separate module, which is imported by the App component. You can include all subcomponents of the course in the same module.
