import { mongoose } from 'mongoose';

export const dbConnect = () => {
  try {
    mongoose.connect('mongodb://localhost:27017/korria-cms', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('connected to db');
  } catch (error) {
    console.error(error);
  }
  process.on('unhandledRejection', (error) => {
    console.log('unhandledRejection', error.message);
  });
};
