import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from './category.orm';
import { Subcategory } from './subcategory.orm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => Category, (category) => category.posts)
  category: Category;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.posts, {
    nullable: true,
  })
  subcategory: Subcategory;
}
