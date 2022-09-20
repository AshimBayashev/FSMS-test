import {Component, OnInit} from '@angular/core';
import {Dictionary} from '../../../models/dictionary';
import {FSMSDictionaryService} from '../../../services/fsmsdictionary.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {MessageService} from 'primeng/api';

export enum DialogMode {
	Edit,
	View,
	Create
}

@Component({
	selector: 'app-dictionary-dialog',
	templateUrl: './dictionary-dialog.component.html',
	styleUrls: ['./dictionary-dialog.component.scss']
})
export class DictionaryDialogComponent implements OnInit {

	constructor(
		private dictionaryService: FSMSDictionaryService,
		private toastService: MessageService,
		public modal: BsModalRef,
		private fb: FormBuilder
	) {
	}

	get DialogModes() {
		return DialogMode;
	}

	get inViewMode() {
		return this.mode === DialogMode.View;
	}

	get dictionaryForm(): Dictionary {
		return this.form.getRawValue() as Dictionary;
	}

	dictionary: Dictionary;

	form = this.fb.group({
		id: [''],
		code: ['', Validators.required],
		name_kk: [''],
		name_ru: ['', Validators.required],
		name_en: [''],
		create_date: [],
		create_by: [],
		update_date: [],
		delete_date: [],
		update_by: [],
		is_hierarchical: [false],
		is_common: [false]
	});
	mode: DialogMode;

	ngOnInit(): void {
		if (this.mode === DialogMode.Create) {
			this.dictionary = new Dictionary();
		} else {
			this.form.patchValue(this.dictionary);
		}
		if (this.inViewMode) {
			this.form.disable();
		}
	}

	updateDictionary() {
		const dictionary = this.dictionaryForm;
		dictionary.update_date = new Date();
		dictionary.update_by = 'Ashim\'s Project';
		this.dictionaryService.updateDictionary(dictionary);
	}

	createDictionary() {
		const dictionary = this.dictionaryForm;
		dictionary.create_date = new Date();
		dictionary.create_by = 'Ashim\'s Project';
		this.dictionaryService.addDictionary(dictionary).subscribe(res => {
			if (res.status === 'error') {
				this.toastService.add({severity: 'error', summary: res.errMsg});
			} else if (res.status === 'success') {
				this.toastService.add({severity: 'success', summary: res.msg});
			}
		});
	}

	saveData(mode: DialogMode) {
		if (mode === DialogMode.Create) {
			this.createDictionary();
		} else {
			this.updateDictionary();
		}
	}

}
