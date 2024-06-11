import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    example: 'My First Post',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The content of the post',
    example: 'This is the content of my first post.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'The unique slug for the post',
    example: 'my-first-post',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    description: 'The slug of the category this post belongs to',
    example: 'technology',
  })
  @IsString()
  @IsNotEmpty()
  categorySlug: string;

  @ApiProperty({
    description: 'The slug of the subcategory this post belongs to (optional)',
    example: 'programming',
    required: false,
  })
  @IsString()
  @IsOptional()
  subCategorySlug?: string;

  userId: string;
}
