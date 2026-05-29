const passport =
require('passport');

const GoogleStrategy =
require(
  'passport-google-oauth20'
).Strategy;

const User =
require('../models/User');

const generateUsername =
require(
  '../utils/generateUsername'
);





passport.use(

  new GoogleStrategy(

    {

      clientID:
      process.env
      .GOOGLE_CLIENT_ID,



      clientSecret:
      process.env
      .GOOGLE_CLIENT_SECRET,



      callbackURL:
      process.env
      .GOOGLE_CALLBACK_URL,

    },



    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {

      try {

        // CHECK USER
        let user =
        await User.findOne({

          email:
          profile.emails[0]
          .value,

        });



        // CREATE USER
        if (!user) {

          user =
          await User.create({

            name:
            profile.displayName,



            username:
            generateUsername(
              profile.displayName
            ),



            email:
            profile.emails[0]
            .value,



            avatar:
            profile.photos[0]
            .value,



            googleId:
            profile.id,



            isVerified:
            true,

          });
        }



        return done(
          null,
          user
        );

      } catch (error) {

        return done(
          error,
          null
        );
      }
    }

  )
);





/*
=====================================
SERIALIZE USER
=====================================
*/

passport.serializeUser(
(
  user,
  done
) => {

  done(
    null,
    user.id
  );
});





/*
=====================================
DESERIALIZE USER
=====================================
*/
/*
=====================================
DESERIALIZE USER (FIXED)
=====================================
*/
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    
    if (!user) {
      // If the user doesn't exist in the database anymore,
      // pass false to tell Passport to invalidate the stale session session.
      return done(null, false); 
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
});




module.exports =
passport;