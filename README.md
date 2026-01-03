# feed-reader-client

This is the client side of the Feed Reader application.

The Feed Reader application is a secure web application where you manage feeds in widgets. Widgets are the short summaries of the parsed feeds. They display linked titles of the blog posts/news. This application is influenced from the old iGoogle implementation.

Angular, ng-bootstrap, Luxon technologies are used.

You can use Docker to preview this application. Clone the project and switch to the "feed-reader-client" directory in terminal. Then, execute "docker build -t feed-reader-client ." and let the docker build the image. Next, execute "docker run -d -p 4200:4200 feed-reader-client" and this will start the client application. After that you can reach this application on:
http://localhost:4200/

You can use following users in the application (username/password/role):

- **user/user**/USER
- **admin/admin**/ADMIN
