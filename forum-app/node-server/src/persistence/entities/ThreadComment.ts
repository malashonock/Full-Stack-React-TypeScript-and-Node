import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Length } from 'class-validator';

import { Thread } from './Thread';
import { ThreadCommentPoint } from './ThreadCommentPoint';
import { Auditable } from './Auditable';

@Entity({ name: 'ThreadComments'})
export class ThreadComment extends Auditable {
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

  @ManyToOne(() => Thread, (thread: Thread) => thread.comments)
  thread: Thread;

  @ManyToOne(() => ThreadCommentPoint, (point: ThreadCommentPoint) => point.comment)
  points: ThreadCommentPoint[];
}