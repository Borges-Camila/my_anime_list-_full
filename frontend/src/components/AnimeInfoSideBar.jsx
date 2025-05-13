import React from "react";
import { IoClose } from "react-icons/io5";

function AnimeInfoSideBar({ animeInfo, onClose }) {
  const {
    title,
    images: {
      jpg: { large_image_url },
    },
    source,
    rank,
    score,
    popularity,
    status,
    rating,
    duration,
    genres,
  } = animeInfo;

  return (
    <div className="sideBar">
      <button className="sideBar__close-btn" onClick={onClose}>
        <IoClose size={24} />
      </button>

      <div className="sideBar__header">
        <img
          src={large_image_url}
          alt={`Capa de ${title}`}
          className="sideBar__image"
        />
        <h2 className="sideBar__title">{title}</h2>
      </div>

      <div className="sideBar__content">
        <div className="sideBar__stats">
          <div className="stat-item">
            <span className="stat-label">Nota</span>
            <span className="stat-value">{score || "N/A"}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Ranking</span>
            <span className="stat-value">#{rank || "N/A"}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Popularidade</span>
            <span className="stat-value">#{popularity || "N/A"}</span>
          </div>
        </div>

        <div className="sideBar__details">
          <div className="detail-group">
            <h3 className="detail-title">Informações</h3>
            <div className="detail-item">
              <span>Origem:</span>
              <span>{source || "Desconhecida"}</span>
            </div>
            <div className="detail-item">
              <span>Status:</span>
              <span>{status || "Desconhecido"}</span>
            </div>
            <div className="detail-item">
              <span>Duração:</span>
              <span>{duration || "N/A"}</span>
            </div>
            <div className="detail-item">
              <span>Classificação:</span>
              <span>{rating || "N/A"}</span>
            </div>
          </div>

          {genres && (
            <div className="detail-group">
              <h3 className="detail-title">Gêneros</h3>
              <div className="genres-list">
                {genres.map((genre) => (
                  <span key={genre.mal_id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnimeInfoSideBar;
