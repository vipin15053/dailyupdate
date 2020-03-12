/**
 * Created By : Vipin Yadav 
 */
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { ValidationService, dateFormate,routerTransition } from '../../../services/config/config.service';
import { MaterialService } from '../../../services/materials/material.service';

import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-material-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})

export class AddComponent implements OnInit {
	// create materialAddForm of type FormGroup
	materialAddForm: FormGroup;
	index: any;
	constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,private router:Router, private _materialService: MaterialService, private toastr: ToastrService) {
		// Check for route params
		this.route.params.subscribe(params => {
			this.index = params['id'];
			// check if ID exists in route & call update or add methods accordingly
			if (this.index && this.index !== null && this.index !== undefined) {
				this.createForm(null);
				this.getMaterialDetailsById(this.index);
			} else {
				this.createForm(null);
			}
		});
	}

	ngOnInit() {
	}
	// Fetch dtails of materials
	getMaterialDetailsById(ID:string){
		this._materialService.getMaterialDetailsById(ID).subscribe(res=>{
			if(res && res['error']!==true){
				res['materials'].map((item,index)=>{
					delete item._id;
					if(index!==(res['materials'].length-1)){
						this.cloneForm();
					}
				})
				this.materialAddForm.get('date').setValue((res['date'] ?(dateFormate((new Date(res['date']).toLocaleDateString()),"yyyy-MM-dd")):'' ));
				this.materialAddForm.get('materials').setValue(res['materials']);
				this.materialAddForm.get('totalPrice').setValue(res['totalPrice']);
			} else{
				this.router.navigate(['/'])
				this.toastr.error(res['message']);
			}
		});
	}
	// Submit material details form
	addORUpdate() {
		if (this.index && this.index !== null && this.index !== undefined) {
			if(this.materialAddForm.valid){
				this.updateMaterial(this.materialAddForm.value,this.index);
			}
		} else if(this.materialAddForm.valid){
			this.index = undefined;
			this.materialAddForm.value.date=dateFormate(this.materialAddForm.value.date,"yyyy/MM/dd");
			this.addMaterial(this.materialAddForm.value);
		}
	}
	// adding materials ....
	addMaterial(data){
		this._materialService.addMaterial(data).subscribe(res=>{
			if(res && !res['error']){
				this.materialAddForm.reset();
				this.toastr.success(res['message']);
			} else{
				this.toastr.error(res['message'])
			}
		},error=>{
			this.toastr.error('Failed');
		})
	}
	// update materials....
	updateMaterial(data,ID:string){
		this._materialService.updateMaterial(data,ID).subscribe(res=>{
			if(res && !res['error']){
				this.router.navigate(['/']);
				this.materialAddForm.reset();
				this.toastr.success(res['message']);
			} else{
				this.toastr.error(res['message'])
			}
		},error=>{
			this.toastr.error('Update Failed');
		})	
	}
	
	get materials(): FormArray {
		return this.materialAddForm.get("materials") as FormArray;
	}
	// calculate total price of materials.............
	getTotalPrice(){
		const priceArray=this.materialAddForm.value;
			let total=0;
			priceArray.materials.map(obj=>{
				total+=obj.price;
			});
			this.materialAddForm.get('totalPrice').setValue(total);
	}

	// create material item...........
	creatematerialItem() {
		return this.formBuilder.group({
			materialName: [
				"",
				[
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(100)
				]
			],
			price: ["", [Validators.required, ValidationService.checkLimit(1, 5000)]]
		});
	} 
	// adding material items in form..........
	cloneForm(){
		this.materials.push(this.creatematerialItem())
	}
	// removing cloning element......
	removeCloneForm(index:number){
		this.materials.removeAt(index);
		this.getTotalPrice();
		console.log(this.materialAddForm)
	}
	// If this is update request then auto fill form
	createForm(data) {
		if (data === null) {
			this.materialAddForm = this.formBuilder.group({
				date: ['', [Validators.required]],
				materials:this.formBuilder.array([this.creatematerialItem()]),
				totalPrice:[0,[Validators.required]]
			});
		} 
	}
}

/**
 * Created By : Vipin Yadav 
 */