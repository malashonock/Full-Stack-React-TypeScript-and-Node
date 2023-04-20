import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Length } from 'class-validator';

import { Thread } from './Thread';
import { ThreadCommentPoint } from './ThreadCommentPoint';
import { Auditable } from './Auditable';
import { User } from './User';

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
  
  @ManyToOne(() => User, (user: User) => user.comments)
  user: User;

  @RelationId((comment: ThreadComment) => comment.user)
  userId: string;

  @ManyToOne(() => Thread, (thread: Thread) => thread.comments)
  thread: Thread;
  
  @RelationId((comment: ThreadComment) => comment.thread)
  threadId: string;

  @OneToMany(() => ThreadCommentPoint, (point: ThreadCommentPoint) => point.comment)
  points: ThreadCommentPoint[];

  @Column('int', {
    default: 0,
    nullable: false,
  })
  pointsSum: number;
}