# Currency Denomination Manager

## About the App
  App takes the denominations of the currencies paid by the user(Amount Paid) and the (Bill Amount) as input. Makes a transaction according to 
  one of the possible scenarios mentioned below.
  
  ### Possible Scenarios:
  1. If Bill Amount > Amount Paid   ==>  UnSuccesful Transaction (Lack of Amount Paid)
  2. If we can't pay the balance amount with the denominations we currently have.  ==>  UnSuccesful Transaction (Change Problem)
  3. We return back the balance with the least set of notes. ==> Successful Transaction (Update the count of all denominations.)
  
## Installation
1. Clone/Fork the repository from Github.
2. Navigate to the root folder in your local device.
3. Run the command **npm install** to download the third party npm dependencies.

## Command Syntax
**npm start**

## Third Party Dependencies 
1. [commander](https://www.npmjs.com/package/commander) 
2. [inquirer](https://www.npmjs.com/package/inquirer)
3. [colors](https://www.npmjs.com/package/colors)
