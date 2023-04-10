import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Length } from 'class-validator';

import { Thread } from './Thread';
import { ThreadItemPoint } from './ThreadItemPoint';
import { Auditable } from './Auditable';

@Entity({ name: 'ThreadItems'})
export class ThreadItem extends Auditable {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: string;

  @Column('varchar', {
    length: 2500,
    nullable: true,
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

  @ManyToOne(() => Thread, (thread: Thread) => thread.threadItems)
  thread: Thread;

  @ManyToOne(() => ThreadItemPoint, (threadItemPoint: ThreadItemPoint) => threadItemPoint.threadItem)
  threadItemPoints: ThreadItemPoint[];
}