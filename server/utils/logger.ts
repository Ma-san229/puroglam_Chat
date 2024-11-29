const logger = {
  debug: (message: string, data?: any) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[SERVER DEBUG] ${message}`, data);
    }
  },
  error: (message: string, error?: any) => {
    console.error(`[SERVER ERROR] ${message}`, error);
  },
  info: (message: string, data?: any) => {
    console.info(`[SERVER INFO] ${message}`, data);
  },
};

export default logger;
