import {DictionaryVersion} from './dictionaryVersion';

export class DictionaryItem {
	id: string; // Идентификатор справочника
	parent_id: string; /// Ссылка на родительский справочник
	code: string; // Код элемента
	name_kk: string; // Наименование на казахском
	name_ru: string; // Наименование на русском
	name_en: string; // Наименование на английском
	begin_version: number; // Начало действия с версии
	end_version: number; // Окончание действия с версии
	dictionary_code: string; // Код справочника
	note: string; 	// Описание
}
