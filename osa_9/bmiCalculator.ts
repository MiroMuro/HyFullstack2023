interface HeightWeight {
  height: number;
  weight: number;
}
interface HeightWeightBmi {
  height: number;
  weight: number;
  bmi: string;
}

interface Error {
  error: string;
}

//const parameterParserCLI = (args: string[]): HeightWeight => {
//  if (args.length < 4) throw new Error();
//  if (args.length > 4) throw new Error();
//
//  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
//    throw new Error();
//  }
//  if (Number(args[0]) == 0 || Number(args[1]) == 0) {
//    throw new Error();
//  } else {
//    return {
//      height: Number(args[0]),
//      weight: Number(args[1]),
//    };
//  }
//};

const parameterParser = (args: string[]): HeightWeight => {
  if (args.length < 2) throw new Error();
  if (args.length > 2) throw new Error();

  if (isNaN(Number(args[0])) || isNaN(Number(args[1]))) {
    throw new Error();
  }
  if (Number(args[0]) == 0 || Number(args[1]) == 0) {
    throw new Error();
  } else {
    return {
      height: Number(args[0]),
      weight: Number(args[1]),
    };
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

export const bmiCalc = (heightAndWeight: string[]): HeightWeightBmi | Error => {
  const { height, weight } = parameterParser(heightAndWeight);
  return {
    height: height,
    weight: weight,
    bmi: calculateBmi(height, weight),
  };
};
