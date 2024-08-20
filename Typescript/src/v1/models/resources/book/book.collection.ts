import { BookDTO } from "../../dto";

export class BookCollection {
    public constructor(
        public readonly data: Array<BookDTO>,
    ) {}
}