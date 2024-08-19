import { Book } from "../book.model";

export class BookCollection {
    public constructor(
        public readonly data: Array<Book>,
    ) {}
}