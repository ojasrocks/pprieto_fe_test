import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import _ from 'lodash'


export default function LittleCard({value, fav}) {

    const notAvailable = 'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg'
    const [heart,setHeart] = useState(fav);
    const [overlay,setOverlay] = useState(false);
    const direct = '/assets/layout/Exports/Icons/icon-heart-'
    const mediaMatch = window.matchMedia('(max-width: 1000px)');
    const [matches, setMatches] = useState(mediaMatch.matches);
  
    useEffect(() => {
      const handler = e => setMatches(e.matches);
      mediaMatch.addListener(handler);
      return () => mediaMatch.removeListener(handler);
    });

    useEffect( ()=>{
        let favourites = JSON.parse(localStorage.getItem('favourites'))
        if (_.isEmpty(favourites)) favourites = [];
        if (heart && !favourites.some(el => el === value['imdbID'])){
            favourites.push(value['imdbID'])
            localStorage.setItem('favourites', JSON.stringify(favourites))
        }
        if (!heart && favourites.some(el => el === value['imdbID'])){
            favourites = favourites.filter(elem => elem !== value['imdbID'])
            localStorage.setItem('favourites', JSON.stringify(favourites))
        }
    },[heart])

    return (
        <div 
        id={value.imdbID}
        style={{
            position: 'relative',
            backgroundImage: `url(${value["Poster"] === "N/A" ? notAvailable : value["Poster"]})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: matches ? '180px 240px' : '100% 100%',
            maxHeight: '100%',
            maxWidth:'100%',
            backgroundPosition: 'center',
            borderRadius: '4px',
        }}
        onMouseEnter={()=>setOverlay(true)}
        onMouseLeave={()=>setOverlay(false)}
        >
            <div 
            id={`${value.imdbID}_heart`}
            style={{
                position:'absolute',
                top: '12px',
                right: '12px',
                zIndex: 1,
                visibility: heart || overlay ? 'visible' : 'hidden'
            }}><Image 
            src={`${direct}${heart ? 'full' : 'white'}.svg`}
            width={'16px'} 
            height={'16px'} 
            style={{
                display:'absolute',
                backgroundColor:'transparent',
            }}
            onClick={e => {
                e.preventDefault()
                setHeart(!heart)
            }}
            />
            </div>
            <div 
            id={`${value.imdbID}_overlay`}
            style={{
                top: 0,
                left: 0,
                backgroundColor: '#1B2329',
                overflow: 'hidden',
                width: '100%',
                height: '100%',
                opacity: overlay ? 0.9 : 0,
                borderRadius: '4px',
                display:'flex',
                flexFlow: 'column',
                justifyContent:'flex-end'
            }}>
            <Link href={`/posts/${value.imdbID}?fav=${heart}`}>
            <div 
            id={`${value.imdbID}_toclick`}
            style={{
                position:'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden',
                width: '100%',
                maxHeight:'100%',
                padding:'12px',
            }}>
                <div style={{
                    visibility: overlay ? 'visible' : 'hidden',
                    display:'flex',
                    flexFlow:'column',
                    overflowWrap: 'break-word',
                    maxHeight:'100%',
                    justifyContent:'space-evenly',
                }}><h3 style={{
                    color:'white',
                    textOverflow:'ellipsis',
                    marginBottom: 0,
                    fontSize: matches ? '1em' : '1.17em',
                    overflowY:'hidden'
                }}
                >{value["Title"]}</h3
                ><p style={{
                    color:'white',
                    marginTop: matches ? '6px':'12px',
                    marginBottom: 0,
                }}>{value["Year"]}</p></div>
            </div>
            </Link>
            </div>
        </div>
    )
}