
/*  data Encoder/Decoder  */
export default class Codec {
    constructor (options = {}) {
        this.options = {
            type: "JSON",
            ...options
        }
        if (this.options.type !== "JSON")
            throw new Error("unsupported encoding type")
    }
    encode (data) {
        if (this.options.type === "JSON")
            return JSON.stringify(data)
    }
    decode (data) {
        if (this.options.type === "JSON")
            return JSON.parse(data)
    }
}

