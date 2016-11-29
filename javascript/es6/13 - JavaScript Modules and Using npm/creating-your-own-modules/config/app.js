const dog = 'snickers';

// Default Export
// Only 1 default by module
export default dog;

// Named Export
export const apiKey = 'abc123';
export const url = 'http://kevin-wenger.ch';
export const endpoint = 'skills';
export function sayHi(name) {
  console.log(`Hello there ${name}`);
}

const age = 100;

// You can change the name of export with the keyword "as"
export { age as old, dog };
