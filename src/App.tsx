import { Outlet } from "react-router-dom";
import { SickService } from "./services/sick.service.ts";
import ApiProvider from "./contexts/ApiContext.tsx";
import HttpClient from "./services/core/index.ts";

const App = () => {
  // console.log(process.env);
  const httpClient = new HttpClient();
  const sickService = new SickService(httpClient);

  return (
    <ApiProvider sickService={sickService}>
      <Outlet />
    </ApiProvider>
  );
};

export default App;
