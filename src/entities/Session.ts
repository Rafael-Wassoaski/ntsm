import * as mongoose from 'mongoose';
import dataBaseConnection from '../../DataBaseConnection';
import { usuario } from './User';

export const session = new mongoose.Schema({
	sessionId: String,
	userId: usuario,
	isActive: {
		type: Boolean,
		default: false,
	},
});

export const Session = dataBaseConnection.model('sessions', session);
