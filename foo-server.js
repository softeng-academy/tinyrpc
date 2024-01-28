
/*  sample application core module  */
export default class Foo {
    constructor () {}

    /*  a function which simply echoes its arguments  */
    echo (...args) {
        return { echoed: args }
    }

    /*  a still not implemented function which throws an exception  */
    todo (...args) {
        throw new Error("functionality still not implemented")
    }
}

