import Header from '../components/header/Header'
import SearchInput from '../components/SearchInput'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
      <main className={styles.main}>
      <Header/>
      <SearchInput/>
      </main>
  )
}
