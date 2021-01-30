# [File Metadata Microservice (Freecodecamp)](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/file-metadata-microservice)

Allows uploading of multiple files and sending back info about the file(s) uploaded. The infos are
- name of the file
- size of the file
- the mime type of the file (e.g. for plain txt files - text/plain, json files - application/json etc)

For a single file uploaded it sends just a JSON object with above info as properties while for multiple files, it sends an array of objects, each with their corresponding properties for the files uploaded.

[Here's the app on replit](https://filemetadata.healerc.repl.co/)