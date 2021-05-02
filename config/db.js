import mongoose from 'mongoose';

const connectDB = (handler) => async (req, res) => {
	if (mongoose.connections[0].readyState) {
		// if db connection already there, use this.
		return handler(req, res);
	}
	// Use new db connection when there is not a connection exist before.
	await mongoose.connect(process.env.DB_CONNECT, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log(`MongoDB Connected:`);

	return handler(req, res);
};

export default connectDB;
