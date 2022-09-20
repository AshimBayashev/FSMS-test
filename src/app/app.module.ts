import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TreeTableModule} from 'primeng/treetable';
import {TreeNode} from 'primeng/api';
import {ButtonModule, InputTextModule, TriStateCheckboxModule} from 'primeng';
import {CheckboxModule} from 'primeng/checkbox';
import {MessageService} from 'primeng/api';
import {DictionaryTableItemComponent} from './components/table-components/category-table-item/dictionary-table-item.component';
import {DictionaryDataTableItemComponent} from './components/table-components/dictionary-data-table-item/dictionary-data-table-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TooltipModule} from 'primeng/tooltip';
import { DictionaryDialogComponent } from './components/modal-components/dictionary-dialog/dictionary-dialog.component';

@NgModule({
	declarations: [
		AppComponent,
		DictionaryTableItemComponent,
		DictionaryDataTableItemComponent,
		DictionaryDialogComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ModalModule.forRoot(),
		TreeTableModule,
		ButtonModule,
		ToastModule,
		CheckboxModule,
		FormsModule,
		TooltipModule,
		InputTextModule,
		ReactiveFormsModule,
		TriStateCheckboxModule,
	],
	providers: [MessageService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
