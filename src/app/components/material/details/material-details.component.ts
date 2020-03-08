/**
 * Created By : Vipin Yadav 
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Services
import { MaterialService } from '../../../services/materials/material.service';
import { routerTransition } from '../../../services/config/config.service';

@Component({
	selector: 'app-material-details',
	templateUrl: './material-details.component.html',
	styleUrls: ['./material-details.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})

export class MaterialDetailsComponent implements OnInit {
	index: any;
	materialDetail: any;
	constructor(private router: Router, private route: ActivatedRoute, private _materialService: MaterialService, private toastr: ToastrService) {
		// Get user detail index number sent in params
		this.route.params.subscribe(params => {
			this.index = params['id'];
			if (this.index && this.index != null && this.index !== undefined) {
				this.getMaterialDetails(this.index);
			}
		});
	}

	ngOnInit() {
	}

	// Get Material details
	getMaterialDetails(ID: string) {
		this._materialService.getMaterialDetailsById(ID).subscribe(res=>{
			if(res && !res['error']){
				this.materialDetail=res;	
			} else{
				this.router.navigate(['/'])
				this.toastr.error(res['message']);
			}
		},error=>{
			this.toastr.error();
		});
	}

}

/**
 * Created By : Vipin Yadav 
 */
