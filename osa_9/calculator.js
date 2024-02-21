"use strict";
//type Operation = "multiply" | "add" | "divide";
//type Result = number | string;
const calculator = (a, b, op) => {
    switch (op) {
        case "multiply":
            return a * b;
        case "divide":
            if (b === 0)
                throw new Error('Can"t divide by 0!');
            return a / b;
        case "add":
            return a + b;
        default:
            throw new Error("Operation is not multiply, add  or divide!");
    }
};
const a = Number(process.argv[2]);
const b = Number(process.argv[3]);
const op = process.argv[4];
try {
    console.log(calculator(a, b, op));
}
catch (error) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
