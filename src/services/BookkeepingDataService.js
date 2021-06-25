import http from "../http-common";

class BookkeepingDataService {
  getAll() {
    return http.post("http://127.0.0.1:8080/api/bookKeeping/search");
  }

  get(id) {
    return http.get(`http://127.0.0.1:8080/api/bookKeeping/getOne?id=${id}`);
  }

  create(data) {
    return http.post("http://127.0.0.1:8080/api/bookKeeping/add", data);
  }

  update(data) {
    return http.post("http://127.0.0.1:8080/api/bookKeeping/update", data);
  }

  delete(id) {
    return http.get(`http://127.0.0.1:8080/api/bookKeeping/delete?id=${id}`);
  }
}

export default new BookkeepingDataService();
