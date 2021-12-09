import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import { IUserSearchData, Users } from "../../../entities/User";
import * as crypto from "crypto";
import config from "config";

const {
  BAD_REQUEST,
  CREATED,
  OK,
  FORBIDDEN,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = StatusCodes;

/**
 * Login if the user and password are corrects
 *
 * @param req
 * @param res
 */
export async function login(req: Request, res: Response) {
  const { login, password } = req.body;
  const user = await _findUserByNameOrEmail({ nome: login, email: login });

  if (!user) {
    res.status(NOT_FOUND);
    return res.json({ message: "Usuário não cadastrado" });
  }

  const digestedRequestPassword = digestPassword(password);

  if (digestedRequestPassword !== user.senha) {
    res.status(FORBIDDEN);
    return res.json({ message: "Senha ou usuário incorretos" });
  }

  delete user.password;
  res.status(OK);
  return res.json(user);
}

/**
 * Get all users.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getAllUsers(req: Request, res: Response) {
  return res.render("messanger/Messages.ejs");
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
    res.status(FORBIDDEN);
    throw Error("Usuário já cadastrado");
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
  const digestedPassword = digestPassword(senha);

  const { id } = await Users.create({ nome, email, senha: digestedPassword });
  res.status(CREATED);
  return res.end();
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
 * generate a sha512 based on the passed password
 * @param password
 */
function digestPassword(password: string): String {
  if (password) {
    const salt: string = config.get("password.sault");
    return crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
  }

  throw Error("Senha não informada");
}

/**
 * Update one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function updateOneUser(req: Request, res: Response) {}

/**
 * Delete one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function deleteOneUser(req: Request, res: Response) {}
