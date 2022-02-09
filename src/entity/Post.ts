import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamptz', { nullable: false })
  created_at: Date;

  @Column('text', { nullable: false })
  body: string;

  @Column('text', { nullable: false })
  user_id: number;
}
