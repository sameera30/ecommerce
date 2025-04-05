#First created a react app using
npx create-react-app ecommerce

#after intsallation 
cd ecommerce

#For using react-routers
npm install react-router-dom

#for starting the application
npm start

#It will run on "https://localhost:3000"


Introduction
Project, titled Bookstore, is a React-based e-commerce application that shows variety of novels we have. Users can browse the product catalog,
view detailed information, and manage items in both cart and a wishlist. The application provides a responsive and user-friendly interface for
exploring and interacting with the toy collection.

Features
This application includes all books with their names, authors, images, and prices. Users can click on each product to view more
details, such as the books description and price, on a separate product details page. The cart management feature allows users to add items to their shopping cart, 
adjust quantities, and view the total cost. Additionally, users can maintain a wishlist, where they can add or move items between the cart and wishlist.
The interface is designed with responsive layouts to ensure an optimal experience on various devices, making it accessible on both desktop and mobile.
These features make it easy for users to navigate, view, and manage their desired products efficiently.

Now for the assignment-3:

For this we created MongoDb database and AWS EC2 instance 
FOr mongodb created a database test and added collections - wishlist, cart, products
1)Clone the repository:
https://github.com/ICSI518/assignment2-sameera30.git

2)Install Dependencies: 
Run the following command to install required packages:
npx express-generator --view=ejs ecommerce

For the backend:
Port used is 5000

For the frontend Port used is 3000

3)Start the Application: 
for frontend: npm start
for backend: node.js

The application will open in your default browser at http://localhost:3000.

4)Build for Production: To create a production-ready build, run:
npm run build

for assignment-3: AWS EC2 link: http://18.118.168.12:5000


In assignment-4 :

1)added login and registration page where only logged in users can access cart and wishlist 

2)After logging in they can view product list, add to cart and wishlist. 

3)Users can update thier profile (name and email ) easily.

4)only authenticated users can work with add to cart and wishlist-updated these wishlist and cart so that only logged users can view these 

5)aws link: http://3.23.168.79:5000


Also, for frontend: npm start
for backend: node app.js

when we start the server, the header has only login and register, it shows only product list 
but the user cannot add to cart or wishlist until and unless they login.
after logging in only they will work for each user.

->When the user logs in they can update their profile like name and email.

Docker Deployement:

Added Docker files for backend and frontend
and docker compose file 