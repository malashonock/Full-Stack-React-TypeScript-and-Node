import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Thread } from './Thread';
import { User } from './User';
import { Auditable } from './Auditable';

@Entity({ name: 'ThreadPoints' })
export class ThreadPoint extends Auditable {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: string;

  @ManyToOne(() => User, (user: User) => user.threadPoints)
  user: User;

  @ManyToOne(() => Thread, (thread: Thread) => thread.threadPoints)
  thread: Thread;

  @Column('boolean', {
    default: false,
    nullable: false,
  })
  isDecrement: boolean;
}