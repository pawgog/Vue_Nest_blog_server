import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from '../blog/shared/pipes/validate-object-id.pipes';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('posts')
  async getPosts(@Res() res) {
    const posts = await this.blogService.getPosts();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Post('/post')
  async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
    const newPost = await this.blogService.addPost(createPostDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been submitted successfully!',
      post: newPost,
    });
  }

  @Get('/post/:slug')
  async show(@Param('slug') slug): Promise<CreatePostDTO> {
    const blog = await this.blogService.findBySlug(slug);
    if (!blog) {
      throw new NotFoundException();
    }
    return blog;
  }

  @Put('/edit/:postID')
  async editPost(
    @Res() res,
    @Param('postID') postID: ValidateObjectId,
    @Body() createPostDTO: CreatePostDTO,
  ) {
    const editedPost = await this.blogService.editPost(postID, createPostDTO);
    if (!editedPost) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      post: editedPost,
    });
  }

  @Delete('/delete/:postID')
  async remove(@Res() res, @Param('postID') postID: ValidateObjectId) {
    const deletedPost = await this.blogService.deletePost(postID);
    if (!deletedPost) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted!',
      post: deletedPost,
    });
  }
}
