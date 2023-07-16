import { useEffect } from "react";
import { useApiContext } from "../contexts/ApiContext";

const Home = () => {
  const { getSickList } = useApiContext();

  useEffect(() => {
    (async () => {
      const data = await getSickList("천식");
      console.log(data);
    })();
  }, []);

  return (
    <>
      <div>Home</div>
    </>
  );
};

export default Home;
