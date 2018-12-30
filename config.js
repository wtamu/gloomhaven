exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/gloomhaven-db';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-gloomhaven-db';
exports.PORT = process.env.PORT || 8080;