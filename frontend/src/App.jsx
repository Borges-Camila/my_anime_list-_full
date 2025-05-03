import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import MainContent from "./pages/MainContent";
import NotFound from "./pages/notFound";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { routesIndex } from "./routes";

import { fetchAnimeData } from "./utils/animeApi";

function App() {
  const [search, setSearch] = useState("One Piece");
  const [animeData, setAnimeData] = useState(null);
  const [animeInfo, setAnimeInfo] = useState();
  const [myAnimeList, setMyAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addToList = (anime) => {
    const index = myAnimeList.findIndex(
      (myanime) => myanime.mal_id === anime.mal_id
    );
    if (index < 0) {
      setMyAnimeList([...myAnimeList, anime]);
    }
  };

  const removeFromList = (anime) => {
    setMyAnimeList(
      myAnimeList.filter((myanime) => myanime.mal_id !== anime.mal_id)
    );
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAnimeData(search);
        setAnimeData(data); // Pode ser null (nenhum resultado) ou array de animes
      } catch (error) {
        console.error("Erro na API:", error);
        setAnimeData(null); // Força mostrar a tela de "não encontrado"
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      loadData();
    }, 500); // Debounce básico

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <Router>
      <Header search={search} setSearch={setSearch} />
      <Routes>
        <Route
          path={routesIndex.mainPage}
          element={
            isLoading ? (
              <div className="loading">Carregando...</div>
            ) : (
              <MainContent
                animeData={animeData}
                myAnimeList={myAnimeList}
                animeInfo={animeInfo}
                setAnimeInfo={setAnimeInfo}
                addToList={addToList}
                removeFromList={removeFromList}
              />
            )
          }
        />
        <Route path={routesIndex.signin} element={<SignIn />} />
        <Route path={routesIndex.signup} element={<SignUp />} />
        <Route
          path={routesIndex.profile}
          element={
            <Profile
              myAnimeList={myAnimeList}
              setAnimeInfo={setAnimeInfo}
              removeFromList={removeFromList}
            />
          }
        />
        <Route path={routesIndex.about} element={<About />} />
        <Route path={routesIndex.error404} element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
