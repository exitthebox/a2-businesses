import {Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import {Business} from '../business';
import {Category} from '../category';


@Injectable()
export class FirebaseService{
	businesses: FirebaseListObservable<Business[]>;
	categories: FirebaseListObservable<Category[]>;

	constructor(private _af: AngularFire){

	}

	getBusinesses(category: string = null){
		if(category != null){//this filters the shown records by category
			this.businesses = this._af.database.list('/businesses', {
				query: {
					orderByChild: 'category', 
					equalTo: category}
			}) as FirebaseListObservable<Business[]>;
		} else {
			this.businesses = this._af.database.list('/businesses') as FirebaseListObservable<Business[]>;
		}

		return this.businesses;
	}

	getCategories(){
		this.categories = this._af.database.list('/categories') as FirebaseListObservable<Category[]>;
		return this.categories;
	}

	addBusiness(newBusiness){
		return this.businesses.push(newBusiness);//firebase method of inserting is using push()
	}

	updateBusiness(key, updBusiness){
		return this.businesses.update(key, updBusiness);
	}

	deleteBusiness(key){
		return this.businesses.remove(key);//firebase method of deleting is using remove()
	}
}

