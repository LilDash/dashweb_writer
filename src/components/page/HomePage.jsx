import * as React from 'react';
import ArticleForm from '../ArticleForm/ArticleForm';


import PropTypes from 'prop-types';

export class HomePage extends React.Component {
	render() {

		return (
			
			<div className='home-page'>
				<ArticleForm />
			</div>
		);
  	}
}

HomePage.propTypes = {
	
};

HomePage.defaultProps = {
};