import { LibraryDTO } from "../../dto";

export class LibraryResource {
    public constructor(
        public readonly data: LibraryDTO,
    ) {}
}