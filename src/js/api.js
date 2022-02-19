import axios from "axios";
class api_request {
  constructor(host) {
    this.host = host;
  }
  request(path, method, params) {
    return new Promise((resolve, reject) => {
      const options = {
        method: method,
        url: this.host + path,
        headers: { "Content-Type": "application/json" },
        params: params,
      };
      axios
        .request(options)
        .then(function(response) {
          switch (response.status) {
            case 200:
              resolve(response);
              break;
            case 401:
              break;
            case 403:
              break;
            case 404:
              break;
            case 500:
              break;
            default:
              break;
          }
        })
        .catch(function(error) {
          console.log(error);
          reject(new Error(error));
        });
    });
  }
  getGroupInfo(travel_key) {
    return this.request(`/travel`, "GET", { travel_key: travel_key })
  }
}
export { api_request };
