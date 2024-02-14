interface HeightWeight {
  height: number;
  weight: number;
}

const parameterParser = (args: string[]): HeightWeight => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Arguments were not numbers!");
  }
};

const calculateBmi = (height: number, kg: number): string => {
  const bmi: number = kg / ((height / 100) ^ 2);

  if (bmi <= 18.4) {
    return "Underweight (unhealthy weight)";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25.0 && bmi <= 39.9) {
    return "Overweight (unhealthy weight)";
  } else if (bmi >= 40.0) {
    return "Obese (very unhealthy weight)";
  }
  return "";
};

try {
  const { height, weight } = parameterParser(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened";
  if (error instanceof Error) {
    errorMessage += " Error " + error.message;
  }
  console.log(errorMessage);
}
