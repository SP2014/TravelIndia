var path = require('path');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var spots = require('./models/spots');
var user = require('./models/users');
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;



module.exports = function(app,cloudinary, fs){

    passport.use(new Strategy(
        function(token, done) {
           user.findOne({token: token},function(err, user){

               if (err) {return done(err);}
               if (!user) { return done(null, false); }
               return done(null, user, { scope: 'read' });
           });
        }));

//===========================
//========MIDDLEWARE=========
//===========================


    app.get('/',function(req,res){
       res.render('index.ejs');
    });

    app.get('/test',function(req,res){
       res.render('test.ejs');
    });


    app.post('/addUser',function(req,res){
        var userob = new user({
          uname: 'User1',
          password: 'abc12345',
          email: 'abc@xyz.com',
          timestamp: ''+  new Date(new Date().getTime()).toDateString(),
          token: '123456789'
        });

        userob.save(function (err) {
            if(err){
                throw err;
                res.send('error');
            }
            console.log("User saved successfully");
            //res.json({success : true});
            res.send('success');
        })
    });

    /**
     * Adding a new Spot
     */
    app.post('/addspot',function(req,res){
        console.log(req.body);
        var spot = req.body;
        var spotob = new spots({
            loc_name:spot.spot,
            loc_fullname:spot.fullname,
            loc_coordinates:spot.coordinates,
            loc_description:spot.description,
            loc_category:spot.tags,
            loc_rating:0,
            loc_city:spot.city,
            loc_state:spot.state,
            media:spot.media,
            postUserId: '',
            timestamp: ''+  new Date(new Date().getTime()).toDateString(),
            shared_data:'',
            keywords:''
        });

        spotob.save(function (err) {
            if(err){
                throw err;
                res.send('error');
            }
            console.log("Spot saved successfully");
            //res.json({success : true});
            res.send('success');
        });
    });

    app.get('/api/spots', passport.authenticate('bearer', { session: false }),function(req,res) {
        console.log(req.headers);
            spots.find({}, function (err, spots) {
                res.json(spots);
            });
    });

    //apiRoutes.get('/emails', emailRoutes.getAllEmails);
    //apiRoutes.post('/addemail', emailRoutes.addEmail);
    //apiRoutes.post('/getemailwithsubstr', emailRoutes.getEmailWithSubstr);
    //apiRoutes.get('/emails/:email_id',emailRoutes.getByEmail);
    //apiRoutes.route('/emails/:email_id').delete(emailRoutes.deleteEmail);
    //apiRoutes.route('/emails/:email_id').put(emailRoutes.updateEmail);



};

//Function used to redirect traffic over https

/*function redirectSec(req, res, next) {
    if (req.headers['x-forwarded-proto'] == 'http') { 
        res.redirect('https://' + req.headers.host + req.path);
    } else {
        return next();
    }
}*/

