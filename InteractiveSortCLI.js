#!/usr/bin/env node
const { COMMAND, MESSAGE } = require("./constants");

const readline = require("readline");
const userInputInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const exit = () => {
    console.log(MESSAGE.GOODBYE_MESSAGE);
    userInputInterface.close();
};

const getInput = (question) => (
    new Promise((resolve) => {
        userInputInterface.question(question, (answer) => {
            resolve(answer);
        });
    })
);

const main = async () => {
    const input = await getInput(MESSAGE.WELCOME_MESSAGE);

    const items = input.trim().split(" ");
    const words = items.filter((item) => isNaN(item));
    const digits = items.filter((item) => !isNaN(item)).map((elem) => +elem);

    const choice = await getInput(MESSAGE.SORT_TYPE_PROMPT);

    let result;

    switch (Number(choice) || choice) {
        case 1:
            result = words.sort();
            break;
        case 2:
            result = digits.sort((a, b) => a - b);
            break;
        case 3:
            result = digits.sort((a, b) => b - a);
            break;
        case 4:
            result = words.sort((a, b) => a.length - b.length);
            break;
        case 5:
            result = Array.from(new Set(words));
            break;
        case 6:
            result =  Array.from(new Set(items));
            break;
        case COMMAND.EXIT_COMMAND:
            exit();
            return;
        default:
            break;
    }
    console.log(result || MESSAGE.WRONG_COMMAND);

    await main();
};

main();
