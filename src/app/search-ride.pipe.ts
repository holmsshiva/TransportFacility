import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchRide'
})
export class SearchRidePipe implements PipeTransform {

  	transform(items: any[], searchText: string): any[] {
    
	    if(!items) return [];

	    if(!searchText) return items;
		
		searchText = searchText.toLowerCase();
		return items.filter( it => {
      		//return it.pickupTime.toLowerCase().includes(searchText);
      		return it.toLowerCase().includes(searchText);
    	});
   	}

}
