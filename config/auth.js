//expose our config directly to our application using modules


//using environmental variables to store API keys. Note that you can also just write the key strings in below, but it's not recommended.

var facebookId = process.env.FACEBOOK_ID || "732061490170483";

var facebookSecret = process.env.FACEBOOK_SECRET || "27b5ff8efeab9e80ee21beb5791842fe";

module.exports = {
    'facebookAuth' : {
        'clientID'      : facebookId, // your App ID
        'clientSecret'  : facebookSecret, // your App Secret
        'callbackURL'   : process.env.FACEBOOK_CALLBACK || 'http://localhost:8080/login/auth/facebook/callback'
    }
}
