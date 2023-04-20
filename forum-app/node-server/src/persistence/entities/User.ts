import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Thread } from './Thread';
import { ThreadPoint } from './ThreadPoint';
import { ThreadCommentPoint } from './ThreadCommentPoint';
import { Auditable } from './Auditable';
import { ThreadComment } from './ThreadComment';

@Entity({ name: 'Users' })
export class User extends Auditable {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: string;

  @Column('varchar', {
    length: 60,
    unique: true,
    nullable: false,
  })
  userName: string;

  @Column('varchar', {
    length: 120,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column('varchar', {
    length: 100,
    nullable: false,
  })
  password: string;

  @Column('boolean', {
    default: false,
    nullable: false,
  })
  isConfirmed: boolean;

  @Column('boolean', {
    default: false,
    nullable: false,
  })
  isDisabled: boolean;

  @OneToMany(() => Thread, (thread: Thread) => thread.user)
  threads: Thread[];

  @OneToMany(() => ThreadComment, (comment: ThreadComment) => comment.user)
  comments: ThreadComment[];

  @OneToMany(() => ThreadPoint, (threadPoint: ThreadPoint) => threadPoint.user)
  threadPoints: ThreadPoint[];

  @OneToMany(() => ThreadCommentPoint, (commentPoint: ThreadCommentPoint) => commentPoint.user)
  commentPoints: ThreadCommentPoint[];
}