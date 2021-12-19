import * as mongoose from 'mongoose';
import dataBaseConnection from '../../DataBaseConnection';
import {IMensagem} from '../interfaces/Mensagem';
import { Users } from './User';

export const mensagem = new mongoose.Schema({
	remetente: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	destinatario:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	mensagem:{
		type: String
	}
});

export const Mensagens = dataBaseConnection.model('mensagens', mensagem);
