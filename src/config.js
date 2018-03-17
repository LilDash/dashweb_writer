
var Config = Config || {};

Config.serverHost = 'http://localhost:9000';

Config.getAllCategoriesEndpoint = Config.serverHost + '/api/admin/category/list';
Config.editorServerUrl = Config.serverHost + '/api/admin/editor';
Config.imageUploadUrl = Config.serverHost + '/api/admin/image';
Config.submitEndPoint = Config.serverHost + '/api/admin/post/insert';

export { Config };