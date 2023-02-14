const enviromentConfig = {
  development: {
    userServer: {
      endPoint: 'http://127.0.0.1:8081'
    },

    dataServer: {
      endPoint: 'http://192.168.1.18:8081'
    }
  },
  production: {
    userServer: {
      endPoint: 'http://127.0.0.1:8081'
    },

    dataServer: {
      endPoint: 'http://192.168.1.18:8081'
    }
  }
};

export default enviromentConfig;
