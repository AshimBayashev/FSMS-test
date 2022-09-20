import {Component, Input, OnInit} from '@angular/core';
import {Dictionary} from '../../../models/dictionary';
import {FSMSDictionaryService} from '../../../services/fsmsdictionary.service';
import {Subscription} from 'rxjs';
import {BsModalService} from 'ngx-bootstrap/modal';
import {DialogMode, DictionaryDialogComponent} from '../../modal-components/dictionary-dialog/dictionary-dialog.component';

@Component({
	selector: 'app-dictionary-table-item',
	templateUrl: './dictionary-table-item.component.html',
	styleUrls: ['./dictionary-table-item.component.scss']
})
export class DictionaryTableItemComponent implements OnInit {

	@Input()
	dictionary: Dictionary;

	subscription: Subscription;

	constructor(
		private dictionaryService: FSMSDictionaryService,
		private modalService: BsModalService) {
	}

	get DialogModes() {
		return DialogMode;
	}

	ngOnInit(): void {
	}

	expandCollapse(isExpanded: boolean) {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
		if (!isExpanded) {
			this.subscription = this.dictionaryService.getDictionaryItemsList(this.dictionary.code)
				.subscribe(res => this.dictionary.dictionaryItemsList = res.data);
		}
		this.dictionary.isExpanded = !this.dictionary.isExpanded;
	}

	openModal(dialogMode: DialogMode) {
		const initialState = {
			mode: undefined,
			dictionary: undefined
		};

		if (dialogMode !== DialogMode.Create) {
			initialState.dictionary = this.dictionary;
		}
		initialState.mode = dialogMode;
		this.modalService.show(DictionaryDialogComponent, {class: 'modal-lg', initialState});
	}
}
