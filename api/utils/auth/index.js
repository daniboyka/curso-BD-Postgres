const passport = require('passport');

const localStrategy = require('./strategies/localStrategy');
const JwtStrategyStrategy = require('./strategies/jwtStrategy');
// ejemplo si quiero una estratejia con faceboock, insta, twiiter
// const localStrategy = require('./strategies/facelStrategy');
// const localStrategy = require('./strategies/instStrategy');
// const localStrategy = require('./strategies/twitStrategy');

passport.use(localStrategy);
passport.use(JwtStrategyStrategy);

