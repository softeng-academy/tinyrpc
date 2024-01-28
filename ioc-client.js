
/*  HTTP/REST I/O communication client  */
export default class IOCClient {
    constructor (options = {}) {
        this.options = {
            type: "REST",
            url: "/rpc",
            ...options
        }
        if (this.options.type !== "REST")
            throw new Error("unsupported communication type")
    }
    async open () {
        /*  NO-OP  */
    }
    async request (payload) {
        if (this.options.type === "REST") {
            /*  send JSON payload via HTTP to server-side  */
            const response = await fetch(this.options.url, {
                method:   "POST",
                mode:     "cors",
                cache:    "no-cache",
                redirect: "follow",
                headers:  { "Content-Type": "application/json" },
                body:     payload
            })

            /*  return response  */
            return response.text()
        }
    }
    async close () {
        /*  NO-OP  */
    }
}

