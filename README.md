## Version 3.0
#### Description
Version 3.0 has you creating the backend code required to facilitate the SGT.

For your challenge, you were required to make a database schema for SGT.  Now you will be using that schema to create the database and crafting backend code to respond in the same way as the LearningFuze SGT backend.
- GET - Create the backend call that handles "get" operations like <a href="https://github.com/Learning-Fuze/SGT/tree/v1.0" target="_blank">SGT 1.0</a>
- CREATE - Create the backend call that handles "create" operations like  <a href="https://github.com/Learning-Fuze/SGT/tree/v2.0#scope" target="_blank">SGT 2.0 Create</a>
- DELETE - Create the backend call that handles "delete" operations like  <a href="https://github.com/Learning-Fuze/SGT/tree/v2.0#scope" target="_blank">SGT 2.0 Delete</a>
- EXTRA CREDIT:
  - Create the auto-complete functionality similar to the auto-complete functionality here:
    - url: s-apis.learningfuze.com/sgt/courses
    - method: post
    - input: 
      - course: (string) the partial string for courses to search for
      - search_type (optional): (string) 
        - ‘full’: search for course input anywhere in the course name
        - ‘partial’: partial text matching, search for course input only in the beginning of the course name
    - output: 
      - success: (boolean) whether the operation succeeded
      - errors (optional): any errors that occurred, if any
      - data (optional): any courses that match the specified course string, if any
    - Hint:
      - use mysql's partial text search LIKE instead of = in your SELECT query.  You can also use DISTINCT to get only one entry per variation rather than multiple copies of the same thing


