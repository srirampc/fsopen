# Sequence diagram for new note (Single page app)

```mermaid

sequenceDiagram
    participant browser
    participant server 


    Note right of browser: The browser starts executing the submit callback, which updates the list of notes in the page. Then it sends a POST HTTP request to update the database. 

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa Payload: {"content": ..., "date": ...}
    activate server
    server-->>browser: Status: 201 ; Response: { "message": "note created" }
    deactivate server

    Note right of browser: The browser executes the callback function that parses the json and renders the notes. 
    After the document is loaded in the browser, a callback function is registered for the submit action on the notes_form.
```
