
/*  import domain-specific (stub) module  */
import Foo from "./foo-client.js"

/*  provide domain-specific module  */
export default class Bar {
    static async main () {
        /*  regular(!) use of domain-specific module  */
        const foo = new Foo()
        console.log(await foo.echo(true, 42, [ "baz", "quux" ]))
        foo.todo().catch((err) => console.log("ERROR:", err))
    }
}

