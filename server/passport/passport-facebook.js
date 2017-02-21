var passport = require('passport');
var PassportFacebookStrategy = require('passport-facebook').Strategy;
const User = require('mongoose').model('User');
const config = require('../../config');

module.exports = new PassportFacebookStrategy({
    clientID: config.FB_ID,
    clientSecret: config.FB_Secret,
    callbackURL: 'https://mern-boiler.herokuapp.com/auth/facebook/callback',
    profileFields: ['id', 'email', 'gender', 'profileUrl', 'displayName']
}, (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    const userData = {
        email: profile.emails,
        password: "",
        name: profile.displayName,
        provider: "Facebook",
        providerID: profile.id
    };

    const newUser = new User(userData);
    console.log(userData);
    /*User.findOrCreate(..., function(err, user) {
        if (err) { return done(err); }

        done(null, user);
    });
    */
    return callback(null, profile);
});
