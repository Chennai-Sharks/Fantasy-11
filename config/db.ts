import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

type HandlerType = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const connectDB =
  (handler: HandlerType) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
      // if db connection already there, use this.
      return handler(req, res);
    }
    // Use new db connection when there is not a connection exist before.
    await mongoose.connect(process.env.DB_CONNECT as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected:`);

    return handler(req, res);
  };

export default connectDB;
