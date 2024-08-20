import { LibraryDTO } from "../../dto";

export class LibraryCollection {
    public constructor(
        public readonly data: Array<LibraryDTO>,
    ) {}
}