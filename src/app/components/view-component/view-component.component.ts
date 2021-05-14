import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Share} from '../../decorators/share';

@Component({
	selector: 'app-view-component',
	templateUrl: './view-component.component.html',
	styleUrls: ['./view-component.component.css']
})
export class ViewComponentComponent implements OnInit {

	@Share('title')
	title;

	constructor() {
	}

	ngOnInit(): void {
	}

}
