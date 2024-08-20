import { BookDTO } from "./book.dto";
import { LibraryDTO } from "./library.dto";

export class CopyDTO {
    public constructor(
        public releaseDate: Date,
        public version: number,
        public id?: string,
        public book?: BookDTO,
        public library?: LibraryDTO,
    ) {}
}