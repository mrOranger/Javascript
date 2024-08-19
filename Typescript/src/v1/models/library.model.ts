import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { BookLibrary } from './book-library.model';

@Entity({ name: 'libraries' })
export class Library {
      @PrimaryColumn('uuid') public id: string;
      @Column('varchar', { name: 'name' }) public name: string;
      @Column('varchar', { name: 'location' }) public location: string;
      @OneToMany(() => BookLibrary, (copies) => copies.library, { cascade: true }) public copies?: Array<BookLibrary>;
}
