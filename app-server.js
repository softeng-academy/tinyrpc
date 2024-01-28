
/*  import technical libraries  */
import RPCServer       from "./rpc-server.js"
import IOCServer       from "./ioc-server.js"
import Codec           from "./com-codec.js"

/*  import domain-specifc module  */
import Foo             from "./foo-server.js"

/*  create RPC server-side of communication (aka "callee")  */
const rpc = new RPCServer(new IOCServer("REST"), new Codec("JSON"))
await rpc.open()

/*  instanciate and register the domain-specifc module  */
const foo = new Foo()
rpc.callee("foo.echo", foo.echo)
rpc.callee("foo.todo", foo.todo)

