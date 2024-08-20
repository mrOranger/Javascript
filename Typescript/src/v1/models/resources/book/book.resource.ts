import { BookDTO } from "../../dto";

export class BookResource {
    public constructor(
        public readonly data: BookDTO,
    ) {}
}