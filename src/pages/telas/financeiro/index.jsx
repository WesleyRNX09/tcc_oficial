import styles from './index.module.css';

function Financeiro() {
  return (

    <div className={styles.container}>

      <aside className={styles.sidebar}>

        <div className={styles.logo}>
          <h2>MAXCAR</h2>
          <p>OFICINA AUTOMOTIVA</p>
        </div>

        <button className={styles.btnFinanceiro}>
          FINANCEIRO
        </button>

        <nav className={styles.menu}>

          <a href="#">HISTÓRICO DE ORDEM DE SERVIÇO</a>

          <a href="#">ADICIONAR FUNCIONÁRIO</a>

          <a href="#">ATUALIZAR VEÍCULO</a>

          <a href="#">CADASTRAR VEÍCULO</a>

          <a href="#">RELATÓRIOS</a>

        </nav>

      </aside>

      <main className={styles.conteudo}>

        <header className={styles.topbar}>

          <nav className={styles.topMenu}>
            <a href="#">INÍCIO</a>
            <a href="#">SERVIÇOS</a>
          </nav>

          <div className={styles.usuario}>
            <span>Admin</span>
          </div>

        </header>

        <section className={styles.cards}>

          <div className={styles.card}>
            <h4>Peças</h4>
            <h2>R$650,00</h2>
            <p>Total de Peças</p>
          </div>

          <div className={styles.card}>
            <h4>Mão de Obra</h4>
            <h2>R$300,00</h2>
            <p>Total de Mão de Obra</p>
          </div>

          <div className={styles.card}>
            <h4>Total</h4>
            <h2>R$950,00</h2>
            <p>Total Geral</p>
          </div>

          <div className={styles.card}>
            <h4>Ordens</h4>
            <h2>8</h2>
            <p>Este mês</p>
          </div>

        </section>

        <section className={styles.filtros}>

          <input
            type="date"
            className={styles.inputData}
          />

          <input
            type="text"
            placeholder="Buscar por cliente, serviço ou placa"
            className={styles.inputBusca}
          />

        </section>

        <section className={styles.tabela}>

          <table>

            <thead>

              <tr>
                <th>Data</th>
                <th>Cliente</th>
                <th>Veículo / Placa</th>
                <th>Descrição</th>
                <th>Pagamento</th>
              </tr>

            </thead>

            <tbody>

              <tr>
                <td>13/03/2026</td>
                <td>Guilherme Luz</td>
                <td>BMW X1 LBD</td>
                <td>Troca de Pneus</td>
                <td>Pago</td>
              </tr>

              <tr>
                <td>15/05/2026</td>
                <td>Bruno Gil</td>
                <td>Jetta GLI</td>
                <td>Alinhamento</td>
                <td>Pendente</td>
              </tr>

              <tr>
                <td>24/02/2026</td>
                <td>Caio Takasaki</td>
                <td>911 GT3 RS</td>
                <td>Reparo de Freios</td>
                <td>Pago</td>
              </tr>

              <tr>
                <td>18/09/2026</td>
                <td>Matheus</td>
                <td>Onix LT 2021</td>
                <td>Troca de Filtros</td>
                <td>Pendente</td>
              </tr>

              <tr>
                <td>31/12/2026</td>
                <td>José Pedro</td>
                <td>Gol 2017</td>
                <td>Troca de Óleo</td>
                <td>Pago</td>
              </tr>

            </tbody>

          </table>

        </section>

      </main>

    </div>

  );
}

export default Financeiro;