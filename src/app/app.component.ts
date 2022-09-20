import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageService} from './services/local-storage.service';
import {FSMSDictionaryService} from './services/fsmsdictionary.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MessageService} from 'primeng/api';
import {Dictionary} from './models/dictionary';
import {map, tap} from 'rxjs/operators';
import {Observable, of, Subscription} from 'rxjs';
import {DialogMode, DictionaryDialogComponent} from './components/modal-components/dictionary-dialog/dictionary-dialog.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'FSMS-test';
	dataReady = false;
	selectedDictionary: string;
	dictionaryList: Dictionary[] = [];
	isDataReady = false;
	pageSub: Subscription[] = [];

	constructor(
		private localStorageService: LocalStorageService,
		private modalService: BsModalService,
		private dictionaryService: FSMSDictionaryService,
	) {
	}

	ngOnDestroy(): void {
		this.pageSub.forEach(sub => sub.unsubscribe());
	}

	ngOnInit(): void {
		this.localStorageService.initLocalStorage()
			.subscribe(_ => {
					this.pageSub.push(
						this.dictionaryService.getDictionaryList().subscribe(res => this.dictionaryList = res.data)
					);
				}
			);

		this.pageSub.push(
			this.dictionaryService.dictionaryUpdateStream
				.subscribe(_ => {
					this.dictionaryService.getDictionaryList().subscribe(res => this.dictionaryList = res.data);
				})
		);
	}

	expandCollapseCategory(category: Dictionary) {
		this.selectedDictionary = category.code;
		category.isExpanded = !category.isExpanded;
		this.pageSub.push(
			this.dictionaryService.getDictionaryItemsList(category.code).subscribe(res => category.dictionaryItemsList = res.data)
		);
	}

	openModal() {
		const initialState = {
			mode: DialogMode.Create
		};

		this.modalService.show(DictionaryDialogComponent, {class: 'modal-lg', initialState});
	}
}
