# micro-service-blog
Implementation of Micro Service Architucture, Clustering, Load Balancing and Caching with Node js on an nginx server

1. `git clone https://github.com/Peter-Paul/micro-service-blog.git`
2. go to project folder.
3. Create node app image  `docker build -t node-app .` 
4. Run `docker-compose up` command
5. Open `http://localhost:8080/` for  in browser. This will open app 1,2,3,4, and load balanced app 5 (running on two ports) in browser.
6. Open `http://localhost:8081/` for  in browser. This will open app 1,2,3,4, and load balanced app 6 (running on two ports) in browser.
