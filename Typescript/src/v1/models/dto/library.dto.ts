import { Copy } from "../copy.model";

export class LibraryDTO {
      public constructor(
            public name: string,
            public location: string,
            public id?: string,
            public copies?: Array<Copy>,
      ) {}
}
