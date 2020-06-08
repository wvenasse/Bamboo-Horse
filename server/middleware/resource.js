module.exports = options => {
    const jwt = require('jsonwebtoken');
	const assert =  require('http-assert');
	const AdminUser = require('../models/AdminUser');

    return async (req,res,next) => {
		const modelName = require('inflection').classify(req.params.resource);//资源的名称转为模型的名称
		req.Model = require('../models/'+ modelName);//模型的类
		next();
	}
} ;