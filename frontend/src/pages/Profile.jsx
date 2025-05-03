import { useState } from "react";
import AnimeListCard from "../components/AnimeListCard";
import RemoveFromMyList from "../components/RemoveFromMyList";

function Profile({ myAnimeList, removeFromList, setAnimeInfo }) {
  const [name, setName] = useState("Usuário");
  const [email, setEmail] = useState("usuario@exemplo.com");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [tempImageUrl, setTempImageUrl] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Atualiza a URL da imagem apenas se foi fornecida uma nova
    if (tempImageUrl) {
      setProfileImageUrl(tempImageUrl);
      setTempImageUrl("");
    }
    setShowEditModal(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <div
            className="profile-image"
            style={{
              backgroundImage: `url(${
                profileImageUrl || "/default-avatar.png"
              })`,
              cursor: "pointer",
            }}
            onClick={() => setShowEditModal(true)}
          >
            {!profileImageUrl && (
              <div className="profile-image-overlay">
                <span>Adicionar foto</span>
              </div>
            )}
          </div>

          <div className="profile-details">
            <h2>{name}</h2>
            <p>{email}</p>
            <button
              className="edit-profile-button"
              onClick={() => setShowEditModal(true)}
            >
              Editar Perfil
            </button>
          </div>
        </div>
      </div>

      <div className="profile-anime-list">
        <h2 className="section-title">Minha Lista de Animes</h2>

        {myAnimeList.length > 0 ? (
          <div className="anime-grid">
            <AnimeListCard
              animeList={myAnimeList}
              setAnimeInfo={setAnimeInfo}
              animeComponent={RemoveFromMyList}
              handleList={removeFromList}
              showNotFound={false}
            />
          </div>
        ) : (
          <div className="empty-list-message">
            <p>Sua lista está vazia. Adicione animes na página principal!</p>
            <a href="/" className="browse-link">
              Explorar Animes
            </a>
          </div>
        )}
      </div>

      {/* Modal de Edição */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <button
              className="modal-close-btn"
              onClick={() => {
                setTempImageUrl("");
                setShowEditModal(false);
              }}
            >
              &times;
            </button>

            <div className="modal-header">
              <h3>Editar Perfil</h3>
              <p>Atualize suas informações pessoais</p>
            </div>

            <form onSubmit={handleSaveChanges}>
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>URL da Imagem de Perfil</label>
                <div className="image-input-container">
                  <input
                    type="url"
                    placeholder="https://exemplo.com/foto.jpg"
                    value={tempImageUrl}
                    onChange={(e) => setTempImageUrl(e.target.value)}
                    className="form-input"
                  />
                </div>
                {tempImageUrl && (
                  <div className="image-preview">
                    <p>Pré-visualização:</p>
                    <div className="preview-image-container">
                      <img
                        src={tempImageUrl}
                        alt="Pré-visualização"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-buttons">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setTempImageUrl("");
                    setShowEditModal(false);
                  }}
                >
                  Cancelar
                </button>
                <button type="submit" className="save-button">
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
