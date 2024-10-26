# Inventory

This website is a simple inventory management system that allows you to view, add, and update products in your inventory. 
The website consists of the following pages:

Home: This page displays a welcome message and provides a button to navigate to the Products page

Products: This page displays a list of products in your inventory. You can search for products by name and sort the products by price. 
You can also add new products or update existing products

Insert Product: This page allows you to add a new product to your inventory

Update Product: This page allows you to update the details of an existing product

Login: This page allows you to enter a verification code to access the product management features


## To Run App:
    
### 1. Open the folder in vs code and run (npm install) command.
   
### 2. In PG Admin
- Create a new database named "Inventory".
- Create a new table named "products" with columns id, name, price, quantity, description.

### 3. Then in vs code, open two terminals in split:

### 4. In one terminal run these commands (For Backend / Server):
   - cd Backend
   - npm run server

### 5. In the other terminal run these commands (For Frontend / Client):
   - cd Frontend
   - cd inventory_management_system
   - npm start

### 6. The verification code for any operation is 220059 which can be changed in the code.
