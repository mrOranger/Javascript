import { Book } from "../book.model";

export class BookResource {
    public constructor(
        public readonly data: Book,
    ) {}
}