import { useApiContext } from "../contexts/ApiContext";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import { SickData } from "../types/sick";
import { useState } from "react";

const Home = () => {
  const [sickList, setSickList] = useState<SickData[] | []>([]);
  const { getSickList } = useApiContext();

  return (
    <main>
      <Title />
      <SearchBar data={sickList} getData={getSickList} setData={setSickList} />
    </main>
  );
};

export default Home;
