const enviromentConfig = {
  development: {
    userServer: {
      endPoint: 'https://www.ura.hcmut.edu.vn/bana-model'
      // endPoint: 'http://192.168.1.24:8000'
    },

    dataServer: {
      endPoint: 'http://192.168.1.18:8081'
    }
  },
  production: {
    userServer: {
      endPoint: 'http://103.176.178.107:8000'
    },

    dataServer: {
      endPoint: 'http://192.168.1.18:8081'
    }
  }
};

export default enviromentConfig;
