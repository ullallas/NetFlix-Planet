import React, { useEffect, useState } from 'react';

const SearchResultTvItem = ({ searchItem, search }) => {

    const KEY = "bc61587b22cd0e5226a33d30e467d867";
    const [backdrop, setBackdrop] = useState('');
    const [logo, setLogo] = useState({});

    const getImage = async () => {
        
        let backdrop = '';
        let logo = '';

        const json = await(
            await fetch(
                `https://api.themoviedb.org/3/tv/${ searchItem.id }/images?api_key=${ KEY }`)
                ).json();
        
        if(json.backdrops[0] != undefined){
            backdrop = json.backdrops[0].file_path;
            setBackdrop(backdrop);
        }

        let temp = json.logos.find((logo) => logo.iso_639_1 === 'ko');

        if(temp === undefined) { temp = json.logos.find((logo) => logo.iso_639_1 === 'en' || 'null');    }
        if(temp != undefined)  { setLogo(temp.file_path);  }
        else                   { setLogo('');              }
        
    };
    
    useEffect(() => {
        getImage();
    }, [search]);

    if(backdrop === ''){
        return;
    }
    else {
        return (
            <div className="c1-slider-item">
                <div className="c1-title-card-container css-0">
                    <div id="title-card-0-1" className="c1-title-card">
                        <div className="c1-ptrack-content">
                            <a role="link" aria-label="{state.title}" tabIndex="0" aria-hidden="false" className="c1-slider-refocus">
                                <div className="c1-boxart-size-16x9 c1-boxart-container c1-boxart-rounded">
                                    <img className='w-full rounded relative' src = {"https://image.tmdb.org/t/p/w500" + backdrop } />
                                    {
                                        logo === '' ?
                                        <div className='text-white font-extrabold w-full text-2xl absolute bottom-[10%] w-[80%] text-center mx-[10%]'>{ searchItem.name }</div> :
                                        <img className='w-full rounded absolute max-h-[100px] bottom-[10%] w-[70%] mx-[18%]' src = {"https://image.tmdb.org/t/p/w500" + logo } /> 
                                    }
                                </div>
                                <div className="c1-ptrack-content"></div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default SearchResultTvItem;