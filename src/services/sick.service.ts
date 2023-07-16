import HttpClient from "./core";
import { SickServiceType } from "../types/sick";

export class SickService extends HttpClient implements SickServiceType {
  async getSickList(value: string) {
    return await this.axiosInstance
      .get(`/sick?q=${value}`)
      .then((response) => {
        const isOk = response.status === 200;
        if (isOk) {
          const isEmpty = response.data.length === 0;
          return !isEmpty ? response.data : false;
        }
        if (!isOk) window.alert("오류가 발생했습니다. 다시 시도해주세요.");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
