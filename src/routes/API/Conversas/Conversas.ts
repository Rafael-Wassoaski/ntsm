import { Request, Response } from 'express';
import { Mensagens } from '../../../entities/Mensagem';
import { Conversas, IConversa } from '../../../entities/Conversa';

export async function listarConversas(req: Request, res: Response) {
	const { user } = req.session;
	
	return res.render('./messanger/Messages.ejs', {contatos: user.contatos });
}

function _getConversasByUserId(userId: String) {
	return Conversas.find({ usuarios: {$in: [userId]}}).lean();
}

export async function iniciarConversa(req: Request, res: Response) {
	const { user } = req.session;
	const { userId } = req.params;
	
	let conversation = await getConversation(user, userId);
	
	if (!conversation) {
		const users = [user.id, userId];
		
		conversation = await Conversas.create({ usuarios: users, mensagens: [] });
	}
	
	return res.render('./messanger/Messages.ejs', { conversation ,contatos: user.contatos });
}

async function getConversation(user1: string, user2: string): Promise<IConversa> {
	return Conversas.findOne({ users: { $in: [user1, user2] } }).lean();
}

export async function newMessage(req: Request, res: Response): Promise<Response> {
	const { user: remetente } = req.session;
	const { userId: destinatario } = req.params;
	const { mensagem } = req.body;
	
	const conversation = await getConversation(remetente, destinatario);
	
	if (conversation) {
		const newMessage = await Mensagens.create({ remetente, destinatario, mensagem });
		
		await Conversas.updateOne({ _id: conversation.id }, { push: { mensagens: newMessage } });
		
		return res.json(newMessage);
	}
	
	res.status(404);
	return res.send();
}
