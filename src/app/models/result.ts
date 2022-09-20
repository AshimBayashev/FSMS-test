export class Result<T> {

	constructor(data: T[], total: number, status: string, errMsg?: string, msg?: string) {
		this.data = data;
		this.total = total;
		this.status = status;
		if (errMsg) {
			this.errMsg = errMsg;
		}
	}

	data: T[];
	errMsg: string;
	msg: string;
	total: number;
	status: string;
}
