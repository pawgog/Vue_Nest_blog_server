import { Document } from 'mongoose';

export interface Post extends Document {
  readonly title: string;
  readonly content: string;
  readonly slug: string;
  readonly author: string;
  readonly img: string;
  readonly date_posted: string;
}
