const Header = (props) => (
    <h1>{props.course}</h1>
)

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
)

const Content = ({ parts }) => (
    <>
        {parts.map((prt) => (<Part key={prt.id} part={prt} />))}
    </>
)

const Total = ({ parts }) => {
    const total = parts.reduce((rsum, curr) => rsum + curr.exercises, 0)
    return (
        <>
            <p> <b> total of {total} exercises</b> </p>
        </>
    )
}

const Course = ({ course }) => (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

export default Course
