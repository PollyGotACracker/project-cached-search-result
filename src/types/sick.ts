export interface SickData {
  sickCd: string;
  sickNm: string;
}

export interface SickServiceType {
  getSickList: (value: string) => Promise<SickData[] | void>;
}
