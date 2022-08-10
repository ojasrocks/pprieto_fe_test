import Image from 'next/image'
import styles from '../../styles/Header.module.css'

const Header = () => {
    const whatsin = '/assets/layout/Exports/Logos/logo.svg'
    return (
        <div id='whatsin' className={styles.header} style={{ left : '130px', top : '24px', width:'82%' }}>
            <Image src={whatsin} alt="Whatsin Logo" width={111} height={32}/>
            </div>
    )
}

export default Header