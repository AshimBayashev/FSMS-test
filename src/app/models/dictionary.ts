import {DictionaryItem} from './dictionaryItem';

export class Dictionary {
	id: string; // Идентификатор справочника
	code: string; // Код
	name_kk: string; // Наименование на казахском
	name_ru: string; // Наименование на русском
	name_en: string; // Наименование на английском
	create_date: Date; // Дата создания
	create_by: string; /// Кем создан
	update_date?: Date; // Дата обновления
	delete_date?: Date; // Дата удаления
	update_by?: string; /// Кем обновлен
	is_hierarchical: boolean; // Признак иерархического справочника
	is_common: boolean; // Признак справочника общей структуры

	// следующие поля не с сервера
	isExpanded = false; // отвечает за раскрытие в таблице
	dictionaryItemsList: DictionaryItem[]; // подгрузка листа с таблицы
}
