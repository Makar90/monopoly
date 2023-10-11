import PlayFieldStepsCard from '../../playSteps/playFieldStepsCard/PlayFieldStepsCard';
import {getCurrentPlayerNum,
    } from '../../../../data/PlayersData';
import { CardsData} from '../../../../data/CardsData';
import { useState } from 'react';

import './index.css';

export default function ManageObjects(){
    const [ObjectCards, setObjectCards] = useState();

    function getObjectCards(){
        let playersObjects=[];
        CardsData.forEach((item,index)=>{
            if(item.ownerId===getCurrentPlayerNum()){
                playersObjects.push(item);
            }
        });
        console.log(`playersObjects`);
        console.log(playersObjects);
        
        let cards =    playersObjects.map((item,index)=>
                <PlayFieldStepsCard
                    key={index}
                    visibility={true}
                    styles={
                        {backgroundImage: `url(${item.faceBackground})`, 
                        backgroundSize:'contain'}
                    } 
                    /* onclickFunction={''} */
                    cardType={item.type}
                    cardName={item.name}
                    cardImage={item.img}
                    ownerIndicatorColor={''}
                    cardPrice={''}
                    />
            )
            setObjectCards(cards);
            console.log(`cards`);
        console.log(cards);
        console.log(`playersObjects`);
        console.log(playersObjects);
    }

    return(
        <div className='manage-objects manage-objects--hidden'>
            <button className='manage-objects__players-objects-title' onClick={getObjectCards}>Мої об'єкти</button>
            <h2>Ринок об'єктів</h2>
            <div>
                {ObjectCards}
            </div>
            
        </div>        
    )
} 