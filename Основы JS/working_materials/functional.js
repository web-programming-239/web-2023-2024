// Напишите функцию sum, которая работает таким образом: sum(a)(b) = a+b

let sum

console.log(sum(1)(2)) // 3

// Дан массив имен, напишите функцию создающую массив функций, "выкрикивающих" свои имена в консоль

let arr = ['Alex', 'Sasha', 'Sacha']

let makeSpeakers

let speakers = makeSpeakers()
speakers[0]()
speakers[2]()
speakers[1]()

// Дан массив имен, напишите функцию создающую массив функций, "выкрикивающих" свои имена в консоль

let arr1 = ['Alex', 'Sasha', 'Sacha']

let makeCats

let cats = makeCats()
speakers[0].meow()
speakers[2].meow()
speakers[1].kill()

// что тут происходит

let a = x => x => x => x

// filter