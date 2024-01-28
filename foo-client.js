
/*  domain-specific (stub) module  */
export default class Foo {
    /*  RPC injection point  */
    static rpc = null

    /*  RPC client-side method stubs  */
    async echo (...args) { return Foo.rpc?.request("foo.echo", ...args) }
    async todo (...args) { return Foo.rpc?.request("foo.todo", ...args) }
}

