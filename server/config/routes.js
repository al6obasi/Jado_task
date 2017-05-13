var UserController = require ('../database/User/UserController.js');
module.exports = function (app, express) {
	

/*								user route									 */
//=============================================================================

		app.post('/api/signin', UserController.signin);
		app.post('/api/signup',UserController.signup);

}