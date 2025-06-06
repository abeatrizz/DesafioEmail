require('dotenv').config();

const config = {
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO
  },
  scraper: {
    url: process.env.SCRAPER_URL || 'https://tecnoblog.net/',
    timeout: 30000
  }
};

module.exports = config;