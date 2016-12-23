import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { Business } from './business';
import { Category } from './category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FirebaseService]
})
export class AppComponent implements OnInit{
	businesses: Business[];
	categories: Category[];
	appState: string;
	activeKey: string;//determines which company to show when they click "more"

	active_company: 			string;
	active_category: 			string;
	active_years_in_business: 	number;
	active_description: 		string;
	active_phone: 				string;
	active_email:				string;
	active_street_address:		string;
	active_city:				string;
	active_state:				string;
	active_zipcode:				string;

  constructor(private _firebaseService: FirebaseService) {
  	
  }

  ngOnInit(){
  	this._firebaseService.getBusinesses().subscribe(businesses => {
  		this.businesses = businesses;
  	});

  	this._firebaseService.getCategories().subscribe(categories => {
  		this.categories = categories;
  	});
  }

  changeState(state, key){
  		console.log('changing state to: '+state);

	if(key){
			console.log('changing key to: '+state+' -key: '+key);

		this.activeKey = key;
	}
	this.appState = state;

  }

  filterCategory(category){
  	this._firebaseService.getBusinesses(category).subscribe(businesses => {
  		this.businesses = businesses;
  		});
  }

	addBusiness(company: 	string,
		category: 			string,
		years_in_business: 	number,
		description: 		string,
		phone: 				string,
		email:				string,
		street_address:		string,
		city:				string,
		state:				string,
		zipcode:			string
		){
		var created_at = new Date().toString();
		var newBusiness = {
			company: 			company,
			category: 			category,
			years_in_business: 	years_in_business,
			description: 		description,
			phone: 				phone,
			email:				email,
			street_address:		street_address,
			city:				city,
			state:				state,
			zipcode:			zipcode,
			created_at: 		created_at
		};
		this._firebaseService.addBusiness(newBusiness);

		this.changeState('default', this.activeKey);

	}

	showEdit(business){
		this.changeState('edit', business.$key);
		this.active_company =  			business.company;
		this.active_category =  			business.category;
		this.active_years_in_business =  	business.years_in_business;
		this.active_description =  		business.description;
		this.active_phone =  				business.phone;
		this.active_email = 				business.email;
		this.active_street_address = 		business.street_address;
		this.active_city = 				business.city;
		this.active_state = 				business.state;
		this.active_zipcode = 				business.zipcode;
	}

	updateBusiness(){//no parameters because taking values from active_* properties
		var updBusiness = {
			company:this.active_company,
			category:this.active_category,
			years_in_business:this.active_years_in_business,
			description:this.active_description,
			phone:this.active_phone,
			email:this.active_email,
			street_address:this.active_street_address,
			city:this.active_city,
			state:this.active_state,
			zipcode:this.active_zipcode
		}

		this._firebaseService.updateBusiness(this.activeKey, updBusiness);

		this.changeState('default', this.activeKey);
	}

	deleteBusiness(key){
		this._firebaseService.deleteBusiness(key);

		this.changeState('default', key);
	}
}
