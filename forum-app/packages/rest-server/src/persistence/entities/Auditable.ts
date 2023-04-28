import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class Auditable extends BaseEntity {
  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  lastModifiedOn: Date;

  toJSON() {
    return {
      createdOn: this.createdOn.toISOString(),
      lastModifiedOn: this.lastModifiedOn.toISOString(),
    };
  }
}
