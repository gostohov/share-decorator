import {Component} from '@angular/core';
import { Share } from './decorators/share';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	@Share('title')
	title;
}
