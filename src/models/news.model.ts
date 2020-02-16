import mongoose from 'mongoose';

export const NewsSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    link: String
  },
  { versionKey: false }
);

NewsSchema.set('toJSON', {
  transform: function(doc: any, ret: any, options: any) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export const News = mongoose.model('News', NewsSchema);
