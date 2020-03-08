import { style } from '@angular/animations';
/**
 * Created By : Vipin Yadav 
 */

import { Directive, ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlightMaterial]'
})
export class HighlightMaterialDirective {

	constructor(private el: ElementRef) {
	}

	@HostListener('mouseenter') onMouseEnter() {
		this.highlight('gray');
	}

	@HostListener('mouseleave') onMouseLeave() {
		this.highlight(null);
	}

	private highlight(color: string) {
		this.el.nativeElement.style.backgroundColor = color;
	}

	private textColor(color:string) {
		this.el.nativeElement.style.color=color;
	}
}

/**
 * Created By : Vipin Yadav 
 */
