import {Injectable} from '@angular/core';
import dictionary_item from '../../assets/dictionary_item_202209071535.json';
import dictionary from '../../assets/_dictionary__202209071533.json';
import dictionary_version from '../../assets/dictionary_version_202209071535.json';
import {Observable, of} from 'rxjs';

export enum LocalStorageKeys {
	Dictionaries = 'dictionary',
	DictionaryList = 'dictionary_item',
	DictionaryVersions = 'dictionary_version'
}

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

	constructor() {
	}

	initLocalStorage(): Observable<any> {
		if (!this.localStorageExists()) {

			window.localStorage.setItem(LocalStorageKeys.Dictionaries, JSON.stringify(dictionary));
			window.localStorage.setItem(LocalStorageKeys.DictionaryList, JSON.stringify(dictionary_item));
			window.localStorage.setItem(LocalStorageKeys.DictionaryVersions, JSON.stringify(dictionary_version));
		}

		return of(true);
	}

	private localStorageExists() {
		return !!(window.localStorage.getItem(LocalStorageKeys.DictionaryVersions) &&
			window.localStorage.getItem(LocalStorageKeys.DictionaryList) &&
			window.localStorage.getItem(LocalStorageKeys.DictionaryVersions));
	}
}
