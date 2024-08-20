import { Copy } from "../copy.model";

export class BookDTO {
      public constructor(
            public title: string,
            public isbn?: string,
            public copies?: Array<Copy>,
      ) {}
}
