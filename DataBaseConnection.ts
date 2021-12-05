import mongoose from 'mongoose';

const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoDatabase = process.env.MONGO_DB;
mongoose.connect(`mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`);

export default mongoose;
