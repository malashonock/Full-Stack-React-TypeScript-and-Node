import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ThreadComment } from './ThreadComment';
import { User } from './User';
import { Auditable } from './Auditable';

@Entity({ name: 'ThreadCommentPoints' })
export class ThreadCommentPoint extends Auditable {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: string;

  @ManyToOne(() => User, (user: User) => user.commentPoints)
  user: User;

  @ManyToOne(() => ThreadComment, (comment: ThreadComment) => comment.points)
  comment: ThreadComment;

  @Column('boolean', {
    default: false,
    nullable: false,
  })
  isDecrement: boolean;
}