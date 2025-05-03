import { Link } from "react-router-dom";
import { useState } from "react";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticação aqui
  };

  return (
    <div className="auth">
      <div className="auth-card">
        <h2 className="auth-card__title">Acesse sua conta</h2>

        <form onSubmit={handleSubmit} className="auth-card__form">
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
            Entrar
          </button>
        </form>

        <div className="auth-card__footer">
          <p>
            Não tem uma conta? <Link to="/signup">Cadastre-se</Link>
          </p>
          <p>
            <Link to="/forgot-password">Esqueci minha senha</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
