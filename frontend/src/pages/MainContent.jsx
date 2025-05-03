import React from "react";
import AnimeListCard from "../components/AnimeListCard";
import AnimeInfoSideBar from "../components/AnimeInfoSideBar";
import AddToMyList from "../components/AddToMyList";

function MainContent({ animeData, animeInfo, setAnimeInfo, addToList }) {
  return (
    <main className="main">
      <div className="main__sideBar">
        {animeInfo && <AnimeInfoSideBar animeInfo={animeInfo} />}
      </div>
      <div className="main__content">
        <h2 className="main__content-title">Animes</h2>
        <div className="main__content-row">
          <AnimeListCard
            animeList={animeData} // Pode ser null (mostrará "não encontrado")
            setAnimeInfo={setAnimeInfo}
            animeComponent={AddToMyList}
            handleList={addToList}
            showNotFound={true} // Nova prop para controlar a exibição
          />
        </div>
      </div>
    </main>
  );
}

export default MainContent;
