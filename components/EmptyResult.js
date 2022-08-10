import Image from 'next/image'
import styles from '../styles/EmptyResult.module.css'

export default function EmptyResult() {
    const horsehead = '/assets/layout/Exports/Illustrations/illustration-empty-state@2x.png'

    return (
        <div className={styles.emptyResult}>
        <Image src={horsehead} width={`396px`} height={`193px`}/>
        
        <h2 className={styles.header2}>{`Don’t know what to search?`}</h2>
        <p className={styles.paragraph}>{`Here’s an offer you can’t refuse`}</p>
        </div>
    )
}