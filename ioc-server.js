
/*  import necessary HTTP/REST libraries  */
import HAPI  from "@hapi/hapi"
import Inert from "@hapi/inert"

/*  HTTP/REST I/O communication server  */
export default class IOCServer {
    constructor (options = {}) {
        this.options = {
            type: "REST",
            host: "127.0.0.1",
            port: 12345,
            url:  "/rpc",
            ...options
        }
        if (this.options.type !== "REST")
            throw new Error("unsupported communication type")
        this.cb     = () => null
        this.server = null
    }
    async open () {
        if (this.options.type === "REST") {
            /*  establish HTTP/REST server  */
            this.server = new HAPI.server({
                host: this.options.host,
                port: this.options.port
            })
            await this.server.register(Inert)

            /*  for convenience reasons, deliver also client files  */
            this.server.route({
                method:  "GET",
                path:    "/{p*}",
                handler: { directory: { path: "." } }
            })

            /*  handle RPC calls  */
            this.server.route({
                method:  "POST",
                path:    this.options.url,
                options: { payload: { parse: false } },
                handler: async (req, h) => {
                    try {
                        /*  call registered RPC callback  */
                        const response = this.cb(req.payload)

                        /*  return JSON payload response on success  */
                        return h.response(response).type("application/json").code(200)
                    }
                    catch (err) {
                        /*  return error response on failure  */
                        return h.response(err.toString()).code(400)
                    }
                }
            })

            /*  start service  */
            await this.server.start()
        }
    }
    respond (cb) {
        this.cb = cb
    }
    async close () {
        /*  stop service  */
        await this.server.stop()
    }
}

