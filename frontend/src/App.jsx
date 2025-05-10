import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
// biblioteca com o toast
import { Toaster, toast } from "sonner";

import Header from "./components/Header";
import MainContent from "./pages/MainContent";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { routesIndex } from "./routes";
import {
  NOT_FOUND_INDEX,
  EMPTY_RESULTS,
  DEBOUNCE_DELAY,
} from "./constants/constants";

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
    if (index === NOT_FOUND_INDEX) {
      setMyAnimeList([...myAnimeList, anime]);
      toast.success(`${anime.title} adicionado à sua lista!`);
    } else {
      toast.info(`${anime.title} já está na sua lista.`);
    }
  };

  const removeFromList = (anime) => {
    setMyAnimeList(
      myAnimeList.filter((myanime) => myanime.mal_id !== anime.mal_id)
    );
    toast.success(`${anime.title} removido da sua lista.`);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAnimeData(search);
        setAnimeData(data); // Pode ser null (nenhum resultado) ou array de animes
        if (!data || data.length === EMPTY_RESULTS) {
          toast.warning(`Nenhum resultado encontrado para "${search}"`);
        }
      } catch (error) {
        console.error("Erro na API:", error);
        setAnimeData(null); // Força mostrar a tela de "não encontrado"
        toast.error("Falha ao buscar animes. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      loadData();
    }, DEBOUNCE_DELAY); // Debounce básico

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <>
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
      <Toaster position="bottom-right" expand={false} richColors />
    </>
  );
}

export default App;
