import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import { IUser, IUserSearchData, Users } from '../../../entities/User';

import { paramMissingError } from '@shared/constants';

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/**
 * Login if the user and password are corrects
 *
 * @param req
 * @param res
 */
export async function login(req: Request, res: Response) {
	
	// const { sessionID } = req.cookies;
	//
	//
	// console.log(req.cookies);
	return res.render('index.ejs');
}

/**
 * Get all users.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getAllUsers(req: Request, res: Response) {
	return res.render('messanger/Messages.ejs');
}

/**
 * find user based in hist name or email
 * @param user
 */
function _findUserByNameOrEmail(user: IUserSearchData) {
	return Users.findOne({ $or: [{ nome: user.nome }, { email: user.email }] });
}

/**
 * Middleware to validate if a username and email are availible
 * @param req
 * @param res
 * @param next
 */
async function _isUserAvailible(req: Request, res: Response) {
	const { nome, email } = req.body;
	const user = await _findUserByNameOrEmail({ nome, email });
	if (user) {
		res.status(403);
		throw Error('Usuário já cadastrado');
	}
}

/**
 * Add one user.
 *
 * @param req
 * @param res
 * @returns
 */
async function _addOneUser(req: Request, res: Response) {
	const { nome, email, senha } = req.body;
	
	const { id } = await Users.create({ nome, email, senha });
	return res.redirect('/');
}

export async function createUser(req: Request, res: Response) {
	try {
		await _isUserAvailible(req, res);
		await _addOneUser(req, res);
	} catch (error: any) {
		return res.json({ message: error.message });
	}
}

/**
 * Update one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function updateOneUser(req: Request, res: Response) {

}

/**
 * Return signin page form
 * @param req
 * @param res
 */

export async function signIn(req: Request, res: Response) {
	return res.render('./signin/signIn.ejs');
}

/**
 * Delete one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function deleteOneUser(req: Request, res: Response) {

}
