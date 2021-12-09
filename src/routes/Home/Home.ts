import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/**
 * Index Screen, show the user contacts and messages if loged
 * @param req
 * @param res
 */
export async function index(req: Request, res: Response){
	
	return res.render('index.ejs', {message: null});
}

/**
 * Return signin page form
 * @param req
 * @param res
 */

 export async function signIn(req: Request, res: Response) {
	return res.render('./signin/signIn.ejs');
}
