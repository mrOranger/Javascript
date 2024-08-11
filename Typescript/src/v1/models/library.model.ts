import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'libraries' })
export class Library {
      @PrimaryColumn('uuid') public id: string;
      @Column('varchar', { name: 'name' }) public name: string;
      @Column('varchar', { name: 'location' }) public location: string;
}
