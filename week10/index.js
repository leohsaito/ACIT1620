// function bark(dogName, dogWeight) {
//     if (dogWeight > 20) {
//         console.log(dogName + " says WOOF WOOF");
//     }
//     else {
//         console.log(dogName + " says woof woof");
//     }
// }

// bark("Leo", 20)
// bark("Que Mira Bobo", 15)
// bark("Gold", 25)
// bark("Oldhead", 50)

// let x = 32;
// let y = 44;
// let radius = 5;
// let centerX = 0;
// let centerY = 0;
// let width = 600;
// let height = 400;

// function setup(width, height) {
//     centerX = width / 2;
//     centerY = height / 2;
// }

// function computeDistance(x1, y1, x2, y2) {
//     let dx = x1 - x2;
//     let dy = y1 - y2;
//     let d2 = (dx * dx) + (dy * dy);
//     let d = Math.sqrt(d2);
//     return d;
// }

// function circleArea(r) {
//     let area = Math.PI * r * r;
//     return area
// }

// setup(width, height);
// let area = circleArea(radius);
// let distance = computeDistance(x, y, centerX, centerY);
// alert("Area: " + area);
// alert("Distance: " + distance);


// let scores = [
//     60, 50, 60, 58, 54, 54,
//     58, 50, 52, 54, 48, 69,
//     34, 55, 51, 52, 44, 51,
//     69, 64, 66, 55, 52, 61,
//     46, 31, 57, 52, 44, 18,
//     41, 53, 55, 61, 51, 44
// ];

// let i = 0;
// let largest = 0;

// while (i < scores.length) {
//     console.log("Bubble solution #" + i + " score: " + scores[i]);
//     if (scores[i] > largest) { 
//         largest = scores[i];
//     }
//     i += 1;
// }

// console.log("Bubble tests: " + scores.length);
// console.log("Highest bubble score: " + largest);

// let bestSolutions = [];
// for (let i = 0; i < scores.length; i++) {
//     if (scores[i] == highScore) {
//         bestSolutions.push(i);
//     }
// }

// console.log("Solutions with the highest score: " + bestSolutions);

// let numbers = new Array(1, 2, 3, 4, 5);
// console.log(numbers); // [1, 2, 3, 4, 5]

// let values = new Array(5);
// console.log(values); // EMPTY LIST of 5 values

// let arr = Array.of(5);
// console.log(arr); // [5]

// let arr = [1, 2, 3];
// arr.push(4);
// console.log(arr); // [1, 2, 3, 4]

// arr.pop();
// console.log(arr); // [1, 2, 3]

// arr.unshift(0);
// console.log(arr); // [0, 1, 2, 3]

// arr.shift();
// console.log(arr); // [1, 2, 3]

// console.log(arr.indexOf(2)); // 1 (index of VALUE 2)
// console.log(arr.indexOf(7)); // -1 (not found)

// console.log(arr.lastIndexOf(2)); // 1 (last index of VALUE 2)

// console.log(arr.includes(1)); // true
// console.log(arr.includes(10)); // false

// arr.splice(2, 1, 10, 20); // [1, 2, 10, 20]
// arr.splice(2, 0, 10, 20); // [1, 2, 10, 20, 3]
// console.log(arr);

// let sliced = arr.sliceOf(1, 4); // [2, 10, 20] last value is EXCLUDED
// console.log(arr);

// let arr1 = [1, 2, 3];
// let arr2 = [4, 5, 6];

// let combined = arr1.concat(arr2);
// console.log(combined); // [1, 2, 3, 4, 5, 6]

// let words = ["Hello", "world!"];
// console.log(words.join(" ")); // "Hello world!"

// let sentence = "Javascript is fun";
// let wordsArray = sentence.split(" "); // ["Javascript", "is", "fun"]
// console.log(wordsArray);

// function add(a, b) {
//     return a + b;
// }

// console.log(add(2, 3));

// let add_arrow = (a, b) => a + b;

// let multiply = (a, b) => {
//     console.log(`Multiplying ${a} and ${b}`); // different from normal quote
//     return a * b;
// }

// console.log(multiply(4, 5)); // 20

// const square = x => x * x;
// console.log(square(6)); // 36

// const greet = () => "Hello World!";
// console.log(greet());

let access = document.getElementById("code9");
let code = access.innerHTML;
code += " midnight";
alert(code);