import Image from 'next/image'
import styles from '../styles/EmptyResult.module.css'

export default function EmptyResult() {
    const spinner = '/horseblue.gif'

    return (
        <div className={styles.emptyResult}>
        <Image src={spinner} width={`498px`} height={`486px`}/>
        
        <h2 className={styles.header2}>{`Loading...`}</h2>
        </div>
    )
}