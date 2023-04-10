import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Thread } from './Thread';
import { Auditable } from './Auditable';

@Entity({ name: 'ThreadCategories' })
export class ThreadCategory extends Auditable {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: string;

  @Column('varchar', {
    length: 100,
    unique: true,
    nullable: false,
  })
  name: string;

  @Column('varchar', {
    length: 150,
    nullable: true,
  })
  description: string;

  @OneToMany(() => Thread, (thread: Thread) => thread.category)
  threads: Thread[];
}