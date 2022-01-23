import { Request, Response } from 'express';
import { Mensagens } from '../../../entities/Mensagem';
import { Conversas, IConversa } from '../../../entities/Conversa';
import mongoose from 'mongoose';

export async function listarConversas(req: Request, res: Response) {
	const { user } = req.session;
	const { userId } = req.params;
	let conversation = await getConversation(user, userId);

	if (mongoose.isValidObjectId(userId)) {
		if (!conversation) {
			const users = [user._id, userId];
			conversation = await Conversas.create({ usuarios: users, mensagens: [] });
		}
	}
	
	return res.render('./messanger/Messages.ejs', { conversation, contatos: user.contatos });
}

function _getConversasByUserId(userId: String) {
	return Conversas.find({ usuarios: { $in: [userId] } }).lean();
}

async function getConversation(user1: string, user2: string): Promise<IConversa> {
	const conversation = await Conversas.findOne({ users: { $in: [user1, user2] } }).lean();
	conversation.id = conversation._id || conversation.id;
	
	return conversation
}

export async function newMessage(req: Request, res: Response): Promise<Response> {
	const { user } = req.session;
	const { userId: destinatario } = req.params;
	const { mensagem } = req.body;
	const conversation = await getConversation(user._id, destinatario);

	if (conversation) {
		const newMessage = await Mensagens.create({ remetente: user._id, destinatario, mensagem });
console.log(conversation);
		const a = await Conversas.updateOne({ _id: conversation.id }, { $push: { mensagens: newMessage._id } });
		console.log(a);
		return res.json(newMessage);
	}

	res.status(404);
	return res.send();
}
