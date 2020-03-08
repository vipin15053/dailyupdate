
/**
 * Created By : Vipin Yadav 
 */

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// Services
import { MaterialService } from '../../../services/materials/material.service';
import { routerTransition } from '../../../services/config/config.service';

@Component({
	selector: 'app-material-list',
	templateUrl: './material-list.component.html',
	styleUrls: ['./material-list.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})

export class MaterialListComponent implements OnInit {
	materialListData:any;
	constructor(private _materialService: MaterialService, private toastr: ToastrService) { }
	// Call material list function on page load
	ngOnInit() {
		this.getmaterialList();
	}

	// Get material list from services
	getmaterialList() {
		this._materialService.getAllMaterials().subscribe(res=>{
			const materialList=res;
			if(materialList && materialList !==undefined){
				if(materialList[0]['message']){
					this.toastr.warning(materialList[0]['message']);	
					this.materialListData=[];				
				} else{
					this.materialListData= materialList;
				}
			}
		},
		error=>{
			this.toastr.error(error.error.error);
		})
	}
	// Delete a material with its id..
	deletematerial(index: string) {
		// get confirm box for confirmation
		const r = confirm('Are you sure?');
		if (r === true) {
			this._materialService.deletematerial(index).subscribe(res=>{
				const data=res;
				if(data && data!==undefined && !data['error'] ){
					this.toastr.success( data['message'] );
					this.getmaterialList();
				} else{
					this.toastr.error(data['message']);
				}
			},error=>{
				this.toastr.error(error.error.error);
			})
		}
	}
}
/**
 * Created By : Vipin Yadav 
 */
