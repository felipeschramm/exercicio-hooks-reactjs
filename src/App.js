import React, { useCallback, useMemo, useState } from "react";
import { HeadCounter } from "./Components/Counter";
import { FabButton } from "./Components/FabButton";
import Navbar from "./Components/Navbar";
import { Repository } from "./Components/Repository";
import { likesCounter } from "./Services/expensiveCalculation";

const SEARCH = "https://api.github.com/search/repositories";

const Repos = React.memo(({ getRepositories }) => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("facebook");

  React.useEffect(() => {
    getRepositories(query)
      .then((res) => res.json())
      .then((data) => setItems((data && data.items) || []));
  }, [getRepositories, query]);

  return (
    <div className="list">
      <button
        className="float-btn-rocket"
        onClick={() => setQuery("rocketseat")}
      >
        opa
      </button>
      {items &&
        items.map((result) => <Repository key={result.id} {...result} />)}
    </div>
  );
});

function App() {
  const [totalLikes, setTotalLikes] = useState(0);
  const [dark, setDark] = useState(false);

  const getRepositories = useCallback((query) => fetch(`${SEARCH}?q=${query}`), []);

  const likes = useMemo(() => likesCounter(totalLikes), [totalLikes]);

  const theme = React.useMemo(
    () => ({
      color: dark ? "#fff" : "#333",
      navbar: dark ? "#1a202c" : "#e5e7eb",
      backgroundColor: dark ? "#333" : "#fff",
    }),
    [dark]
  );

  const toogleDarkmode = () => {
    console.log("toogle");
    return setDark(!dark);
  };

  React.useEffect(() => console.log("Dark theme changed"), [theme]);

  return (
    <div style={theme} className="App">
      <Navbar theme={theme.navbar} toogleDarkmode={toogleDarkmode} />
      <HeadCounter likes={likes} />
      <Repos getRepositories={getRepositories} />
      <FabButton totalLikes={totalLikes} setTotalLikes={setTotalLikes} />
    </div>
  );
}

export default App;
