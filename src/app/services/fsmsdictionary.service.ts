import {Injectable} from '@angular/core';
import {LocalStorageKeys} from './local-storage.service';
import {DictionaryItem} from '../models/dictionaryItem';
import {DictionaryVersion} from '../models/dictionaryVersion';
import {Observable, of, Subject} from 'rxjs';
import {Result} from '../models/result';
import {Dictionary} from '../models/dictionary';
import {v4 as uuidv4} from 'uuid';

@Injectable({
	providedIn: 'root'
})
export class FSMSDictionaryService {

	constructor() {
	}

	dictionaryListUpdate$ = new Subject();

	get dictionaryUpdateStream() {
		return this.dictionaryListUpdate$.asObservable();
	}


	getDictionaryList(): Observable<Result<Dictionary>> {
		let dictionaries = this.getData(LocalStorageKeys.Dictionaries)?.dictionary as Dictionary[];
		dictionaries = dictionaries.map(category => Object.assign(new Dictionary(), category));
		const result = new Result<Dictionary>(dictionaries, dictionaries.length, 'success');
		return of(result);
	}

	getDictionaryItemsList(categoryCode: string): Observable<Result<DictionaryItem>> {
		let dictionaryItems = this.getData(LocalStorageKeys.DictionaryList).dictionary_item as DictionaryItem[];
		dictionaryItems = dictionaryItems.map(dictionary => Object.assign(new DictionaryItem(), dictionary));

		const dictResult = dictionaryItems.filter(dict => dict.dictionary_code === categoryCode);
		const result = new Result<DictionaryItem>(dictResult, dictResult.length, 'success');
		return of(result);
	}

	getData(key: LocalStorageKeys) {
		return JSON.parse(window.localStorage.getItem(key));
	}

	setData(storageKey: LocalStorageKeys, data): void {
		const localStorageData = {};
		if (storageKey === LocalStorageKeys.Dictionaries) {
			localStorageData.dictionary = data;
		} else if (storageKey === LocalStorageKeys.DictionaryVersions) {
			localStorageData.dictionary_version = data;
		} else {
			localStorageData.dictionary_item = data;
		}
		window.localStorage.setItem(storageKey, JSON.stringify(localStorageData));
	}

	addVersion(newVersion: DictionaryVersion): void {
		const versions = this.getData(LocalStorageKeys.DictionaryVersions).dictionary_version as DictionaryVersion[];
		versions.push(newVersion);
		this.setData(LocalStorageKeys.DictionaryVersions, versions);
	}

	updateVersion(dictionary: Dictionary): void {
		const versions = this.getData(LocalStorageKeys.DictionaryVersions).dictionary_version as DictionaryVersion[];
		let newVersionNum = 0;
		let oldVersion: DictionaryVersion;

		const index = versions.findIndex((ver) => ver.dictionary_id === dictionary.id && !ver.end_date);
		newVersionNum = versions[index].version_number + 1;
		oldVersion = versions[index];
		const endDate = new Date();
		endDate.setHours(0, 0, 0, 0);
		endDate.setSeconds(endDate.getSeconds() - 1);
		versions[index].end_date = endDate;

		const newVersion =
			new DictionaryVersion(uuidv4(),
				newVersionNum,
				new Date(),
				null,
				dictionary.id,
				dictionary.code
			);
		versions.push(newVersion);
		console.log('старая версия:', oldVersion);
		console.log('новая версия:', newVersion);
		this.setData(LocalStorageKeys.DictionaryVersions, versions);
	}

	updateDictionaryItem(editedDictionaryItem: DictionaryItem): Observable<Result<any>> {
		const dictionaryList = this.getData(LocalStorageKeys.DictionaryList).dictionary_item as DictionaryItem[];
		const index = dictionaryList.findIndex((dict) => editedDictionaryItem.id === dict.id);
		dictionaryList[index] = editedDictionaryItem;
		console.log('измененные данные справочника dictionaryItem:', editedDictionaryItem);
		this.setData(LocalStorageKeys.DictionaryList, dictionaryList);
		const result = new Result<any>([], 0, 'success');
		return of(result);
	}

	updateDictionary(editedDictionary: Dictionary): Observable<Result<any>> {
		const dictionaryList = this.getData(LocalStorageKeys.Dictionaries).dictionary as Dictionary[];
		const index = dictionaryList.findIndex((dict) => editedDictionary.id === dict.id);
		dictionaryList[index] = editedDictionary;
		console.log('изменненный справочник:', editedDictionary);
		this.updateVersion(editedDictionary);
		this.setData(LocalStorageKeys.DictionaryList, dictionaryList);
		const result = new Result<any>([], 0, 'success', null, 'справочник изменен успешно, проверьте консоль');
		this.dictionaryListUpdate$.next();
		return of(result);
	}

	addDictionary(newDictionary: Dictionary): Observable<Result<any>> {
		newDictionary.id = uuidv4();
		const dictionaryList = this.getData(LocalStorageKeys.Dictionaries).dictionary as Dictionary[];
		let result: Result<any>;
		if (!dictionaryList.find(dict => dict.code === newDictionary.code)) {
			dictionaryList.push(newDictionary);
			console.log('Новый справочник:', newDictionary);
			this.setData(LocalStorageKeys.Dictionaries, dictionaryList);
			result = new Result<any>([], 0, 'success', null, 'справочкик создан успешно, проверьте консоль');
			this.dictionaryListUpdate$.next();

			const newVersion = new DictionaryVersion(uuidv4(), 1, new Date(), null, newDictionary.id, newDictionary.code);
			console.log('Также создана первая версия для нового справочника:', newVersion);
			this.addVersion(newVersion);
		} else {
			result = new Result([], 0, 'error', 'Код не уникален');
		}

		return of(result);
	}
}
