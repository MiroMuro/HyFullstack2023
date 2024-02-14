interface TrainingData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface DailyHoursAndTarget {
  dailyHours: number[];
  target: number;
}

const parseInput = (args: string[]): DailyHoursAndTarget => {
  let targetHours: number;
  //Check and throw error if the amount of target hours is not a number or below zero.
  if (isNaN(Number(args[2]))) {
    throw new Error("Target hours must be a numerical value!");
  } else if (Number(args[2]) <= 0) {
    throw new Error("Target hours cannot be zero or below zero!");
  } else {
    targetHours = Number(args[2]);
  }

  let trainingHoursPerDay: number[] = [];
  //Assert that the daily training hours only contain numerical values.
  if (args.slice(3).find((element) => isNaN(Number(element)))) {
    throw new Error("Arguments must be numerical values!");
  } else {
    trainingHoursPerDay = args.slice(3).map((hours) => Number(hours));
  }

  //Retun object holding an array of hours and a target amount of hours per day.
  return {
    dailyHours: trainingHoursPerDay,
    target: targetHours,
  };
};

const calculateExcercises = (
  trainingHoursPerDay: number[],
  targetTrainingHoursPerDay: number
): TrainingData => {
  let rating: number = 0;
  let ratingDescription: string = "";

  //Calculate average training hours per day
  let averageHours: number =
    trainingHoursPerDay.reduce((accumulator, curval) => accumulator + curval) /
    trainingHoursPerDay.length;

  //Filter out the days with 0 hours of exercise.
  let newTrainingDays: number = trainingHoursPerDay
    .filter((trainingDuration) => trainingDuration != 0)
    .reduce((acc) => acc + 1, 0);

  //Check if target hours per day was reached.
  let targetCompletion: boolean =
    averageHours >= targetTrainingHoursPerDay ? true : false;

  //Calculate the rating of how well the target hours were met.
  // 3 target hours reached.
  // 2 50% to 99.9% of target hours reached.
  // 1 0% to 49% of target hours reached.
  let ratingPercent: number = averageHours / targetTrainingHoursPerDay;

  if (targetCompletion) {
    ratingDescription = "Great work, exercise goal reached";
    rating = 3;
  } else if (ratingPercent <= 0.99 && ratingPercent >= 0.5) {
    ratingDescription = "not too bad but could be better";
    rating = 2;
  } else if (ratingPercent <= 0.49) {
    ratingDescription = "Not a good result. Step your training game";
    rating = 1;
  }

  const newTrainingData: TrainingData = {
    periodLength: trainingHoursPerDay.length,
    trainingDays: newTrainingDays,
    success: targetCompletion,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetTrainingHoursPerDay,
    average: averageHours,
  };
  return newTrainingData;
};

try {
  const { dailyHours, target } = parseInput(process.argv);
  console.log(calculateExcercises(dailyHours, target));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log("In da error: ", error.message);
  }
}
