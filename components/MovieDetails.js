import Image from 'next/image'
import Router from 'next/router'
import styles from '../styles/MovieDetails.module.css'
import { useState , useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux';
import { increment , decrement , initialize} from '../components/store/storeFavs'
import _ from 'lodash'

export default function MovieDetails({ data }) {
    const [ arrowWhite, setArrowWhite ] = useState(false)
    const favs = useSelector((state)=> state.favs.value)
    const dispatch = useDispatch()
    const [heart,setHeart] = useState(favs.some(el => el === data.imdbID));
    const [hover,setHover] = useState(false);
    const actors = data["Actors"].includes(", ") ? data["Actors"].split(", ") : [data["Actors"]]
    const genre = data["Genre"].includes(", ") ? data["Genre"].split(", ") : [data["Genre"]]
    const director = data["Director"].includes(", ") ? data["Director"].split(", ") : [data["Director"]]
    const filteredRatings = data["Ratings"].filter(el => el.Source === 'Internet Movie Database' || el.Source === 'Rotten Tomatoes')
    const direct = '/assets/layout/Exports/Logos/logo-';
    const direct2heart = '/assets/layout/Exports/Icons/icon-heart-';
    const notAvailable = 'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg'

    useEffect( ()=>{
        let favourites = [];
        if (_.isEmpty(favs))
        {
        favourites = JSON.parse(localStorage.getItem('favourites'))
        dispatch(initialize(favourites))
        } else favs.forEach(element => {
            favourites.push(element)
        });
        if (heart && !favourites.some(el => el === data['imdbID'])){
            dispatch(increment(data.imdbID))
            favourites.push(data['imdbID'])
            localStorage.setItem('favourites', JSON.stringify(favourites))
        }
        if (!heart && favourites.some(el => el === data['imdbID'])){
            dispatch(decrement(data.imdbID))
            favourites = favourites.filter(elem => elem !== data['imdbID'])
            localStorage.setItem('favourites', JSON.stringify(favourites))
        }
    },[heart,data])

    return (
        <div className={styles.MovieDetails}>
            <div 
            id={`${data.imdbID}_arrow`}
            onClick={()=>Router.back()} 
            className={styles.arrowBack} 
            onMouseEnter={()=>setArrowWhite(true)}
            onMouseLeave={()=>setArrowWhite(false)}     
            >
                <Image 
                alt={`arrow`}
                src={`/assets/layout/Exports/Icons/icon-arrow-${arrowWhite ? 'white' : 'grey'}.svg`}
                width={'24px'}
                height={'24px'}
                />
            </div>
                <div className={styles.box} 
                id={`${data.imdbID}_box`}
                >
                        <div
                        className={styles.det}
                        id={`${data.imdbID}_data`}
                        >
                            <div className={styles.durationYearRate}
                            id={`${data.imdbID}_dyr`}>
                                <p className={styles.durationYear}>{data['Runtime'] !== 'N/A' ? `${data['Runtime']} · ${data['Year']} ·` : data['Rated'] !== 'N/A' ? `${data['Year']} ·` : `${data['Year']}`}
                                </p>
                                {data['Rated'] !== 'N/A' ? <p style={{
                                    backgroundColor:'#7A8C99',
                                    paddingLeft:'6px',
                                    paddingRight:'6px',
                                    paddingBottom:'4px',
                                    paddingTop:'4px',
                                    borderRadius:'4px',
                                    marginLeft:'8px'}}>
                                    {data['Rated']}
                                    </p> : <></>}
                            </div>
                            <p id={`${data.imdbID}_title`} className={styles.title}>{data["Title"]}</p>
                            <div id={`${data.imdbID}_ratings`} className={styles.ratings}>
                                {filteredRatings.map(el => <div key={el.Source} className={styles.valuation}>
                                    <div
                                    style={{
                                        backgroundColor: el.Source === 'Internet Movie Database' ? '#FF9F1C' : '#FF4040',
                                        height:'100%',
                                        alignItems:'center',
                                        paddingRight:'8px',
                                        paddingLeft:'8px',
                                        paddingBottom:'12px',
                                        paddingTop:'12px',
                                        borderTopLeftRadius:'4px',
                                        borderBottomLeftRadius: '4px'
                                    }}><Image 
                                    alt={el.Source}
                                    src={el.Source === 'Internet Movie Database' ? `${direct}imdb.svg` : `${direct}rotten-tomatoes.svg`} 
                                    width={el.Source === 'Internet Movie Database' ? '37px' : '17px'} 
                                    height={el.Source === 'Internet Movie Database' ? '17px' : '16px'}
                                    /></div>
                                    <div 
                                    style={{
                                        height:'100%',
                                        paddingRight:'9px',
                                        paddingLeft:'8px',
                                        paddingTop:'11px',
                                        paddingBottom:'9px',
                                        alignItems: 'center',
                                        borderTopRightRadius:'4px',
                                        borderBottomRightRadius: '4px',
                                        borderColor:'#353F4C',
                                        borderWidth: '1px',
                                        color:'white',
                                        borderStyle:'solid solid solid none'
                                    }}
                                    >
                                        <p style={{margin:0}}>{el.Value}</p>
                                    </div>
                                </div>) }

                                <div 
                                id={`${data.imdbID}_favourite`}
                                className={styles.favourite}
                                onMouseEnter={heart === true ? ()=>{} : ()=>setHover(true)}
                                onMouseLeave={heart === true ? ()=>{} : ()=>setHover(false)}
                                style={{
                                    borderColor: heart === true ? '#FF4040' : hover ? '#FF4040' : '#353F4C',
                                    backgroundColor: heart === true ? '#FF4040' : 'transparent',
                                    borderColor:'#353F4C',
                                    borderStyle: 'solid',
                                    borderWidth: '1px',
                                    borderRadius: '4px',
                                    paddingLeft: '12px',
                                    paddingRight: '16px'
                                }}
                                onClick={e => {
                                    e.preventDefault()
                                    setHeart(!heart)
                                }}
                                >
                                    <Image 
                                    alt={'heart'}
                                    src={`${direct2heart}${heart === true ? 'full' : hover ? 'white' : 'grey'}.svg`}
                                    width={'16px'} 
                                    height={'16px'} 
                                    style={{
                                        display:'absolute',
                                        backgroundColor:'transparent',
                                    }}
                                    />
                                    {heart === true ? <p style={{marginLeft: '12px'}}>Added</p>: <p style={{
                                        color: heart === true ? 'white' : hover ? 'white' : '#7A8C99',
                                        marginLeft: '12px'
                                    }}>Add to favourites</p>}
                                </div>
                            </div>
                            <div className={styles.plot} id={`${data.imdbID}_plot`}>
                                <p className={styles.subTitle}>Plot</p>
                                <p className={styles.element}>{data["Plot"]}</p>
                            </div>
                            <div className={styles.cgd} id={`${data.imdbID}_cgd`}>
                                <div className={styles.cast}>
                                    <p className={styles.subTitle}>Cast</p>
                                    <dl>
                                    {actors.map(el => <dt key={el} className={styles.element}>{el}</dt>)}
                                    </dl>
                                </div>
                                <div className={styles.genre}>
                                <p className={styles.subTitle}>Genre</p>
                                    <dl>
                                    {genre.map(el => <dt key={el} className={styles.element}>{el}</dt>)}
                                    </dl>
                                </div>
                                <div className={styles.director}>
                                <p className={styles.subTitle}>Director</p>
                                    <dl>
                                    {director.map(el => <dt key={el} className={styles.element}>{el}</dt>)}
                                    </dl>
                                </div>
                            </div>
                        </div>
                    <div >
                        <Image alt={`poster`} id={`${data.imdbID}_poster`} className={styles.poster} src={data["Poster"] === "N/A" ? notAvailable : data["Poster"]} width={'480px'} height={'640px'}/>
                    </div>
                </div>
        </div>
    )
}


//             <div className={styles.box}></div>
