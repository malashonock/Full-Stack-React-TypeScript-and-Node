import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Length } from 'class-validator';

import { ThreadDto } from '@shared/types';

import { User } from './User';
import { ThreadComment } from './ThreadComment';
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
  author: User;

  @RelationId((thread: Thread) => thread.author)
  authorId: string;

  @OneToMany(() => ThreadComment, (comment: ThreadComment) => comment.thread)
  comments: ThreadComment[];

  @Column('int', {
    default: 0,
    nullable: false,
  })
  commentsCount: number;

  @OneToMany(
    () => ThreadPoint,
    (threadPoint: ThreadPoint) => threadPoint.thread,
  )
  points: ThreadPoint[];

  @Column('int', {
    default: 0,
    nullable: false,
  })
  pointsSum: number;

  @ManyToOne(
    () => ThreadCategory,
    (category: ThreadCategory) => category.threads,
  )
  category: ThreadCategory;

  @RelationId((thread: Thread) => thread.category)
  categoryId: string;

  toJSON(): ThreadDto {
    return {
      id: this.id,
      author: {
        id: this.author.id,
        name: this.author.name,
      },
      category: {
        id: this.category.id,
        name: this.category.name,
      },
      title: this.title,
      body: this.body,
      viewsCount: this.viewsCount,
      commentsCount: this.commentsCount,
      pointsSum: this.pointsSum,
      isDisabled: this.isDisabled,
      ...super.toJSON(),
    };
  }
}
