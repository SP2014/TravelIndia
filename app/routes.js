var path = require('path');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

module.exports = function(app){

//===========================
//========MIDDLEWARE=========
//===========================

    

    //Redirects traffic over https
    //app.use(redirectSec);
    

    //CATCH-ALL ROUTE
    //###############

    //app.get('*', function(req, res){
      //  res.sendFile(path.join(__dirname + '/../public/app/index.html'));
    //});

    app.get('/',function(req,res){
       res.render('addSpot.ejs');
    });


};

//Function used to redirect traffic over https

/*function redirectSec(req, res, next) {
    if (req.headers['x-forwarded-proto'] == 'http') { 
        res.redirect('https://' + req.headers.host + req.path);
    } else {
        return next();
    }
}*/

