import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <img
          src="https://mystickermania.com/cdn/stickers/one-piece/one-piece-zoro-disguise-512x512.png"
          alt="Anime Not Found"
          className="not-found-content__image"
        />
        <h1 className="not-found-content__title">
          404 - Página não encontrada
        </h1>
        <p className="not-found-content__message">
          Oops! Parece que você se perdeu no mundo dos animes...
        </p>

        <Link to="/" className="not-found-content__home-button">
          Voltar para o caminho seguro
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
