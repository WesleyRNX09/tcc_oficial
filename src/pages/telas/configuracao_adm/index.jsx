import { useState } from "react";
import styles from "./index.module.css";

function ConfiguracaoAdm() {
  const [tema, setTema] = useState("escuro");

  return (
    <div className={styles.configContainer}>
      {/* MENU LATERAL */}
      <div className={styles.menuLateral}>
        <button className={`${styles.menuItem} ${styles.ativo}`}>
          ⚙ Geral
        </button>

        <button className={styles.menuItem}>
          👤 Conta
        </button>

        <button className={styles.menuItem}>
          🔔 Notificações
        </button>

        <button className={styles.menuItem}>
          🔒 Segurança
        </button>

        <button className={styles.menuItem}>
          ⓘ Sobre
        </button>
      </div>

      {/* CONTEÚDO */}
      <div className={styles.conteudo}>
        <h2 className={styles.titulo}>Geral</h2>

        <div className={styles.grupo}>
          <label>Idioma</label>

          <select className={styles.input}>
            <option>Português</option>
            <option>English</option>
            <option>Español</option>
          </select>
        </div>

        <div className={styles.grupo}>
          <label>Fuso Horário</label>

          <input
            type="text"
            value="UTC"
            readOnly
            className={styles.input}
          />
        </div>

        <div className={styles.grupo}>
          <label>Perfil</label>

          <input
            type="text"
            value="Perfil"
            readOnly
            className={styles.input}
          />
        </div>

        <div className={styles.grupo}>
          <label>Tema do Sistema</label>

          <div className={styles.temaContainer}>
            <button
              type="button"
              className={`${styles.temaBtn} ${
                tema === "escuro" ? styles.temaAtivo : ""
              }`}
              onClick={() => setTema("escuro")}
            >
              ● Escuro
            </button>

            <button
              type="button"
              className={`${styles.temaBtn} ${
                tema === "claro" ? styles.temaAtivo : ""
              }`}
              onClick={() => setTema("claro")}
            >
              ☼ Claro
            </button>
          </div>
        </div>

        <div className={styles.linha}></div>

        <div className={styles.botoes}>
          <button
            type="button"
            className={styles.cancelar}
          >
            Cancelar
          </button>

          <button
            type="button"
            className={styles.salvar}
          >
            Salvar alterações
          </button>
        </div>
      </div>
    </div>
  );
}



export default ConfiguracaoAdm;

