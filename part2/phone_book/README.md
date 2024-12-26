# Exercises 2.6 -- 2.10


[Problem Statement](https://fullstackopen.com/en/part2/forms#exercises-2-6-2-10)

>2.6: The Phonebook Step 1
>Let's create a simple phonebook. In this part, we will only be adding names to the phonebook.
>
>Let us start by implementing the addition of a person to the phonebook.
>
>You can use the code below as a starting point for the App component of your application:

> ```javascript
> 
> import { useState } from 'react'
> const App = () => {
>   const [persons, setPersons] = useState([
>     { name: 'Arto Hellas' }
>   ]) 
>   const [newName, setNewName] = useState('')
> 
>   return (
>     <div>
>       <h2>Phonebook</h2>
>       <form>
>         <div>
>           name: <input />
>         </div>
>         <div>
>           <button type="submit">add</button>
>         </div>
>       </form>
>       <h2>Numbers</h2>
>       ...
>     </div>
>   )
> }
> 
> export default Appcopy
> ```

> The newName state is meant for controlling the form input element.

> Sometimes it can be useful to render state and other variables as text for debugging purposes. You can temporarily add the following element to the rendered component:

> <div>debug: {newName}</div>copy
>It's also important to put what we learned in the debugging React applications chapter of part one into good use. The React developer tools extension is incredibly useful for tracking changes that occur in the application's state.

>After finishing this exercise your application should look something like this:


> 2.7: The Phonebook Step 2
Prevent the user from being able to add names that already exist in the phonebook. JavaScript arrays have numerous suitable methods for accomplishing this task. Keep in mind how object equality works in Javascript.

> Issue a warning with the alert command when such an action is attempted:

> browser alert: "user already exists in the phonebook"
> Hint: when you are forming strings that contain values from variables, it is recommended to use a template string:

> ```
> `${newName} is already added to phonebook`copy
> ```
> If the newName variable holds the value Arto Hellas, the template string expression returns the string


> 2.8: The Phonebook Step 3
> Expand your application by allowing users to add phone numbers to the phone book. You will need to add a second input element to the form (along with its own event handler):

> ```html
> <form>
>   <div>name: <input /></div>
>   <div>number: <input /></div>
>   <div><button type="submit">add</button></div>
> </form>copy
> ```

> 2.9*: The Phonebook Step 4
> Implement a search field that can be used to filter the list of people by name:

> You can implement the search field as an input element that is placed outside the HTML form. The filtering logic shown in the image is case insensitive, meaning that the search term arto also returns results that contain Arto with an uppercase A.

> NB: When you are working on new functionality, it's often useful to "hardcode" some dummy data into your application, e.g.

> ```javascript
> const App = () => {
>   const [persons, setPersons] = useState([
>     { name: 'Arto Hellas', number: '040-123456', id: 1 },
>     { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
>     { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
>     { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
>   ])
> 
>   // ...
> }
> ```
> This saves you from having to manually input data into your application for testing out your new functionality.

> 2.10: The Phonebook Step 5
> If you have implemented your application in a single component, refactor it by extracting suitable parts into new components. Maintain the application's state and all event handlers in the App root component.
> 
> It is sufficient to extract three components from the application. Good candidates for separate components are, for example, the search filter, the form for adding new people to the phonebook, a component that renders all people from the phonebook, and a component that renders a single person's details.
> 
> The application's root component could look similar to this after the refactoring. The refactored root component below only renders titles and lets the extracted components take care of the rest.

```javascript

const App = () => {
  // ...

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter ... />

      <h3>Add a new</h3>

      <PersonForm 
        ...
      />

      <h3>Numbers</h3>

      <Persons ... />
    </div>
  )
}
```
