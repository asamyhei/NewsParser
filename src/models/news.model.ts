import mongoose from 'mongoose';

export const NewsSchema = new mongoose.Schema(
  {
    title: String,
    id: String,
    content: String,
    link: String,
    pubDate: String,
    origin: String,
    categories: [String]
  },
  { versionKey: false }
);

NewsSchema.set('toJSON', {
  transform: function(doc: any, ret: any, options: any) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export const News = mongoose.model('news', NewsSchema);
