import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
@charset "UTF-8";
:host {
  display: block;
  font-family: "Arial", sans-serif;
  background: url("https://img.freepik.com/vector-gratis/fondo-efecto-zoom-degradado_23-2149722799.jpg?t=st=1730155103~exp=1730158703~hmac=b9deb369965894b6e9dc369bc6f4e50549307f1f7584a97ac2163a28e8ef335d&w=996") no-repeat center center fixed;
  background-size: cover;
  color: #333;
  padding: 20px;
}

.pokemon-container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 30px;
  justify-items: center;
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

.pokemon-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
  color: #004481;
  margin-top: 10px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
}

.pagination span {
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

bbva-button-default {
  background-color: #1973d2;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

bbva-button-default:hover {
  background-color: #155a8a;
  transform: scale(1.05);
}

bbva-button-default:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

bbva-form-text {
  max-width: 80%;
  margin: 0 auto;
  display: block;
  text-align: center;
  margin-bottom: 2rem;
}

bbva-form-text label {
  display: block;
  text-align: center;
  margin: 0 auto;
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
  width: 150px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.evolution-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 5px 0;
}

.evolution-card img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.evolution-type {
  font-size: 0.9rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #1976d2;
  border-radius: 8px;
  padding: 5px 10px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.modal-close-button {
  background-color: #1973b8;
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
  background-color: #1973b8;
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
@media (max-width: 1024px) {
  .pokemon-container {
    grid-template-columns: repeat(3, 1fr); /* 3 columnas en pantallas medianas */
  }
}
@media (max-width: 768px) {
  .pokemon-container {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas en pantallas pequeñas */
  }
}
@media (max-width: 480px) {
  .pokemon-container {
    grid-template-columns: 1fr; /* 1 columna en pantallas muy pequeñas */
  }
}
`;
