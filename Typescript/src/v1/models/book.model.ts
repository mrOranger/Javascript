import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'books'})
export class Book {
    @PrimaryColumn('uuid') public id: string;
    @Column('varchar', { name: 'title' }) public name: string;
}