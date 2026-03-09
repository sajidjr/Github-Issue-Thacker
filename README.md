1. What is the difference between var, let, and const?...

Answer :
* var = Function scope , Reassign allowed , Redeclare allowed..

Example : var a = 10;
          var a = 20; // allowed

* let = Block scope , Reassign allowed , Redeclare Not allowed..

Example : let b = 10;
          b = 20; // allowed
          // let b = 30; ❌ error

* const = Block scope , Reassign not allowed , Redeclare Not allowed..

Example : const c = 10;
          // c = 20; ❌ error


2. What is the spread operator (...)?
Answer :
The spread operator expands elements of an array or object.

Example : Array,,,,,,

const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];

console.log(arr2);
// [1,2,3,4,5]

Example : Object,,,,,

const user = { name: "Sajid", age: 20 };

const newUser = { ...user, city: "Dhaka" };

console.log(newUser);

3. What is the difference between map(), filter(), and forEach()?
Answer :
These are array methods used to work with array elements..

map() :
Creates a new array by transforming each ...
filter() :
Creates a new array with elements that match a condition..
forEach() :
Loops through the array but does not return anything