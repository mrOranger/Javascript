import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Book } from './book.model';
import { Library } from './library.model';

@Entity({ name: 'copies' })
export class Copy {
      @PrimaryColumn('uuid') public id: string;

      @Column('datetime', { name: 'release_date' }) public releaseDate: Date;

      @Column('integer', { name: 'version' }) public version: number;

      @ManyToOne(() => Book, (book) => book.isbn, { onDelete: 'CASCADE' })
      @JoinColumn({ name: 'book_id' })
      public book?: Book;

      @ManyToOne(() => Library, (library) => library.id, { onDelete: 'CASCADE' })
      @JoinColumn({ name: 'library_id' })
      public library?: Library;

      public constructor(id: string, releaseDate: Date, version: number, book?: Book, library?: Library) {
            this.id = id;
            this.book = book;
            this.library = library;
            this.version = version;
            this.releaseDate = releaseDate;
      }
}
