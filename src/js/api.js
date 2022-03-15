import axios from "axios";
class api_request {
  constructor(host) {
    this.host = host;
  }
  request(method, path, params, data) {
    return new Promise((resolve, reject) => {
      let options = null;
      if(method == "GET" || method == "DELETE" ){
        options = {
          headers: { "Content-Type": "application/json" },
          method: method,
          url: this.host + path,
          params: params,
        };
      }else{
        options = {
          headers: { "Content-Type": "application/json" },
          method: method,
          url: this.host + path,
          data: data,
        };
      }
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
          reject(new Error(error));
        });
    });
  }
  getGroup(travel_key) {
    return this.request("GET", `/travel`, { travel_key: travel_key }, null);
  }
  createGroup(data){
    return this.request("POST", `/travel`, null, data);
  }
  editGroup(data){
    return this.request("PUT", `/travel`, null, data);
  }
  deleteGroup(travel_key) {
    return this.request("DELETE", `/travel`, { travel_key: travel_key }, null);
  }
  getPaymentHistory(travel_key){
    return this.request("GET", `/payment/history`, { travel_key: travel_key }, null);
  }
  getPayment(payment_id){
    return this.request("GET", `/payment`, { payment_id: payment_id }, null);
  }
  addPayment(data){
    return this.request("POST", `/payment`, null, data);
  }
  editPayment(data){
    return this.request("PUT", `/payment`, null, data);
  }
  deletePayment(payment_id){
    return this.request("DELETE", `/payment`, { payment_id: payment_id }, null);
  }
  getCalculationResults(travel_key){
    return this.request("GET", `/calculation/results`, { travel_key: travel_key }, null);
  }
  getBorrowingHistory(member_id){
    return this.request("GET", `/borrowing/history`, { member_id: member_id }, null);
  }
  getBorrowingStatuses(travel_key){
    return this.request("GET", `/borrowing/statuses`, { travel_key: travel_key }, null);
  }
  addMember(data){
    return this.request("POST", `/member`, null, data);
  }
  deleteMember(delete_member_id){
    return this.request("DELETE", `/member`, { member_id: delete_member_id }, null);
  }
}
export { api_request };
