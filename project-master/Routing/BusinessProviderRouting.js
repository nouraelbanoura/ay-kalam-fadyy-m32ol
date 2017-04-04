var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var crypto = require('crypto');
var BusinessProvider = require('../models/BusinessProvider');
var path = require('path');
var flash = require('flash');


router.use(function (req, res, next) {

  res.locals.currentBusinessProvider = req.BusinessProvider;
  next();
});

//MUlter config.. 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    const buf = crypto.randomBytes(48);
    cb(null, Date.now() + buf.toString('hex') + path.extname(file.originalname));
  }
});

//Upload a photo 
const upload = multer({
  storage: storage
});


// Posting a photo 
router.post('/uploadProfile', upload.single('file'), function (req, res, next) {
  if (req.file != undefined) {
    var image = req.file.filename;
    req.BusinessProvider.image = image;

    req.BusinessProvider.save(function (err) {
      if (err) {
        next(err);
        res.render('/BusinessProvider/uploadProfile', {
          errors: errors
        });
        return;
      }
      console.log(req.BusinessProvider.image);

      res.redirect("/BusinessProvider/uploadProfile");
      req.flash('success_msg', "Image uploaded");
      // window.alert('hi');
      //alert("image uploaded");
    });
  }

});

router.get('/BusinessProvider/uploadProfile', function (req, res) {
  res.render('/BusinessProviderUploadProfile', {
    BusinessProvider: req.BusinessProvider
  });
});

// Register Page
router.get('/BusinessProvider/register', function (req, res) {
  res.render('BusinessProviderRegister', {
    BusinessProvider: req.BusinessProvider
  });
});
// Register New BusinessProvider
router.post('BusinessProvider/register', function (req, res) {
      var name = req.body.name;
      var email = req.body.email;
      var username = req.body.username;
      var password = req.body.password;
      var password2 = req.body.password2;
      // Validation
      req.checkBody('name', 'Name is required').notEmpty();
      req.checkBody('email', 'Email is required').notEmpty();
      req.checkBody('email', 'Email is not valid').isEmail();
      req.checkBody('username', 'Username is required').notEmpty();
      req.checkBody('password', 'Password is required').notEmpty();
      req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

      var errors = req.validationErrors();
      BusinessProvider.findOne({
        username: username
      }, function (err, user) {
        if (err) {
          return next(err);
        }
        if (user) {
          req.flash("error", "User already exists");
          return res.redirect("/BusinessProvider/register");
        }

        BusinessProvider.findOne({
          email: email
        }, function (err, user) {
          if (err) {
            return next(err);
          }
          if (user) {
            req.flash("error", "Email already exists");
            return res.redirect("/BusinessProvider/register");
          }
          var newBusinessProvider = new BusinessProvider({
            name: name,
            username: username,
            password: password,
            email: email,

          });
          // newUser.save(next);
          User.createBusinessProvider(newBusinessProvider, function (err, user) {
            if (err) throw err;
            console.log(user);
          });

          req.flash('success_msg', 'You are registered and can now login');

          res.redirect('/BusinessProvider/login');

        });
      });
});




      // Login
      router.get('/BusinessProvider/login', function (req, res) {
        res.render('BusinessProviderLogin', {
          BusinessProvider: req.BusinessProvider
        });

        router.post('/BusinessProvider/login',
          passport.authenticate('local', {
            successRedirect: '/BusinessProvider/Profile',
            failureRedirect: '/users/login',
            failureFlash: true
          }),
          function (req, res) {
            res.redirect('BusinessProviderPage');
          });

      });

      passport.use(new LocalStrategy(
        function (username, password, done) {
          User.getBusinessProviderByUsername(username, function (err, user) {
            if (err) throw err;
            if (!user) {
              return done(null, false, {
                message: 'Unknown User'
              });
            }

            User.comparePassword(password, user.password, function (err, isMatch) {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, {
                  message: 'Invalid password'
                });
              }
            });
          });
        }));
      //Business Provider View profile
      router.get('/BusinessProvider/Profile', ensureAuthenticated, function (req, res) {
        res.render('BusinessProviderPage', {
          user: req.user
        });
      });
      //Business Provider add new service

      // Bat2akedd enoo logged in!!
      function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
          next();
        } else {
          var error = "You must be logged in to see this page.";
          res.render('BusinessProviderlogin', {
            error
          });
        }
      }
      router.get('/AddNewService', ensureAuthenticated, function (req, res) {
        res.render('AddNewService', {
          user: req.user
        });
      });
      router.post('/AddNewService', upload.single('file'), function (req, res, next) {
        var description = req.body.description;
        var info = req.body.info;
        var location = req.body.location;
        var username = req.user.username; // Me7taga ageyb el id 
        var file = req.file;
        var title = req.body.title;

        if (description == "") {
          var error = 'Please write a description to your new service!!';
          res.render('AddNewService', {
            error: error
          });
        } else
        if (title == "") {
          var error = 'Please add a title to your service';
          res.render('AddNewService', {
            error: error
          });
        } else
        if (location == "") {
          var error = 'Please write the location';
          res.render('AddNewService', {
            error: error
          });
        } else
        if (File == undefined) {
          var error = 'Image is undefined';
          res.render('AddNewService', {
            error: error
          });
        } else {
          var success_msg = 'Service added successfully.';
          var newBusiness = new Business({
            title: title,
            info: info,
            location: location,
            description: description,
            file: file,


          });


          if (file != undefined) {
            newBusinessProvider.file = file.filename;
          }


          newBusinessProvider.save();

          console.log(newBusinessProvider);

          res.render('AddNewService', {
            success_msg: success_msg
          });
        }


      });
var app=app = express();
      app.use(flash());

      passport.serializeUser(function (user, done) {
        done(null, user.id);
      });

      passport.deserializeUser(function (id, done) {
        User.getBusinessProviderId(id, function (err, user) {
          done(err, user);
        });
      });
      // eL Page elyy abl login 
      router.get('/', function (req, res, next) {
        BusinessProvider.find().exec((err, BusinessProvider) => {
          if (err) {
            next(err);
            return;
          }
          //	project.find()exec((err,projects)=>{
          //	if(err){next(err);return;}
          res.render('index', {
            BusinessProvider
            //projects
          })

        })
      })
      // edit Service
      router.get('/editBusinessProviderService', function (req, res) {
        res.render('editBusinessProviderService');
      })

      module.exports = router ;