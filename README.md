# Storefront - Customer View
In this CLI experience, the user has the ability to simulate an eCommerce transaction. The user will send an order using the npm of Inquirer through Node.js. MySQL is the database that is used to keep the storefront's products to sell.

##Directions
* Storefront CLI will show the user all of the products available from inventory. What is displayed are the items for sale with its identifier numbers and prices.
* Storefront will ask users to identify what product they want to buy using the item number.
* Storefront will ask for the quantity the user plans to buy.

### Outcomes
* A transaction is approved if the user picked an item that had enough items on its inventory.
* A transaction is unapproved if the user chose to buy too many items that exceeded storefront's storage of the chosen item.

## Challenges
 The biggest challenge was connecting to MySQL and using the proper syntax to target what data I wanted to manipulate. I overcame this challenge with many console.logs to Node and reviewing older class material.