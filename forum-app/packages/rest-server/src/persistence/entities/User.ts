import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserDto } from '@shared/types';

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
  name: string;

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

  @OneToMany(() => Thread, (thread: Thread) => thread.author)
  threads: Thread[];

  @OneToMany(() => ThreadComment, (comment: ThreadComment) => comment.author)
  comments: ThreadComment[];

  @OneToMany(() => ThreadPoint, (threadPoint: ThreadPoint) => threadPoint.user)
  threadPoints: ThreadPoint[];

  @OneToMany(
    () => ThreadCommentPoint,
    (commentPoint: ThreadCommentPoint) => commentPoint.user,
  )
  commentPoints: ThreadCommentPoint[];

  toJSON(): UserDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      isConfirmed: this.isConfirmed,
      isDisabled: this.isDisabled,
      ...super.toJSON(),
    };
  }
}
