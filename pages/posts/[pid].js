import Header from '../../components/header/Header'
import MovieDetails from '../../components/MovieDetails'
import styles from '../../styles/Home.module.css'
import axios from 'axios'

const Post = ({ data , favourite }) => {

  return (
    <main className={styles.main}>
    <Header/>
    <MovieDetails data={data} fav={favourite} />
    </main>
    )
}

export default Post

export async function getServerSideProps(context) {
    const { query } = context;
    const { pid ,fav } = query;
    const favourite = fav === 'true';
    const res = await axios.get(`http://www.omdbapi.com/?i=${pid}&apikey=${process.env.customKey}`);
    const data = res.data;
    try {
      if (data.Error) {
        return {
          redirect: {
            permanent: false,
            destination: `/posts`
          },
        };  
    }
    } catch(e){console.throw(e);}
    return {
      props: {
        data,
        favourite
      },
    }
  }
