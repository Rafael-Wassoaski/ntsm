import { Request, Response } from "express";
import { Mensagens } from '../../../entities/Mensagem';


export async function listarConversas(req: Request, res: Response){
    const {_id} = req.body;
    const conversas = await _getConversasByUserId(_id);
    
    return res.render('./messanger/Messages.ejs');
}

function _getConversasByUserId(userId: String){
    return Mensagens.find({remetente: userId}).lean();
}

export async function iniciarConversa(req: Request, res: Response){

}
