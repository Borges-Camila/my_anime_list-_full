import { Link } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de cadastro aqui
  };

  return (
    <div className="auth">
      <div className="auth-card">
        <h2 className="auth-card__title">Crie sua conta</h2>

        <form onSubmit={handleSubmit} className="auth-card__form">
          <div className="auth-card__form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="auth-card__form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-card__form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-card__button">
            Cadastrar
          </button>
        </form>

        <div className="auth-card__footer">
          <p>
            Já tem uma conta? <Link to="/signin">Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
