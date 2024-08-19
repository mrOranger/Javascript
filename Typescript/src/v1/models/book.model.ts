import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { BookLibrary } from "./book-library.model";

@Entity({ name: 'books'})
export class Book {
    @PrimaryColumn('uuid') public isbn: string;
    @Column('varchar', { name: 'title' }) public title: string;
    @OneToMany(() => BookLibrary, (library) => library.book, { cascade: true }) public copies: Array<BookLibrary>;
}