import axios from 'axios';

var Ajax = {

	get: function(url, data, callback){
		axios.get(url, data).then(callback).catch(function(error) {
			console.error(error);
		})
    },
    
    post: function(url, data, callback){
		axios.post(url, data).then(callback).catch(function(error) {
			console.error(error);
		})
    },

    delete: function(url, data, callback){
		axios.delete(url, data).then(callback).catch(function(error) {
			console.error(error);
		})
	}
    
};

export { Ajax };