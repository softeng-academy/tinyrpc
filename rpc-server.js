
/*  RPC server-side  */
export default class RPCServer {
    constructor (ioc, codec) {
        this.name    = "TinyRPC"
        this.version = 0.1
        this.ioc     = ioc
        this.codec   = codec
        this.callees = {}
    }
    async open () {
        /*  respond to each, via I/O communication received,
            RPC from the client-side...  */
        this.ioc.respond((payload) => {
            /*  de-serialize payload into request object  */
            const request = this.codec.decode(payload)

            /*  validate request object  */
            if (!(typeof request === "object" &&
                typeof request.type === "string" &&
                request.type === `${this.name}/request` &&
                typeof request.version === "number" &&
                request.version >= this.version &&
                typeof request.operation === "string" &&
                this.callees[request.operation] !== undefined &&
                typeof request.args === "object" &&
                request.args instanceof Array))
                throw new Error("invalid RPC request")

            /*  determine domain-specific function and arguments  */
            const func = this.callees[request.operation]
            const args = request.args

            /*  call the registered domain-specific function  */
            let response
            try         { response = { data:  func(...args)  } }
            catch (err) { response = { error: err.toString() } }

            /*  wrap and serialize response object as payload  */
            return this.codec.encode({
                type:    `${this.name}/response`,
                version: this.version,
                ...response
            })
        })
        await this.ioc.open()
    }
    callee (name, callback) {
        this.callees[name] = callback
    }
    async close () {
        await this.ioc.close()
    }
}

