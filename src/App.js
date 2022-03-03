import React, { useEffect, useState } from "react";
import './App.css'
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie/FeaturedMovie"
import Header from "./components/Header/Header"

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredDate, setFeaturedDate] = useState(null);
  const [blackHeader, setblackHeader] = useState(false);


  useEffect(() => {
    const loadAll = async () => {
      //pegando os filmes
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //pegar o filme em destaque
      let topRated = list.filter(i => i.slug === 'topRated')
      let randomChoose = Math.floor(Math.random() * (topRated[0].items.results.length - 1))
      let chosen = topRated[0].items.results[randomChoose]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedDate(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () =>{
      if (window.scrollY > 10) {
        setblackHeader(true);
      }else {
        setblackHeader(false);
      }
    }
    
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])
  

  return (
    <div className="page">   
      <Header black={blackHeader}/>

      {featuredDate &&
        <FeaturedMovie item={featuredDate}  />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        <p>
          Feito Por Felipe Baz Mitsuishi<br/>
          Direitos de imagem para Netflix<br/>
          Dados pegos do site Themoviedb.org
        </p>
      </footer>
      
      {movieList.length <= 0 && 
        <div className="loading">
            <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="NetFlix loading" />
        </div>
      }
    </div>
  );
}
