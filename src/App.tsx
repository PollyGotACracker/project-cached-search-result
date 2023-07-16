import { Outlet } from "react-router-dom";
import { SickService } from "./services/sick.service.ts";
import ApiProvider from "./contexts/ApiContext.tsx";

const App = () => {
  // console.log(process.env);
  const sickService = new SickService();

  return (
    <ApiProvider sickService={sickService}>
      <Outlet />
    </ApiProvider>
  );
};

export default App;
