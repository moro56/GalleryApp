import {create} from "apisauce";

const api = create({
  baseURL: "http://jsonplaceholder.typicode.com/",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000
});

api.addResponseTransform(response => {
  if (!response.data) {
    response.data = {};
  }
  const {ok, problem, data} = response;
  if (!ok) {
    switch (problem) {
      case 'CLIENT_ERROR':
        if (!data.errorMessage) {
          data.errorMessage = "An error has occurred. Please try again.";
        }
        break;
      case 'SERVER_ERROR':
        data.errorMessage = "There was an error with the server.";
        break;
      case 'TIMEOUT_ERROR':
        data.errorMessage = "The server did not respond in time. Please try again later.";
        break;
      case 'CONNECTION_ERROR':
        data.errorMessage = "Server not available. Please try again later.";
        break;
      case 'NETWORK_ERROR':
        data.errorMessage = "Connection not available.";
        break;
      default:
        break;
    }
  }
});

export default api;