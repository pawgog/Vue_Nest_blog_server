import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
// import { ValidateObjectId } from '../blog/shared/pipes/validate-object-id.pipes';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('posts')
  async getPosts(@Res() res) {
    const posts = await this.blogService.getPosts();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Get('/post/:slug')
  async show(@Param('slug') slug): Promise<CreatePostDTO> {
    const blog = await this.blogService.findBySlug(slug);
    if (!blog) {
      throw new NotFoundException();
    }
    return blog;
  }
}
