import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FSMSDictionaryService} from '../../../services/fsmsdictionary.service';
import {Subscription} from 'rxjs';
import {DictionaryItem} from '../../../models/dictionaryItem';

@Component({
	selector: 'app-dictionary-data-table-item',
	templateUrl: './dictionary-data-table-item.component.html',
	styleUrls: ['./dictionary-data-table-item.component.scss']
})
export class DictionaryDataTableItemComponent implements OnInit, OnDestroy {

	constructor() {
	}

	@Input()
	dictionaryItem: DictionaryItem;

	versionsSub: Subscription;

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		if (this.versionsSub) {
			this.versionsSub.unsubscribe();
		}
	}
}
