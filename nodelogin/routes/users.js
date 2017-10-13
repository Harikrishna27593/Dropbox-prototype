var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var mysql = require('mysql');
var multer = require('multer');
var glob = require('glob');
var moment= require('moment');
var fs = require('fs');

var uname='';
var filename=''
//path='./public/uploads/'+uname;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
        filename=file.originalname
    }
});

var upload = multer({storage:storage});

var pool = mysql.createPool({
    connectionLimit: 1000,
    host: 'localhost',
    user: 'hk',
    password: 'hk275',
    database: 'users',
    debug: false
});

module.exports = pool

router.get('/getimg', function (req, res,  next) {
    var i=0;
    pool.getConnection(function(err, connection) {

        var get_paths = "select * from upload_info where username= (" + connection.escape(uname) + ") order by starred desc;";
        connection.query(get_paths, function (err, rows, fields) {
            if (err) {
                console.log("error_herein inserting into activity");
            }
            else {
                if (rows) {
                    var resArr = [];
                    resArr = rows.map(function (file) {

                        var d = moment().format('MMMM Do YYYY h:mm:ss a')
                        var imgJSON = {};
                        var path=rows[i].PATH
                        imgJSON.img = path.split('/')[3];
                        imgJSON.cols = 1  ;
                        imgJSON.timer=d;
                        imgJSON.username=uname;
                        imgJSON.starred=rows[i].STARRED;
                        imgJSON.permission=rows[i].PERMISSION;
                        i=i+1;
                        return imgJSON;

                    });
                    console.log(resArr)
                    res.status(200).send(resArr);

                }
                else {

                }

            }

        });
        connection.release();
    });


});



router.get('/getdetails', function (req, res,  next) {

    pool.getConnection(function(err, connection) {

        var get_details = "select * from user_profile where EMAIL= (" + connection.escape(uname) + ");";
        console.log(get_details)
        connection.query(get_details, function (err, rows, fields) {
            if (err) {
                console.log("error_herein getdetails");
            }
            else {

                var i=0;
                if (rows) {
                    var detailsarr = [];

                    detailsarr = rows.map(function (file) {
                        var DetailsJSON = {};
                        DetailsJSON.name=rows[i].NAME;
                        DetailsJSON.email = rows[i].EMAIL;
                        DetailsJSON.work = rows[i].WORK;
                        DetailsJSON.edu=rows[i].EDUCATION;
                        DetailsJSON.contact=rows[i].CONTACT;
                        DetailsJSON.interests=rows[i].INTERESTS;
                        DetailsJSON.lang_pref=rows[i].LANG_PREF;
                        i=i+1;
                        return DetailsJSON;
                    });

                    console.log(detailsarr);
                    res.status(200).send(detailsarr);

                }
                else {
                    //
                }

            }

        });
        connection.release();
    });


});

router.post('/delete', function (req, res, next) {
    pool.getConnection(function(err, connection) {
        var d = moment().format('MMMM Do YYYY h:mm:ss a')
        var filedelete = "File deleted";

        var activity = "insert into user_activity(USERNAME,ACTIVITY_TIME,ACTIVITY) values (" + connection.escape(uname) + " ," + connection.escape(d) + " ," + connection.escape(filedelete) + ");";
        connection.query(activity, function(err, rows, fields) {
            if(err){
                console.log("error_herein inserting into activity");
            }
            else
            {
                //if(results.length > 0){
                if(rows){
                    //console.log(activity);
                    console.log("Inserted activity");
                }
                else {
                    //
                }
            }
        });

        var path='./public/uploads/'+req.body.pathfile
        fs.unlink(path, function () {

            console.log('write operation complete.');

        });
        var remove = "Delete from UPLOAD_INFO where path= (" + connection.escape(path)+");";
        connection.query(remove, function(err, rows, fields) {
            if(err){
                console.log("error_herein inserting into activity");
            }
            else
            {
                //if(results.length > 0){
                if(rows){
                    //console.log(activity);
                    console.log("Inserted activity");
                }
                else {


                    //
                }
            }

        });



        connection.release();

    });

    res.status(204).end();
});

router.post('/star', function (req, res, next) {
    pool.getConnection(function(err, connection) {
        var d = moment().format('MMMM Do YYYY h:mm:ss a')
        var filestar = "File starred";

        var activity = "insert into user_activity(USERNAME,ACTIVITY_TIME,ACTIVITY) values (" + connection.escape(uname) + " ," + connection.escape(d) + " ," + connection.escape(filestar) + ");";
        connection.query(activity, function(err, rows, fields) {
            if(err){
                console.log("error_herein inserting into activity");
            }
            else
            {
                //if(results.length > 0){
                if(rows){
                    //console.log(activity);
                    console.log("Inserted activity");
                }
                else {
                    //
                }
            }
        });

        var path='./public/uploads/'+req.body.pathfile

        var star = "UPDATE UPLOAD_INFO SET STARRED='1' where path= (" + connection.escape(path)+");";
        connection.query(star, function(err, rows, fields) {
            if(err){
                console.log("error_herein inserting into activity");
            }
            else
            {
                //if(results.length > 0){
                if(rows){
                    //console.log(activity);
                    console.log("Inserted activity");
                }
                else {


                    //
                }
            }

        });



        connection.release();

    });

    res.status(204).end();
});

router.post('/unstar', function (req, res, next) {
    pool.getConnection(function(err, connection) {
        var d = moment().format('MMMM Do YYYY h:mm:ss a')
        var fileunstar = "File Unstarred";

        var activity = "insert into user_activity(USERNAME,ACTIVITY_TIME,ACTIVITY) values (" + connection.escape(uname) + " ," + connection.escape(d) + " ," + connection.escape(fileunstar) + ");";
        connection.query(activity, function(err, rows, fields) {
            if(err){
                console.log("error_herein inserting into activity");
            }
            else
            {
                //if(results.length > 0){
                if(rows){
                    //console.log(activity);
                    console.log("Inserted activity");
                }
                else {
                    //
                }
            }
        });

        var path='./public/uploads/'+req.body.pathfile

        var unstar = "UPDATE UPLOAD_INFO SET STARRED='0' where path= (" + connection.escape(path)+");";
        connection.query(unstar, function(err, rows, fields) {
            if(err){
                console.log("error_herein inserting into activity");
            }
            else
            {
                //if(results.length > 0){
                if(rows){
                    //console.log(activity);
                    console.log("Inserted activity");
                }
                else {


                    //
                }
            }

        });



        connection.release();

    });

    res.status(204).end();
});

router.post('/share', function (req, res, next) {
    pool.getConnection(function(err, connection) {
        var d = moment().format('MMMM Do YYYY h:mm:ss a')
        var fileshared = "File Shared";

        var activity = "insert into user_activity(USERNAME,ACTIVITY_TIME,ACTIVITY) values (" + connection.escape(uname) + " ," + connection.escape(d) + " ," + connection.escape(fileshared) + ");";
        connection.query(activity, function(err, rows, fields) {
            if(err){
                console.log("error_herein inserting into activity");
            }
            else
            {
                //if(results.length > 0){
                if(rows){
                    //console.log(activity);
                    console.log("Inserted activity");
                }
                else {
                    //
                }
            }
        });

        var path='./public/uploads/'+req.body.pathfile
        var email=req.body.email;
        var starred=0
        var permission=0
        var x = moment().format('MMMM Do YYYY h:mm:ss a')
        var share ="insert into UPLOAD_INFO(USERNAME,ACTIVITY_TIME,STARRED,PATH,PERMISSION) values (" + connection.escape(email) + " ," + connection.escape(x) + " ," + connection.escape(starred) + "," + connection.escape(path)+"," + connection.escape(permission)+");";
        connection.query(share, function(err, rows, fields) {
            if(err){
                console.log("error_herein inserting into activity");
            }
            else
            {
                //if(results.length > 0){
                if(rows){
                    //console.log(activity);
                    console.log("Inserted activity");
                }
                else {


                    //
                }
            }

        });



        connection.release();

    });

    res.status(204).end();
});


router.post('/upload', upload.single('mypic'), function (req, res, next) {
    pool.getConnection(function(err, connection) {
        var d = moment().format('MMMM Do YYYY h:mm:ss a')
        var fileupload = "File uploaded";

        var activity = "insert into user_activity(USERNAME,ACTIVITY_TIME,ACTIVITY) values (" + connection.escape(uname) + " ," + connection.escape(d) + " ," + connection.escape(fileupload) + ");";
        connection.query(activity, function(err, rows, fields) {
            if(err){
                console.log("error_herein inserting into activity");
            }
            else
            {
                //if(results.length > 0){
                if(rows){
                    //console.log(activity);
                    console.log("Inserted activity");
                }
                else {
                    //
                }
            }
        });
        var starred=0;
        var permission=1;
        path='./public/uploads/'+filename
        var uploaded = "insert into UPLOAD_INFO(USERNAME,ACTIVITY_TIME,STARRED,PATH,PERMISSION) values (" + connection.escape(uname) + " ," + connection.escape(d) + " ," + connection.escape(starred) + "," + connection.escape(path)+"," + connection.escape(permission)+");";
        connection.query(uploaded, function(err, rows, fields) {
            if(err){
                console.log("error_herein inserting into activity");
            }
            else
            {
                //if(results.length > 0){
                if(rows){
                    //console.log(activity);
                    console.log("Inserted activity");
                }
                else {


                    //
                }
            }

        });



        connection.release();

});

//console.log(req.body);
//console.log(req.file);
res.status(204).end();
});

router.get('/showActivity',function (req, res, next) {
    pool.getConnection(function(err, connection) {
       var i=0;
        var getactivity = "select * from user_activity where  username= (" + connection.escape(uname) + ");";
        connection.query(getactivity, function(err, rows, fields) {
            if(err){
                console.log("error_herein showactvity");
            }
            else
            {

                if(rows){
                    var resultarr = [];

                    resultarr = rows.map(function (file) {
                        var ActivityJSON = {};
                        ActivityJSON.id=rows[i].USER_ID;
                        ActivityJSON.username = rows[i].USERNAME
                        ActivityJSON.activity_time = rows[i].activity_time
                        ActivityJSON.activity=rows[i].ACTIVITY
                        i=i+1;
                        return ActivityJSON;
                    });

                    res.status(200).send(resultarr);
                }
                else {

                    //
                }
            }

        });
        connection.release();
        });

    });


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/logout', function (req, res, next) {
    pool.getConnection(function(err, connection) {
        var d = moment().format('MMMM Do YYYY h:mm:ss a')
        var accountcreated = "Logged_out";

        var activity = "insert into user_activity(USERNAME,ACTIVITY_TIME,ACTIVITY) values (" + connection.escape(uname) + " ," + connection.escape(d) + " ," + connection.escape(accountcreated) + ");";
        connection.query(activity, function(err, rows, fields) {
            if(err){
                console.log("error_herein inserting into activity");
            }
            else
            {
                //if(results.length > 0){
                if(rows){
                    //console.log(activity);
                    console.log("Inserted activity");
                    res.status(201).json({message: "Logout successful"});
                }
                else {


                    //
                }
            }

        });
        connection.release();

    });
});


router.post('/doLogin', function (req, res, next) {

    var reqUsername = req.body.username;
    var reqPassword = req.body.password;
    uname=reqUsername;

    pool.getConnection(function (err, connection) {
        var d=moment().format('MMMM Do YYYY h:mm:ss a')
        var loggedin="Signed_in";
        var query1="select PASSWORD from DROPBOX_USERSS where USER_NAME="+connection.escape(reqUsername)+"";
        var activity="insert into user_activity(USERNAME,ACTIVITY_TIME,ACTIVITY) values ("+connection.escape(reqUsername)+" ," + connection.escape(d) +" ," + connection.escape(loggedin)+");";
        connection.query(query1, function (err, rows, fields) {
            if (err) {
                res.status(401).json({message: "Login failed"});
            }
            else {

                if (rows) {
                    try {
                        var orgPassword = bcrypt.compareSync(reqPassword, rows[0].PASSWORD);
                    }
                    catch(e){
                        res.status(401).json({message: "Login failed"});
                    }


                    if(orgPassword) {
                        //req.session.user=reqUsername;
                        //console.log(req.session.user);
                        res.status(201).json({message: "Login successful"});

                    }
                    else {
                        res.status(401).json({message: "Login failed"});
                    }
                }
                else {
                    res.status(401).json({message: "Login failed"});
                    //
                }
            }
        });
        connection.query(activity, function(err, rows, fields) {
            if(err){
                console.log("error_herein inserting into activity");
            }
            else
            {
                //if(results.length > 0){
                if(rows){
                    //console.log(activity);
                    console.log("Inserted activity");
                }
                else {


                    //
                }
            }

        });

    });

});
router.post('/dosignup', function (req, res, next) {

    var reqUsername = req.body.username;
    var reqPassword = req.body.password;
    var lastname = req.body.lastname;
    var firstname = req.body.firstname;

    var hash = bcrypt.hashSync(reqPassword, 10);

    pool.getConnection(function(err, connection) {
        var isuserexists="select USER_NAME from DROPBOX_USERSS where USER_NAME="+connection.escape(reqUsername)+"";
        console.log(isuserexists)
        connection.query(isuserexists, function(err, rows, fields) {
            if(err){
                console.log("problem here");
            }
            else
            {	// return err or result
                if(rows.length > 0){
                    res.status(401).json({message: "Login failed"});
                }
                else
                {
                    var d=moment().format('MMMM Do YYYY h:mm:ss a')
                    var accountcreated="Account created";
                    pool.getConnection(function(err, connection2) {
                        var insertUser="insert into DROPBOX_USERSS(FIRST_NAME,LAST_NAME,USER_NAME,PASSWORD) values ("+connection2.escape(firstname)+" ," + connection2.escape(lastname) +" ," + connection2.escape(reqUsername)+" ," +connection2.escape(hash)+");";
                        var activity="insert into user_activity(USERNAME,ACTIVITY_TIME,ACTIVITY) values ("+connection2.escape(reqUsername)+" ," + connection2.escape(d) +" ," + connection2.escape(accountcreated)+");";

                        connection2.query(insertUser, function(err, rows, fields) {
                        if(err){

                        }
                        else
                        {
                            //if(results.length > 0){
                            if(rows){
                                console.log("Inserted");
                                res.status(201).json({message: "Sign up successfull"});
                            }
                            else {

                                console.log("Invalid Registration");
                                //
                            }
                        }

                    });
                        connection2.query(activity, function(err, rows, fields) {
                            if(err){
                                console.log("error_herein inserting into activity");
                            }
                            else
                            {
                                //if(results.length > 0){
                                if(rows){
                                    //console.log(activity);
                                    console.log("Inserted activity");
                                }
                                else {


                                    //
                                }
                            }

                        });
                        connection2.release();
                });
            }
            }
        });
        connection.release();
    });

});

router.post('/profile', function (req, res, next) {

    var reqname = req.body.name;
    var reqemail = req.body.email;
    var reqwork = req.body.work;
    var reqedu = req.body.edu;
    var reqcontact = req.body.contact;
    var reqinterests = req.body.interests;
    var reqlang = req.body.lang_pref;


    pool.getConnection(function(err, connection2) {
        var insertprofile="insert into USER_PROFILE(NAME,EMAIL,WORK,EDUCATION,CONTACT,INTERESTS,LANG_PREF) values ("+connection2.escape(reqname)+" ," + connection2.escape(reqemail) +" ," + connection2.escape(reqwork)+" ," +connection2.escape(reqedu)+","+connection2.escape(reqcontact)+","+connection2.escape(reqinterests)+","+connection2.escape(reqlang)+");";
        connection2.query(insertprofile, function(err, rows, fields) {
            if(err){
                console.log("problem here");
            }
            else {	// return err or result
                if (rows) {
                    res.status(201).json({message: "Inserted"});
                }
                else {
                }
            }
    });
        connection2.release();
});
});

module.exports = router;