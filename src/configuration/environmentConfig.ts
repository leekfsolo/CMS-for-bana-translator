const enviromentConfig = {
  development: {
    userServer: {
      endPoint: 'https://www.ura.hcmut.edu.vn/bana-model'
    },

    dataServer: {
      endPoint: 'https://bahnar.dscilab.site:20007'
    }
  },
  production: {
    userServer: {
      endPoint: 'https://www.ura.hcmut.edu.vn/bana-model'
    },

    dataServer: {
      endPoint: 'https://bahnar.dscilab.site:20007'
    }
  }
};

export default enviromentConfig;
