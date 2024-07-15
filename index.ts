#! /usr/bin/env node

import inquirer from "inquirer";

//Bank account interface
interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount:number): void
    deposit(amount:number): void
    checkBalance(): void
}

//Bank account class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

//Debit money method
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
        console.log(`Withdrawal of $${amount} successfully! \nRemaining balance: $${this.balance}`);
    }else{
        console.log("Insufficient Balance");
    }
}

//Credit money method
deposit(amount: number): void {
    if(amount > 100){
        //deposit charge deduction 
        amount -= 1;
    }
    //addition of deposited amount
    this.balance += amount;
    console.log(`Deposit of $${amount} successfully! \nRemaining balance: $${this.balance}`);
}

//Check Balance method
checkBalance(): void {
    console.log(`Current balance: $${this.balance}`);
}
}

//Customer class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string,lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//Create bank accounts

const accounts: BankAccount[] = [
    new BankAccount(1234, 1000),
    new BankAccount(5678, 2000),
    new BankAccount(9012, 1500),

];

//Create customer 

const customers: Customer[] = [
    new Customer ("Muhammad", "Hamza", "Male", 21, 3220123466, accounts[0]),
    new Customer ("Muhammad", "Hafeez", "Male", 22, 3220121116, accounts[1]),
    new Customer ("Syeda", "Fatima", "Female", 21, 3567123466, accounts[2]),
] 

//Function to interact with bank account
//make function
//do while is used to continupsuly runing

async function service(){
    do{
        const accountNumberInput = await inquirer.prompt([
            {
                name: "accountNumber",
                type: "number",
                message: "Enter your account number:"
            }
        ]);
        //to check the correct account number
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`----------Welcome ${customer.firstName} ${customer.lastName}----------`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select an option",
                    choices: ["Deposit", "Withdraw", "Check balance", "Exit"]
                }
            ]);

            switch(ans.select){
                case "Deposit":
                    const depositAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to be deposit:"
                        }
                    ]);
                    customer.account.deposit(depositAmount.amount);
                    console.log("\n Thank You!");
                    //take exit out to the function
                    return;
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to be withdraw:"
                        }
                    ]);
                    customer.account.withdraw(withdrawAmount.amount);
                    console.log("\n\tThank You!");
                    //take exit out to the function
                    return;
                    break;
                case "Check balance":
                    customer.account.checkBalance();
                    console.log("\n\tThank You!");
                    //take exit out to the function
                    return;
                    break;
                case "Exit":
                    console.log("Exiting program......");
                    console.log("\n\tThank You!");
                    //take exit out to the function
                    return;
            }
        }else{
            console.log("Invalid account number. Please try again with correct account number.");
        }
    }while(true)
}

service();