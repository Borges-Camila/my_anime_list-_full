import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about">
      <div className="about-content">
        <h1 className="about-content__title">Sobre o MyAnimeList</h1>

        <div className="about-section">
          <h2 className="about-section__subtitle">O que é este site?</h2>
          <p className="about-section__text">
            O MyAnimeList é seu álbum digital pessoal para explorar e registrar
            seus animes favoritos. Aqui você pode descobrir novos títulos,
            aprender sobre diferentes séries e criar sua própria coleção
            personalizada.
          </p>
          <p className="about-section__text">
            <strong>Novidade:</strong> Crie sua conta conosco para salvar sua
            lista permanentemente e acessá-la de qualquer dispositivo!
          </p>
        </div>

        <div className="about-features">
          <div className="about-features__card">
            <div className="about-features__icon">🔍</div>
            <h3>Busca Avançada</h3>
            <p>
              Encontre qualquer anime pelo nome e explore suas informações
              detalhadas
            </p>
          </div>

          <div className="about-features__card">
            <div className="about-features__icon">❤️</div>
            <h3>Lista Pessoal</h3>
            <p>Salve seus animes preferidos e monte sua coleção única</p>
          </div>

          <div className="about-features__card">
            <div className="about-features__icon">📚</div>
            <h3>Catálogo Completo</h3>
            <p>Acesse informações sobre centenas de animes em um só lugar</p>
          </div>

          <div className="about-features__card">
            <div className="about-features__icon">🔒</div>
            <h3>Área do Usuário</h3>
            <p> Crie seu perfil personalizado e listas sincronizadas!</p>
          </div>
        </div>

        <div className="about-section">
          <h2 className="about-section__subtitle">Como usar?</h2>
          <ol className="about-section__steps">
            <li>Pesquise um anime pelo nome na barra de busca</li>
            <li>Explore as informações e detalhes da série</li>
            <li>Adicione aos favoritos clicando no botão "Adicionar"</li>
            <li>Acesse sua lista pessoal a qualquer momento</li>
          </ol>
        </div>

        <div className="about-buttons">
          <Link to="/" className="about-button">
            Começar a explorar
          </Link>
          <Link to="#" className="about-button secondary">
            Saiba mais sobre atualizações
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
