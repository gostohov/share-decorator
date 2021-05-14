import {Component, OnInit} from '@angular/core';
import {Share} from '../../decorators/share';

@Component({
	selector: 'app-input-component',
	templateUrl: './input-component.component.html',
	styleUrls: ['./input-component.component.css']
})
export class InputComponentComponent implements OnInit {

	@Share('title')
	title;

	constructor() {
	}

	ngOnInit(): void {
	}

}
