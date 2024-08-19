import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { BookLibrary } from "./book-library.model";

@Entity({ name: 'books'})
export class Book {
    @PrimaryColumn('uuid') public isbn: string;
    @Column('varchar', { name: 'title' }) public name: string;
    @OneToMany(() => BookLibrary, (library) => library.book) public copies: Array<BookLibrary>;
}