import * as mongoose from 'mongoose';
import dataBaseConnection from '../../DataBaseConnection';
import { IUser } from '@entities/User';
import { IMensagem } from '../interfaces/Mensagem';

const Conversa = new mongoose.Schema({
	usuarios: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'users'
	},
	mensagens: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'mensagens'
	}
});

export interface IConversa {
	users: [IUser],
	mensagens: [IMensagem]
}

export const Conversas = dataBaseConnection.model('conversas', Conversa);
