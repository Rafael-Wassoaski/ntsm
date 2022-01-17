import { Request, Response } from 'express';
import { Mensagens } from '../../../entities/Mensagem';
import * as crypto from 'crypto';
import { Conversas, IConversa } from '../../../entities/Conversa';

export async function listarConversas(req: Request, res: Response) {
	const { user } = req.session;
	const conversas = await _getConversasByUserId(user._id);
	
	return res.render('./messanger/Messages.ejs', { conversas, contatos: user.contatos });
}

function _getConversasByUserId(userId: String) {
	return Mensagens.find({ remetente: userId }).lean();
}

export async function iniciarConversa(req: Request, res: Response) {
	const { user } = req.session;
	const { userId } = req.params;
	
	const conversation = await getConversation(user, userId);
	console.log(conversation);
	
}

async function getConversation(user1: string, user2: string): Promise<IConversa> {
	return Conversas.findOne({ users: { $in: [user1, user2] } }).lean();
}

async function newMessage(req: Request, res: Response): Promise<Response> {
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
