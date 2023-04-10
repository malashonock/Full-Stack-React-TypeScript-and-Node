import { BaseEntity, Column } from 'typeorm';

export class Auditable extends BaseEntity {
  @Column('varchar', {
    length: 60,
    nullable: false,
    default: () => `getpgusername()`,
  })
  createdBy: string;

  @Column('varchar', {
    length: 60,
    nullable: false,
    default: () => `getpgusername()`,
  })
  lastModifiedBy: string;

  @Column('timestamp with time zone', {
    nullable: false,
    default: () => `now()`,
  })
  createdOn: Date;

  @Column('timestamp with time zone', {
    nullable: false,
    default: () => `now()`,
  })
  lastModifiedOn: Date;
}