import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { Thread } from './Thread';
import { User } from './User';
import { Auditable } from './Auditable';
import { VoteType } from './VoteType';

@Entity({ name: 'ThreadPoints' })
export class ThreadPoint extends Auditable {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: string;

  @ManyToOne(() => User, (user: User) => user.threadPoints)
  user: User;

  @RelationId((point: ThreadPoint) => point.user)
  userId: string;

  @ManyToOne(() => Thread, (thread: Thread) => thread.points)
  thread: Thread;

  @RelationId((point: ThreadPoint) => point.thread)
  threadId: string;

  @Column('integer', {
    default: VoteType.Upvote,
    nullable: false,
  })
  type: VoteType;
}