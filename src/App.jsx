import styles from './app.css';

function Atividade01() {
    return (
        <div className={styles.container}>
            <h1 className={styles.text}>Atividade 1</h1>
            <p className={styles.text}>Conteúdo mínimo para componente React</p>
           
            <div className={styles.cores}>
                <div className={styles.vermelho}></div>
                <div className={styles.verde}></div>
                <div className={styles.branco}></div>
                <div className={styles.amarelo}></div>
                
            </div>
        </div>
     

    )
}

export default Atividade01;