import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Copy } from './copy.model';

@Entity({ name: 'books' })
export class Book {
      @PrimaryColumn('uuid') public isbn: string;

      @Column('varchar', { name: 'title' }) public title: string;

      @OneToMany(() => Copy, (library) => library.book, { cascade: true }) public copies?: Array<Copy>;

      public constructor(isbn: string, title: string, copies?: Array<Copy>) {
            this.isbn = isbn;
            this.title = title;
            this.copies = copies;
      }
}
