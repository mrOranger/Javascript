import { ExceptionMessage } from "./exception-message.interface";

export class NotImplementedException extends Error {

    public constructor(
        public readonly code: number = 500,
        public override readonly message: string = "Not implemented",
    ) {
        super(message);
    }

    public override toString(): ExceptionMessage {
        return {
            code: this.code, message: this.message
        };
    }
}