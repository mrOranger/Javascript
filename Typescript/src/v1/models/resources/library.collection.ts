import { Library } from "../library.model";

export class LibraryCollection {
    public constructor(
        public readonly data: Array<Library>,
    ) {}
}