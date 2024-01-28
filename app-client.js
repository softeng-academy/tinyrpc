
/*  import technical libraries  */
import RPCClient from "./rpc-client.js"
import IOCClient from "./ioc-client.js"
import Codec     from "./com-codec.js"

/*  import domain-specific modules  */
import Foo       from "./foo-client.js"
import Bar       from "./bar-client.js"

/*  establish RPC client-side of communication (aka "caller")  */
const rpc = new RPCClient(new IOCClient("REST"), new Codec("JSON"))
await rpc.open()

/*  inject RPC client-side into domain-specific modules  */
Foo.rpc = rpc

/*  jump into domain-specific module  */
Bar.main()

