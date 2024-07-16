module.exports = {
  port: process.env.PORT || 3012,
  cookie: {
    name: process.env.COOKIE_NAME || 'aehtc-session',
    maxAge: process.env.COOKIE_DURATION || 28 * 24 * 60 * 60 * 1000, // 28 days in millis
    secret: process.env.COOKIE_SECRET || 'asbtc-secret',
  },
}
