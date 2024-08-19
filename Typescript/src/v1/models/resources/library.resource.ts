import { Library } from "../library.model";

export class LibraryResource {
    public constructor(
        public readonly data: Library,
    ) {}
}