import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ 'name': 'books'})
export class Book {
      @PrimaryGeneratedColumn('uuid', { name: 'isbn' })
      public isbn!: string;

      @Column('varchar', { name: 'title' })
      public title!: string;

      @Column('varchar', { name: 'description' })
      public description!: string;

      @Column('varchar', { name: 'author' })
      public author!: string;

      @Column('datetime', { name: 'release_date' })
      public releaseDate!: Date;
}
