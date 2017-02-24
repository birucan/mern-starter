var passport = require('passport');
var PassportFacebookStrategy = require('passport-facebook').Strategy;
const User = require('mongoose').model('User');
const config = require('../../config');

module.exports = new PassportFacebookStrategy({
    clientID: config.FB_ID,
    clientSecret: config.FB_Secret,
    callbackURL: 'http://localhost:8080/auth/facebook/callback',
    profileFields: ['id', 'email', 'gender', 'profileUrl', 'displayName']
}, (accessToken, refreshToken, profile, done) => {
    process.nextTick(function() {
        User.findOne({ 'providerID': profile.id }, function(err, user) {
            if (err) {
                return done(err);
            } else if (user) {
                return done(null, user);
            } else {
                const userData = {
                    email: profile.emails,
                    password: "",
                    name: profile.displayName,
                    provider: "Facebook",
                    providerID: profile.id,
                    jwtToken: accessToken
                };
                
                var newUser = new User(userData);
                newUser.save(function(err) {
                    if (err) throw err;
                    return done(null, newUser);
                })
            }
        })
    })
    //return done(null, profile);
});
