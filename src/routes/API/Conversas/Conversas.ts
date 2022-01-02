import { Request, Response } from "express";
import { Mensagens } from '../../../entities/Mensagem';


export async function listarConversas(req: Request, res: Response){
    const {user} = req.session;
    const conversas = await _getConversasByUserId(user._id);
    
    return res.render('./messanger/Messages.ejs', {conversas, contatos: user.contatos});
}

function _getConversasByUserId(userId: String){
    return Mensagens.find({remetente: userId}).lean();
}

export async function iniciarConversa(req: Request, res: Response){

}
