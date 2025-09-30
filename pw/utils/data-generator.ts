/** Generates a random first name. */
export function generateRandomFirstName(): string {
  return `User${Math.floor(Math.random() * 1000)}`;
}

/** Generates a random last name. */
export function generateRandomLastName(): string {
  return `Test${Math.floor(Math.random() * 1000)}`;
}

/** Generates a random 5-digit postal code. */
export function generateRandomPostalCode(): string {
  return Math.floor(10000 + Math.random() * 89999).toString();
}