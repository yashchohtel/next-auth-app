import { Connection } from "mongoose";

// global type for mongoose connection
declare global {

    // mongoose global variable to store the connection
    var mongoose: {
        conn: Connection | null,
        promise: Promise<Connection> | null,
    }

}

export { };