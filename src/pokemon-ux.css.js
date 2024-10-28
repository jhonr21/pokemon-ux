import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
:host {
  display: block;
  font-family: "Arial", sans-serif;
  background: url("https://img.freepik.com/vector-gratis/fondo-efecto-zoom-degradado_23-2149722799.jpg?t=st=1730155103~exp=1730158703~hmac=b9deb369965894b6e9dc369bc6f4e50549307f1f7584a97ac2163a28e8ef335d&w=996") no-repeat center center fixed;
  background-size: cover;
  color: #333;
  padding: 20px;
}

.titulo-principal {
  font-size: 2.5rem;
  color: #ffcc00;
  text-align: center;
  margin-bottom: 20px;
}

.titulo-secundario {
  font-size: 1.5rem;
  color: #fff;
  text-align: center;
  margin-bottom: 15px;
}

.pokemon-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0;
}

.pokemon-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 10px;
  padding: 15px;
  text-align: center;
  width: 150px;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.pokemon-card:hover {
  transform: scale(1.05);
}

.pokemon-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin: 0 auto;
}

.cuerpo {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.titulo {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.tipo {
  font-weight: bold;
  color: #ff6699;
  margin-top: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 1000;
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal-title {
  font-size: 2.5rem;
  color: #ffcc00;
  text-align: center;
  margin-bottom: 10px;
}

.modal-image {
  max-width: 60%;
  height: auto;
  margin: 10px 0;
  border-radius: 10px;
}

.modal-subtitle {
  font-size: 1.8rem;
  color: #333;
  margin-top: 15px;
}

.evolution-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
}

.evolution-card {
  background: rgba(255, 200, 200, 0.8);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  flex: 1 1 120px;
  max-width: 150px;
}

.evolution-name {
  font-size: 1.2rem;
  color: #ff6699;
  margin-bottom: 5px;
}

.evolution-image {
  width: 80%;
  height: auto;
  margin: 0 auto;
  display: block;
  border-radius: 5px;
}

.evolution-type {
  font-size: 0.9rem;
  color: #666;
  margin-top: 5px;
}

.modal-close-button {
  background-color: #ff6699;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 24px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  align-self: center;
}

.modal-close-button:hover {
  background-color: #ff3385;
}

bbva-button-default {
  margin-top: auto;
}

@media (max-width: 768px) {
  .modal-title {
    font-size: 2rem;
  }
  .modal-image {
    max-width: 80%;
  }
  .evolution-container {
    gap: 10px;
  }
  .modal-close-button {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}
@media (max-width: 480px) {
  .modal-title {
    font-size: 1.8rem;
  }
  .modal-image {
    max-width: 90%;
  }
  .evolution-card {
    max-width: 100px;
    padding: 10px;
  }
  .evolution-name {
    font-size: 1rem;
  }
  .modal-close-button {
    padding: 8px 16px;
    font-size: 0.8rem;
  }
}
`;
