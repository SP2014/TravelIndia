var path = require('path');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var spots = require('./models/spots');
var user = require('./models/users');
var passport = require('passport');
var client = require('http');
var gmapUtil = require('googlemapsutil');
var distanceMatrix = require('google-distance-matrix');
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


    //========== Parser Function ===============//
// call api from class object
    var cb = function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
    };

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




    //app.get('/api/spots', passport.authenticate('bearer', { session: false }),function(req,res) {
    //    console.log(req.headers);
    //        spots.find({}, function (err, spots) {
    //            res.json(spots);
    //        });
    //});

    app.get('/api/spots', function(req,res) {
        if(req.param('location')!=null) {
            var location = req.param('location').toLowerCase();
            var point = req.param('point');
            var maxDistance = req.param('distance');
            var limit = req.param('limit');
        }
        var results = [];
        var coords = [];
        var disMatrix = [];
        var responses = [];
        //var distances = [];
        if(location == null || location == undefined) {
            spots.find({}, function (err, spots) {
                res.json(spots);
            });
        }
        else{

            spots.find({'loc_city':location} , function(err, spot){
                if(point!=null || point!=undefined) {
                    spot.forEach(function (record) {
                        var po = record.loc_coordinates.split(',');
                        record.loc_coordinates = parseFloat(po[0]).toFixed(3)+','+parseFloat(po[1]).toFixed(3);
                        results.push(record);
                        coords.push(record.loc_coordinates);
                    });


                    foo(coords, function(r){
                        r.elements.forEach(function(p,i){
                            var pp = p.distance.text.split(' ');
                            console.log(parseFloat(pp[0]));
                            if(pp[1]=='km' && parseFloat(pp[0])<= parseFloat(maxDistance)){
                                responses.push(destinations[i]);
                                disMatrix.push(p.distance.text);
                            }
                        });

                        var dis = {'distance':disMatrix};
                        responses.push(dis);
                        res.json(responses);
                    });
                }

                function foo(address, fn){
                    gmapUtil.distancematrix(point, address, {mode: 'street', language: 'en-EN'}, function(err, result){
                        if (err) {
                            console.log(err);
                        }
                        var par = JSON.parse(result);
                        fn(par.rows[0]);
                    });
                }

            });
        }
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

