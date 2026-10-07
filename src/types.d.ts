import { Connection } from "mongoose";

declare global {

    // mongoose global variable to store the connection
    var mongoose: {
        conn: Connection | null,
        promise: Promise<Connection> | null,
    }

}

export { };