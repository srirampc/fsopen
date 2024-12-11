# Workflow 

```
mermaid

sequenceDiagram
    participant browser
    participant server 


   browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
   activate server
   server->>browser: 302 REDIRECT https://studies.cs.helsinki.fi/exampleapp/notes
   deactivate server

   Note right of browser: The note entered in the form is sent with POST request.
```
