import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Length } from 'class-validator';

import { User } from './User';
import { ThreadItem } from './ThreadItem';
import { ThreadPoint } from './ThreadPoint';
import { ThreadCategory } from './ThreadCategory';
import { Auditable } from './Auditable';

@Entity({ name: 'Threads' })
export class Thread extends Auditable {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: string;

  @Column('varchar', {
    length: 150,
    nullable: false,
  })
  @Length(5, 150)
  title: string;

  @Column('varchar', {
    length: 2500,
    nullable: false,
  })
  @Length(10, 2500)
  body: string;

  @Column('int', {
    default: 0,
    nullable: false,
  })
  viewsCount: number;

  @Column('boolean', {
    default: false,
    nullable: false,
  })
  isDisabled: boolean;

  @ManyToOne(() => User, (user: User) => user.threads)
  user: User;

  @OneToMany(() => ThreadItem, (threadItem: ThreadItem) => threadItem.thread)
  threadItems: ThreadItem[];

  @OneToMany(() => ThreadPoint, (threadPoint: ThreadPoint) => threadPoint.thread)
  threadPoints: ThreadPoint[];

  @ManyToOne(() => ThreadCategory, (category: ThreadCategory) => category.threads)
  category: ThreadCategory;
}