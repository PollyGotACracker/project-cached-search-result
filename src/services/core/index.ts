import axios, { AxiosInstance, AxiosResponse } from "axios";

class HttpClient {
  private BASE_URL = import.meta.env.PROD ? "/" : "http://localhost:4000";

  protected axiosInstance: AxiosInstance = axios.create({
    baseURL: this.BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  });

  get(url: string): Promise<AxiosResponse> {
    return this.axiosInstance.get(url);
  }
}

export default HttpClient;
