import HttpClient from "./core";
import { SickServiceType } from "../types/sick";

export class SickService implements SickServiceType {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getSickList(value: string) {
    return await this.httpClient
      .get(`/sick?q=${value}`)
      .then((response) => {
        console.info("calling api");
        const isOk = response.status === 200;
        if (isOk) return response?.data;
        return window.alert("오류가 발생했습니다. 다시 시도해주세요.");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
