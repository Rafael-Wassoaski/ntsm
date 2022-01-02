import { Request, Response } from "express";
import { Mensagens } from '../../../entities/Mensagem';
import * as crypto from 'crypto';
import { IConversa } from '@entities/Conversa';
import {Conversas} from '@entities/Conversa';

export async function listarConversas(req: Request, res: Response){
    const {user} = req.session;
    const conversas = await _getConversasByUserId(user._id);
    
    return res.render('./messanger/Messages.ejs', {conversas, contatos: user.contatos});
}

function _getConversasByUserId(userId: String){
    return Mensagens.find({remetente: userId}).lean();
}

export async function iniciarConversa(req: Request, res: Response){
    const {user} = req.session;
    const {userId} = req.body;
    
    const conversation = await getConversation(user, userId);
    console.log(conversation);

}

async function getConversation(user1: string, user2: string): Promise<IConversa>{
   return Conversas.findOne({users: {$in: [user1, user2]}}).lean();
}
