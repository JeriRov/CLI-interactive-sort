#!/usr/bin/env node

const readline = require("readline");
const userInputInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const exit = () => {
    console.log("Good bye! Come back again!");
    userInputInterface.close();
};

const getInput = (question) => {
    return new Promise((resolve) => {
        userInputInterface.question(question, (answer) => {
            resolve(answer);
        });
    });
};

const main = async () => {
    const input = await getInput("Hello. Enter 10 words or digits dividing them in spaces:\n");

    const items = input.trim().split(" ");
    const words = items.filter((item) => isNaN(item));
    const digits = items.filter((item) => !isNaN(item)).map((elem) => +elem);

    const choice = await getInput(`How would you like to sort values?
1. Words by name (A-Z).
2. Show digits from the smallest.
3. Show digits from the biggest.
4. Words by quantity of letters.
5. Only unique words.
6. Only unique values from original string.
Select (1-6) and press ENTER:\n`);

    let result;

    switch (choice) {
        case '1':
            result = words.sort();
            break;
        case '2':
            result = digits.sort((a, b) => a - b);
            break;
        case '3':
            result = digits.sort((a, b) => b - a);
            break;
        case '4':
            result = words.sort((a, b) => a.length - b.length);
            break;
        case '5':
            result = Array.from(new Set(words));
            break;
        case '6':
            result = Array.from(new Set(items));
            break;
        case "exit":
            exit();
            return;
        default:
            break;
    }
    console.log(result || "Wrong input. Try again.");

    await main();
};

main();
