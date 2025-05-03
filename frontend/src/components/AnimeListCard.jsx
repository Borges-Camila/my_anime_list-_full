import React from "react";

function AnimeListCard({
  animeList,
  setAnimeInfo,
  animeComponent,
  handleList,
  showNotFound = true,
}) {
  const ButtonComponent = animeComponent;
  return (
    <>
      {animeList ? (
        animeList.map((anime, index) => {
          return (
            <div
              className="card"
              key={index}
              onClick={() => setAnimeInfo(anime)}
            >
              <div className="card__img-container">
                <img
                  src={anime.images.jpg.large_image_url}
                  alt="Imagem do anime."
                  className="card__img"
                />
              </div>

              <div className="card__info">
                <h4 className="card__info-title">{anime.title}</h4>
                <div className="card__overlay">
                  <h5 className="card__overlay-title">
                    {anime.title_japanese}
                  </h5>
                  <div className="card__overlay-synopsis">
                    <p>{anime.synopsis}</p>
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleList(anime);
                    }}
                  >
                    <ButtonComponent />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : showNotFound ? (
        <section className="notFound">
          <h2>Anime não encontrado</h2>
          <p>Tente pesquisar outro título!</p>
          <img
            src="https://mystickermania.com/cdn/stickers/anime/spy-family-anya-guilty-512x512.png"
            alt="Anime Not Found"
            className="notFound__image"
          />
        </section>
      ) : null}{" "}
    </>
  );
}

export default AnimeListCard;
