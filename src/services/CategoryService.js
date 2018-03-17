import { Ajax } from './utils/Ajax';
import { Config } from '../config';

var CategoryService = {

	getAll: function(callback){
		Ajax.get(Config.getAllCategoriesEndpoint, {}, callback);
    },
    
};

export { CategoryService };