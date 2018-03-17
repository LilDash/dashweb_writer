import * as React from 'react';
import { UEditor } from '../UEditor/UEditor';
import "./article-form.scss";
import PropTypes from 'prop-types';
import EventManager from '../../services/utils/EventManager';
import { Form, Input, Radio, Select, Button, Upload, Icon, Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import { Ajax } from '../../services/utils/Ajax';
import { CategoryService } from '../../services/CategoryService';
import 'antd/dist/antd.css'; 

class ArticleFormInner extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		  titleImageList: [],
		  titleImagePreviewVisible: false,
		  titleImagePreviewImage: '',
		  categories: [],
		};
	}

	componentDidMount() {

		// To disabled submit button at the beginning.
		//this.props.form.validateFields();

		this.loadCategories();

	}
	
	handleSubmit(e) {
		e.preventDefault();
		const self = this;
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (self.state.titleImageList.length === 0){
					alert("Please upload title image");
					return;
				}
				EventManager.emit('get_editor_content', (content) => {
					const titleImageId = self.state.titleImageList[0].response[0].id;
					const data = {
						title: values.title,
						category: values.category,
						tags: values.tags,
						isPublished: values.is_published,
						isReviewed: values.is_reviewed,
						content: content,
						titleImageId: titleImageId,
					}
					
					Ajax.post(self.props.submitEndPoint, data, function(msg){
						console.log(msg);
						if (msg.status === 200) {
							if (msg.data && msg.data.success) {
								alert("success");
								window.location.reload();
							}
						}
					});
				})
			}
		});
	}

	hasErrors(fieldsError) {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	}

	handleImageCancel() { this.setState({ titleImagePreviewVisible: false }); }

	handleImagePreview(file) {
		this.setState({
			titleImagePreviewImage: file.url || file.thumbUrl,
		  	titleImagePreviewVisible: true,
		});
	}

	handleImageChange(e) {
		if (e.file.error) {
			console.error(e.file.error);
			return;
		}
		const self = this;
		if (e.file.status === 'removed'){
			Ajax.delete(e.file.response[0].delete_url, {params: {name: e.file.response[0].name}}, function(){
				console.log("Successfully remove image")
				self.setState({ titleImageList: e.fileList });
			});
		} else {
			this.setState({ titleImageList: e.fileList });
		}
		
	} 

	loadCategories() {
		const self = this;
		CategoryService.getAll(function(resp) {
			if (resp.data && resp.data.categories){
				self.setState({categories: resp.data.categories});
			}
		});
	}

	render() {
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, categoryList } = this.props.form;
		const { titleImageList, titleImagePreviewVisible, titleImagePreviewImage, categories} = this.state;
		
		const heroImageUploadButton = (
			<div>
			  <Icon type="plus" />
			  <div className="ant-upload-text">Upload</div>
			</div>
		);

		return (
			
			<Form className='form' onSubmit={this.handleSubmit.bind(this)}>
				<FormItem>
					{getFieldDecorator('title', {
						rules: [{
							required: true, message: 'Please input title',
						}],
					})(
						<Input addonBefore='Title' size='large' placeholder="Input title" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('tags', {
						rules: [{
							required: true, message: 'Please input tags'
						}],
					})(
						<Input addonBefore='Tags' size='default' placeholder="tags1,tags2,..."  />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('category', {
						rules: [{
							required: true, message: 'Please select a category'
						}],
					})(
						<Select style={{ width: 120 }} >
							{this.state.categories.map(function(c){
								return <Option key={c.id}>{c.name}</Option>;
							})}
						</Select>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('is_published', {
						initialValue: "yes",
					})(
						<Radio.Group>
							<Radio.Button value="yes" checked>发布</Radio.Button>
							<Radio.Button value="no">暂不发布</Radio.Button>
						</Radio.Group>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('is_reviewed', {
						initialValue: "yes",
					})(
						<Radio.Group>
							<Radio.Button value="yes" checked>已审核</Radio.Button>
							<Radio.Button value="no">未审核</Radio.Button>
						</Radio.Group>
					)}
				</FormItem>

				<FormItem label="标题图">		
					<Upload
						action={this.props.imageUploadUrl}
						listType="picture-card"
						fileList={titleImageList}
						onPreview={this.handleImagePreview.bind(this)}
						onChange={this.handleImageChange.bind(this)}
					>
						{titleImageList.length >= 1 ? null : heroImageUploadButton}
					</Upload>
					<Modal visible={titleImagePreviewVisible} footer={null} onCancel={this.handleImageCancel.bind(this)}>
						<img alt="标题图" style={{ width: '100%' }} src={titleImagePreviewImage} />
					</Modal>
				</FormItem>
				
				<UEditor id="editor" serverUrl={this.props.editorServerUrl} />
				<FormItem>
					<Button
						type="primary"
						htmlType="submit"
						disabled={this.hasErrors(getFieldsError())}
					>
						Save
					</Button>
				</FormItem>
			</Form>
		);
  	}
}

ArticleFormInner.propTypes = {
	form: PropTypes.object,
	editorServerUrl: PropTypes.string,
	imageUploadUrl: PropTypes.string,
	submitEndPoint: PropTypes.string,
};

ArticleFormInner.defaultProps = {
};

ArticleForm = Form.create({})(ArticleFormInner);

export default ArticleForm