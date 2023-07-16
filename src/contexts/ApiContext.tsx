import { createContext, useContext } from "react";
import { SickService } from "../services/sick.service";
import { SickServiceType } from "../types/sick";

type ProviderProps = {
  children: React.ReactElement;
  sickService: InstanceType<typeof SickService>;
};

const ApiContext = createContext<SickServiceType | null>(null);

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context)
    throw new Error(
      "useApiContext has to be used within <ApiContext.Provider>"
    );
  return context;
};

const ApiProvider = ({ children, sickService }: ProviderProps) => {
  const getSickList = sickService.getSickList.bind(sickService);

  const value = {
    getSickList,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export default ApiProvider;
