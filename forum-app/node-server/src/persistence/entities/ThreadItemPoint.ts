import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ThreadItem } from './ThreadItem';
import { User } from './User';
import { Auditable } from './Auditable';

@Entity({ name: 'ThreadItemPoints' })
export class ThreadItemPoint extends Auditable {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: string;

  @ManyToOne(() => User, (user: User) => user.threadItemPoints)
  user: User;

  @ManyToOne(() => ThreadItem, (threadItem: ThreadItem) => threadItem.threadItemPoints)
  threadItem: ThreadItem;

  @Column('boolean', {
    default: false,
    nullable: false,
  })
  isDecrement: boolean;
}