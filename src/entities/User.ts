import * as mongoose from 'mongoose';
import dataBaseConnection from '../../DataBaseConnection';
import { IContato } from '@entities/Contato';

export const contato = new mongoose.Schema({
	nome: String,
	email: String,
});

dataBaseConnection.model('contatos', contato);

export const usuario = new mongoose.Schema({
	nome: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	senha: {
		type: String,
		required: true,
	},
	contatos: {
		type: contato,
	},
});

export const Users = dataBaseConnection.model('users', usuario);

export interface IUser {
	id: Number
	nome: String,
	email: String,
	senha: String,
	contato: [IContato]
}

export interface IUserSearchData {
	nome: String,
	email: String
}
