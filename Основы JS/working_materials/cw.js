// Напишите функцию sum, которая работает таким образом: sum(a)(b)(c) = a+b+c

let sum

console.log(sum(1)(2)(3)) // 6

// из массива arr получите массив arr1 из строк - имен объектов исходного массива, используя

let arr = [
    {name: 'MAMA', age: 30},
    {name: 'PAPA', age: 20},
    {name: 'BABA', age: 100}
]

// не забывайте про вывод
console.log() // ['MAMA', 'PAPA', 'BABA']

// отфильтруйте массив numbers, оставив в нем только кратные 3 числа

let numbers = [1, 2, 3, 4, 45, 5, 67, 7, 7, 7823, 2, 3]

console.log()


// напишите функцию createEmployee(name) создающую объект с полем name и total(его денюжки) и двумя методами (salary(salary),
// payTax(tax), getTotal())


function createEmployee(name) {}

let employee = createEmployee('test')

employee.getTotal() // 'У test 0 денег'
employee.salary(100)
employee.getTotal() // 'У test 100 денег'
employee.payTax(-10)
employee.getTotal()// 'У test 90 денег'