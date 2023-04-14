import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class Auditable extends BaseEntity {
  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  lastModifiedOn: Date;
}