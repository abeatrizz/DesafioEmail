const logger = {
  info: (message) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  },
  
  error: (message, error = null) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    if (error) {
      console.error(error);
    }
  },
  
  success: (message) => {
    console.log(`[SUCCESS] ${new Date().toISOString()} - ${message}`);
  }
};

module.exports = logger;