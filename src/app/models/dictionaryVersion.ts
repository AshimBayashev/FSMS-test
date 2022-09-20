export class DictionaryVersion {

	constructor(id: string, verNumber: number, beginDate: Date, endDate: Date, dictId: string, code: string, note?: string) {
		this.id = id;
		this.version_number = verNumber;
		this.begin_date = beginDate;
		this.end_date = endDate;
		this.dictionary_id = dictId;
		this.dictionary_code = code;
		if (note) {
			this.note = note;
		}
	}

	id: string; // идентификатор
	version_number: number; // Номер версии
	begin_date: Date; // Дата начала действия версии
	end_date?: Date; // Дата окончания действия версии
	dictionary_id: string; // Идентификатор справочника
	dictionary_code: string; // Код справочника
	note: string; // Описание
}
