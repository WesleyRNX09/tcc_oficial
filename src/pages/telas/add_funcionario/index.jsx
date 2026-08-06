import { useState } from 'react';
import Botao from './botao'
import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png';

import ordemServiço from "../../../assets/historico_de_ordem.png";
import adicionarFuncionario from "../../../assets/adicionar_funcionario.png";
import carro from "../../../assets/carro.png";
import relatorio from "../../../assets/relatorio.png";
import notificacao from "../../../assets/notificacao.png";

import seta from "../../../assets/seta_esquerda1.png";

import { useNavigate } from "react-router-dom";
import styles from './index.module.css';

function os() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  
  return (
    <div className={styles.container}>

      <div className={styles.barra_Principal}>
          <div className={styles.barra_Logo}>
            <button
              className={`${styles.barra_menu_btn} ${menuAberto ? styles.barra_menu_btn_aberto : ''}`}
              onClick={() => setMenuAberto(!menuAberto)}
              aria-label="Abrir menu"
            >
              <span className={styles.barra_linha}></span>
              <span className={styles.barra_linha}></span>
              <span className={styles.barra_linha}></span>
            </button>
            <img src={logo} className={styles.barra_Imagem} />
          </div>

          {/*<div className={styles.barra_conteudo}>
            <Link to="/login" className={styles.barra_botao}>Serviços</Link>
            <Link to="/" className={styles.barra_botao}>Acompanhar Veiculo</Link>
            <Link to="/login" className={styles.barra_botao}>Fazer Login</Link>
          </div>*/}

          <div className={styles.barra_direita}>

          {/* Ícone de notificação — COLOQUE SEU ÍCONE/IMAGEM AQUI se quiser */}
          <button className={styles.barra_sino} aria-label="Notificações">
            {/* <img src={iconeSino} alt="Notificações" /> */}
            <img src={notificacao}></img>
          </button>

          {/* Card de perfil */}
          <div className={styles.barra_perfil}>
            {/* ÍCONE DO USUÁRIO — troque por <img src={iconePerfil} /> se tiver */}
            <div className={styles.barra_perfil_icone}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
                <circle cx="12" cy="8" r="4"/>
                <path strokeLinecap="round" d="M4 20c0-4 3.582-7 8-7s8 3 8 7"/>
              </svg>
            </div>

            <div className={styles.barra_perfil_info}>
              <span className={styles.barra_perfil_nome}>Admin</span>
              <span className={styles.barra_perfil_cargo}>Administrador</span>
            </div>

          </div>

        </div>

        
      </div>

      

      <div className={styles.home_conteudo}>

        {menuAberto && (
          <div className={styles.home_overlay} onClick={() => setMenuAberto(false)} />
        )}

        {/* Sidebar */}
        <div className={`${styles.home_margin1} ${menuAberto ? styles.home_margin1_aberto : ''}`} style={{ width: menuAberto ? '50rem' : '0', minWidth: menuAberto ? '50rem' : '0' }}>
          <div className={styles.home_margin1_inner}>
            <Botao texto="FINANCEIRO" acao={'vermelho'} aoClicar={() => navigate("/financeiro")} />

            <div className={styles.home_margin1_btn}>
              <img src={ordemServiço} className={styles.home_margin1_img} />
              <Link to="/os" className={styles.home_margin1_text}>HISTORICO DE ORDEM DE SERVIÇO</Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img src={adicionarFuncionario} className={styles.home_margin1_img} />
              <Link to="/login" className={styles.home_margin1_text}>ADICIONAR FUNCIONARIO</Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img src={carro} className={styles.home_margin1_img} />
              <Link to="/atualizar_veiculo" className={styles.home_margin1_text}>ATUALIZAR VEÍCULO</Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img src={carro} className={styles.home_margin1_img} />
              <Link to="/cadastroV" className={styles.home_margin1_text}>CADASTRAR VEÍCULO</Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img src={relatorio} className={styles.home_margin1_img} />
              <Link to="/login" className={styles.home_margin1_text}>RELATORIOS</Link>
            </div>
          </div>
        </div>

        <main className={styles.funcionario_conteudo}>
        {/* Cabeçalho */}
        <div className={styles.funcionario_cabecalho}>
          <button
            type="button"
            className={styles.funcionario_voltar}
            onClick={() => navigate(-1)}
            aria-label="Voltar"
          >
            <img src={seta} alt="Voltar" />
          </button>

          <div className={styles.funcionario_titulos}>
            <h1>Adicionar funcionário</h1>
            <p>Preencha dados abaixo para cadastrar um novo funcionário</p>
          </div>
        </div>

        {/* Formulário */}
        <form
          className={styles.funcionario_formulario}
          onSubmit={(evento) => {
            evento.preventDefault();
            console.log('Funcionário cadastrado');
          }}
        >
          {/* Dados pessoais */}
          <section className={styles.funcionario_secao}>
            <div className={styles.funcionario_titulo_secao}>
              <div className={styles.funcionario_icone_usuario}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="8" r="4" />

                  <path
                    d="M4 20c0-4 3.5-7 8-7s8 3 8 7"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h2>Dados Pessoais</h2>
            </div>

            <div className={styles.funcionario_grid}>
              <div className={styles.funcionario_campo}>
                <label htmlFor="nome">Nome completo</label>

                <input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Ex: Guilherme Luiz"
                  required
                />
              </div>

              <div className={styles.funcionario_campo}>
                <label htmlFor="cpf">CPF</label>

                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  placeholder="400.289.221-22"
                  required
                />
              </div>

              <div className={styles.funcionario_campo}>
                <label htmlFor="dataNascimento">
                  Data de Nascimento
                </label>

                <input
                  id="dataNascimento"
                  name="dataNascimento"
                  type="date"
                  required
                />
              </div>

              <div className={styles.funcionario_campo}>
                <label htmlFor="telefone">Telefone</label>

                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  placeholder="Ex: (11)40028922"
                  required
                />
              </div>

              <div className={styles.funcionario_campo}>
                <label htmlFor="email">Email</label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ex: xxxxxxxx@hotmail.com"
                  required
                />
              </div>

              <div className={styles.funcionario_campo}>
                <label htmlFor="endereco">Endereço</label>

                <input
                  id="endereco"
                  name="endereco"
                  type="text"
                  placeholder="Ex: R. Belterra, 291 - Santo Amaro"
                  required
                />
              </div>
            </div>
          </section>

          <div className={styles.funcionario_linha} />

          {/* Dados profissionais */}
          <section className={styles.funcionario_secao}>
            <div className={styles.funcionario_titulo_secao}>
              <h2>Dados Profissionais</h2>
            </div>

            <div className={styles.funcionario_grid}>
              <div className={styles.funcionario_campo}>
                <label htmlFor="cargo">Cargo</label>

                <select
                  id="cargo"
                  name="cargo"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Selecione o Cargo
                  </option>

                  <option value="mecanico">Mecânico</option>
                  <option value="atendente">Atendente</option>
                  <option value="gerente">Gerente</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>

              <div className={styles.funcionario_campo}>
                <label htmlFor="setor">Setor</label>

                <input
                  id="setor"
                  name="setor"
                  type="text"
                  placeholder="Ex: Mecânico"
                  required
                />
              </div>

              <div className={styles.funcionario_campo}>
                <label htmlFor="dataAdmissao">
                  Data de Admissão
                </label>

                <input
                  id="dataAdmissao"
                  name="dataAdmissao"
                  type="date"
                  required
                />
              </div>

              <div className={styles.funcionario_campo}>
                <label htmlFor="salario">Salário</label>

                <input
                  id="salario"
                  name="salario"
                  type="text"
                  placeholder="Ex: R$2000,00"
                  required
                />
              </div>
            </div>
          </section>

          <div className={styles.funcionario_linha} />

          {/* Acesso ao sistema */}
          <section className={styles.funcionario_secao}>
            <div className={styles.funcionario_titulo_secao}>
              <h2>Acesso ao Sistema</h2>
            </div>

            <div className={styles.funcionario_grid}>
              <div className={styles.funcionario_campo}>
                <label htmlFor="usuario">Usuário (Login)</label>

                <input
                  id="usuario"
                  name="usuario"
                  type="text"
                  placeholder="Ex: Guilherme Luiz"
                  required
                />
              </div>

              <div className={styles.funcionario_campo}>
                <label htmlFor="senha">Senha</label>

                <div className={styles.funcionario_senha}>
                  <input
                    id="senha"
                    name="senha"
                    type={senhaVisivel ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setSenhaVisivel(!senhaVisivel)}
                    aria-label={
                      senhaVisivel
                        ? 'Esconder senha'
                        : 'Mostrar senha'
                    }
                  >
                    {senhaVisivel ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <path d="M3 3l18 18" />
                        <path d="M10.5 6.2A9 9 0 0 1 12 6c6.5 0 10 6 10 6a16 16 0 0 1-3.1 3.8" />
                        <path d="M6.6 6.6C3.6 8.5 2 12 2 12s3.5 6 10 6a10 10 0 0 0 4-.8" />
                        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <div className={styles.funcionario_acoes}>
            <button
              type="button"
              className={styles.funcionario_cancelar}
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className={styles.funcionario_salvar}
            >
              SALVAR E ATUALIZAR
            </button>
          </div>
        </form>
      </main>

      </div>

    </div>
  );
}

export default os;