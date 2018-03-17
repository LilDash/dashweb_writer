import * as React from 'react';
import { Config } from '../../config';
import ArticleForm from '../ArticleForm/ArticleForm';
import { CategoryService } from '../../services/CategoryService';

import PropTypes from 'prop-types';

export class HomePage extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			
		};
	}

	componentDidMount() {
		
	}

	render() {

		return (
			
			<div className='home-page'>
				<ArticleForm 
					editorServerUrl={Config.editorServerUrl}
					imageUploadUrl={Config.imageUploadUrl}
					submitEndPoint={Config.submitEndPoint}
				/>
			</div>
		);
  	}
}

HomePage.propTypes = {
	
};

HomePage.defaultProps = {
};