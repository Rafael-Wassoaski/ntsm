
declare namespace Express {
	export interface Request {
		body: any;
		user?: import('@entities/User');
	}
}
