function validateFinnishSSN(ssn: string): boolean {
  const regex =
    /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])([0-9]{2})-([0-9]{2,3})([0-9A-Z])$/;
  return regex.test(ssn);
}

// Test cases
const ssnList = [
  "090786-122X",
  "300179-77A",
  "250470-555L",
  "050174-432N",
  "090471-8890",
];

for (const ssn of ssnList) {
  console.log(`${ssn}: ${validateFinnishSSN(ssn) ? "Valid" : "Invalid"}`);
}
