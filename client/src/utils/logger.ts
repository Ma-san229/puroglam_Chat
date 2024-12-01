const logger = {
  debug: (message: string, data?: any) => {
    if (process.env.NODE_ENV !== 'production') {
      const timestamp = new Date().toISOString();
      const logData = data ? JSON.stringify(data, null, 2) : '';
      console.log(`[${timestamp}][DEBUG] ${message}\n${logData}`);
    }
  },
  error: (message: string, error?: any) => {
    const timestamp = new Date().toISOString();
    const errorData = error instanceof Error ? 
      `${error.name}: ${error.message}\n${error.stack}` : 
      JSON.stringify(error, null, 2);
    console.error(`[${timestamp}][ERROR] ${message}\n${errorData}`);
  },
  info: (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const logData = data ? JSON.stringify(data, null, 2) : '';
    console.info(`[${timestamp}][INFO] ${message}\n${logData}`);
  },
};

export default logger;
