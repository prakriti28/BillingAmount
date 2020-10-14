var colors = require('colors');
/** can ask ques and receive ans from user */
const inquirer = require('inquirer');
/**for file reading in-built library of nodejs */
const fs = require('fs');
/**func expression 
 * func name-validator(){
 * }
 */
let validator = function (value) {
    /* By Default, value is of string datatype. */
    const parsedValue = parseFloat(value);

    if(!Number.isInteger(parsedValue) || parsedValue<0) {
        return "Please Enter Appropriate Value.."
    }
    return true;
};

/*Check denomination List.*/
const currencies = [1000, 500, 100, 50, 10, 1];

/*Try taking denomination as well as input.*/


/** question type(input/plain-text,radio-butoons,check-boxes,list)
 * name-stores the response of ques 
 */
var questions = [
    {
        type: 'input',
        name: 'bill_amount',
        message: 'Bill Amount',
        validate: (value) => {return validator(value);},
    },
    {
        type: 'input',
        name: 'x1000',
        message: 'x1000',
        default: () => {return '0';},
        validate: (value) => {return validator(value);},
    },
    {
        type: 'input',
        name: 'x500',
        message: 'x500',
        default: () => {return '0';},
        validate: (value) => {return validator(value);},
    },
    {
        type: 'input',
        name: 'x100',
        message: 'x100',
        default: () => {return '0';},
        validate: (value) => {return validator(value);},
    },
    {
        type: 'input',
        name: 'x50',
        message: 'x50',
        default: () => {return '0';},
        validate: (value) => {return validator(value);},
    },
    {
        type: 'input',
        name: 'x10',
        message: 'x10',
        default: () => {return '0';},
        validate: (value) => {return validator(value);},
    },
    {
        type: 'input',
        name: 'x1',
        message: 'x1',
        default: () => {return '0';},
        validate: (value) => {return validator(value);},
    },
];


/* Calculates the total amount from the given input denominations. */
let getTotal = function (input_denominations) {
    let total = 0;
    for (currency of currencies) {
        let name = 'x' + currency;
        total += parseInt(input_denominations[name])*currency;
    }
    return total;
}
/** currencies-from currency_store =
 * {"x1000":0,"x500":1,"x100":5,"x50":0,"x10":0,"x1":0}
 * amount=1000
*/
let getDenominations = function(amount, currency_store) {
    var amountDenomination = {};
    for (currency of currencies) {
        let name = 'x' + currency;
        let nNotes = parseInt(amount/currency);
        amount -= currency * Math.min(nNotes, currency_store[name]);
        amountDenomination[name] = nNotes;
    }

    /*
        Couldn't make a denomination set which would sum up to amount. 
        Left-out amount is there.
    */
    if (amount) throw "No Feasible Denomination Set.";
    else        return amountDenomination;
}

let printDenomination = function (denominations) {
    for (currency of currencies) {
        let name = 'x' + currency;
        console.log(name + " " +colors.green(denominations[name]));
    }
}

let makeTransaction = function () {
    inquirer.prompt(questions).then((answers) => {

        let bill_amount = answers.bill_amount;
        let amountPaid = getTotal(answers);
        if (bill_amount > amountPaid) {
            console.warn("Amount Paid is less.\nMake a new transaction.");
            return;
        }
/**by default readFileSync returns a buffer which is of no use , so we will encode it to UTF-8 */
        let currency_store = fs.readFileSync('./currency_store.json', {encoding: 'utf-8'});
        currency_store = JSON.parse(currency_store);
        for (currency of currencies) {
            let name = 'x' + currency;
            currency_store[name] += parseInt(answers[name]);
        }

        let balance = amountPaid - bill_amount;

        try {
            let balance_denominations = getDenominations(balance, currency_store);
            console.log("Balance Amount: " + colors.green(balance));
            console.log("Denominations of Balance :");
            printDenomination(balance_denominations);
            for (currency of currencies) {
                let name = 'x' + currency;
                currency_store[name] -= parseInt(balance_denominations[name]);
            }
            fs.writeFileSync('./currency_store.json', JSON.stringify(currency_store));
        } catch (error) {
            console.log("Change Problem.");
            /*Return back the amount received, and ask to make a new transaction.*/
            return ;
        }
        // fs.writeFileSync('./currency_store.json', JSON.stringify(currency_store));
    });
};

module.exports = {
    makeTransaction,
};

