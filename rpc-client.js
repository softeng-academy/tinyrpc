
/*  RPC client-side  */
export default class RPCClient {
    constructor (ioc, codec) {
        this.name    = "TinyRPC"
        this.version = 0.1
        this.ioc     = ioc
        this.codec   = codec
    }
    async open () {
        await this.ioc.open()
    }
    async request (operation, ...args) {
        /*  wrap call information into request object and serialize  */
        const request = this.codec.encode({
            type:    `${this.name}/request`,
            version: this.version,
            operation,
            args
        })

        /*  send RPC request to server-side via I/O communication  */
        let response = await this.ioc.request(request)

        /*  de-serialize response  */
        response = this.codec.decode(response)

        /*  validate response object  */
        if (!(typeof response === "object" &&
            typeof response.type    === "string" &&
            response.type === `${this.name}/response` &&
            typeof response.version === "number" &&
            response.version >= this.version &&
            (response.data !== undefined || response.error !== undefined)))
            throw new Error("invalid RPC response")

        /*  un-wrap response and communicate as exception or return value  */
        if (response.error !== undefined)
            throw new Error(response.error)
        else
            return response.data
    }
    async close () {
        await this.ioc.close()
    }
}

