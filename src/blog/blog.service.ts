import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async getPosts(): Promise<Post[]> {
    const posts = await this.postModel.find().exec();
    return posts;
  }

  async findBySlug(slug: string): Promise<Post> {
    const post = await this.postModel.findOne({ slug });
    return post;
  }

  async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
    const newPost = await new this.postModel(createPostDTO);
    const image =
      typeof newPost.img === 'undefined'
        ? { img: '//via.placeholder.com/180' }
        : newPost.img;
    const slug = { slug: this.slugify(newPost.title) };
    Object.assign(newPost, image, slug);
    return newPost.save();
  }

  async editPost(postID, createPostDTO: CreatePostDTO): Promise<Post> {
    const editedPost = await this.postModel.findByIdAndUpdate(
      postID,
      createPostDTO,
      { new: true, useFindAndModify: false },
    );
    const slug = { slug: this.slugify(editedPost.title) };
    Object.assign(editedPost, slug);
    return editedPost.save();
  }

  async deletePost(postID): Promise<any> {
    const deletedPost = await this.postModel.findByIdAndRemove(postID, {
      useFindAndModify: false,
    });
    return deletedPost;
  }

  slugify(title: string) {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
}
