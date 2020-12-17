import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  slug: String,
  author: String,
  img: String,
  date_posted: String,
});
