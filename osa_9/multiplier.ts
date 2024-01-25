type Operation = "multiply" | "add" | "divide";
type Result = string | number;
const calculator = (a: number, b: number, op: Operation): Result => {
  switch (op) {
    case "add":
      return a + b;
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) return "0 cant be divided!";
      return a / b;
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

try {
  console.log(calculator(2, 4, "add"));
} catch (error: unknown) {
  let errorMessage = "Something went wrong";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
