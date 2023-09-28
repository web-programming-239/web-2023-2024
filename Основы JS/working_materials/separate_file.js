console.log("Hello, JS!")

function ClassWithoutNew() {
    return {
        field1: "test",
        __proto__: ClassWithoutNew.prototype
    }
}

ClassWithoutNew.prototype.testMethod = function () {
    console.log(this.field1)
}

function MyObect () {
    this.field1 = "test"
}

MyObect.prototype.testMethod = function () {
    console.log(this.field1)
}

const o1 = MyObect()
const o2 = new MyObect()
const o3 = ClassWithoutNew()

// почему не 
function ClassWithhoutProto() {
    return {
        field1:"test2",
        testMethod() {
            console.log(this.field1)
        }
    }
}

const o4 = ClassWithhoutProto()
const o5 = ClassWithhoutProto()

const o6 = new MyObect()
const o7 = new MyObect()

console.log(o5.testMethod === o4.testMethod)
console.log(o6.testMethod === o7.testMethod)


// наследование

function Parent() {
    this.parentField = "parent"
}

Parent.prototype = {
    parentMethod() {
        console.log("parent")
    }
}

function Child() {
    // обычно здесь есть строчка super()
    this.childField = "child"
}

Child.prototype = {
    childMethod() {
        console.log("child")
    }
}

const child = new Child()
