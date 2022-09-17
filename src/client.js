import config from './config';
const axios = require('axios');


class FastAPIClient {
  constructor(overrides) {
    this.config = {
      ...config,
      ...overrides,
    };

    // this.login = this.login.bind(this);
    this.apiClient = this.getApiClient(this.config);
  }

  /* ----- Client Configuration ----- */

  /* Create Axios client instance pointing at the REST api backend */
  getApiClient(config) {
    const initialConfig = {
      baseURL: `${config.apiBasePath}/`,
    };
    const client = axios.create(initialConfig);
    return client;
  }

  getNursery() {
    return this.apiClient.get(`/nursery/`);
  }
  createPlant(name, species, health) {
    const plantData = {
      name,
      species,
      health,
    };
    return this.apiClient.post(`/plants/new/`, plantData);
  }
}


export default FastAPIClient;