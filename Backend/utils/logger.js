const isDevelopment = process.env.NODE_ENV === 'development';

const logger = {
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  
  error: (...args) => {
    // Always log errors as they are important for debugging production issues
    console.error(...args);
  },
  
  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },

  debug: (...args) => {
    if (isDevelopment) {
      console.debug('[DEBUG]', ...args);
    }
  }
};

// module.exports = logger;
export default logger;