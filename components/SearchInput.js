import Image from 'next/image'
import styles from '../styles/SearchInput.module.css'
import { useState , useRef , useEffect } from 'react';
import LittleCard from './LittleCard';
import NoResult from './NoResult';
import EmptyResult from './EmptyResult';
import Loading from './Loading';
import axios from 'axios';
import _ from 'lodash';

function useOutsideAlerter({ ref , fun }) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            fun()
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref,fun]);
  }

export default function SearchInput() {
    const [inputValue,setInputValue] = useState('')
    const [values,setValues] = useState({});
    const [loading,setLoading] = useState(false);
    const [err,setErr] = useState('')
    const wrapperRef = useRef(null);

    function handleOutsideClick() {
        setValues({});
        setInputValue('')
    }


    useOutsideAlerter({ref : wrapperRef, fun: handleOutsideClick});
    
    const handleSearch = async (e) => {
        if (!e) e = window.event;
        var keyCode = e.code || e.key;
        if (keyCode == 'Enter'){
            let value = e.target.value;
            if (!!value)
            {
                setLoading(true);
                console.debug('loading',loading);
                setTimeout(()=>{setLoading(false);
                }, 4000);
                const resp = await fetchTitle(value)
                setValues(resp);
            } else setValues({})
        }
    } 

    const fetchTitle = async (title) => {
        const response = await axios.get(`http://www.omdbapi.com/?s=${title}&apikey=${process.env.customKey}`);
        const data = response.data;
        if (data["Response"] === "True") return {result: true, data: response.data["Search"]}
        setErr(response.data["Error"]);
        return {result:false,data:[response.data["Error"]]};
    }

    const magnifier = '/assets/layout/Exports/Icons/icon-magnifier-grey.svg'
    return (
        <div className={styles.search} ref={wrapperRef}>
            <div className={styles.searchInputs}>
            <div className={styles.searchIcon}>
                <Image src={magnifier} alt="Magnifier Icon" width={'16px'} height={'16px'} />
                </div>
            <input 
                style={{boxShadow:'none'}}
                type='text' 
                value={inputValue}
                placeholder='Search movies...'
                onChange={e => {
                    setInputValue(e.target.value);
                    if (e.target.value === '') setValues({})
                }} 
                onFocus={()=>{setInputValue('');setValues({})}}
                onKeyPress={handleSearch}
                />
            </div >
            {
            !loading && !_.isEmpty(values) 
            ?   <>
                    {
                        values.result ? 
                        <div className={styles.dataResult}>
                        {
                            values.data.map(el => <LittleCard key={el['imdbID']} value={el} fav={()=>{
                                const favourites = JSON.parse(localStorage.getItem('favourites'))
                                if (!_.isEmpty(favourites)) {
                                    if (favourites.some(elem => elem === el['imdbID'])) return true
                                } 
                                return false
                            }}/>)
                        }
                        </div> 
                        : values.data.map(el => 
                        <div className={styles.noResult}>
                        <NoResult/><h2 className={styles.subHeader}>{el}</h2>
                        </div>)
                    }</>
            : 
                loading ? <Loading/> : <EmptyResult/>
            }
        </div>
    )
}