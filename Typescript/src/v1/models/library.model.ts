import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Copy } from './copy.model';

@Entity({ name: 'libraries' })
export class Library {
      @PrimaryColumn('uuid') public id: string;

      @Column('varchar', { name: 'name' }) public name: string;

      @Column('varchar', { name: 'location' }) public location: string;

      @OneToMany(() => Copy, (copies) => copies.library, { cascade: true }) public copies?: Array<Copy>;

      public constructor(id: string, name: string, location: string, copies: Array<Copy>) {
            this.id = id;
            this.name = name;
            this.copies = copies;
            this.location = location;
      }
}
