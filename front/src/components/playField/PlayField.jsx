import React, { useState} from 'react';

import './index.css';
import PlayFieldCentralArea from './playFieldCentralArea/PlayFieldCentralArea';
import PlayFieldStepsCard from './playSteps/playFieldStepsCard/PlayFieldStepsCard';
import {CardsData} from '../../data/CardsData';
import StartGameSettings from '../startGameSettings/startGameSettings';
import {/* PlayersData,  */
        getCurrentPlayerPosition, /* setCurrentPlayerPosition, */
        /* getCurrentPlayerColor,*/
        getPlayerColor,
        /* getCurrentPlayer */} from '../../data/PlayersData';
import {shadovCurrentPlayerAndStep} from '../../data/GlobalData';

//import imaga from '../../img/cards/front-media.jpg';

function goStartSet(){
    let StartPanel= document.querySelector('.start-game');
    StartPanel.style.visibility='visible';
}; 
 
export default function PlayField(){ 
    //console.log({this:{style:{backgroundColor:'red'}}});
    /*     let cards=[];
    for(let i=41; i<=40; i++){
        cards.push(<CardCommon  key={i+1} cardName={i} cardImage='#1' cardPrice='2500' cardOwner="Igor"/>)
    } */              
    /*  const cardAreaStyle = {
        //backgroundImage: `url(${imaga})`, //`url(${CardsData[0].faceBackground})`,
        backgroundImage: `url('./img/cards/front-suplying.jpg')`,
        //backgroundImage:{require ('../../img/cards/front-media.jpg')},
        backgroundSize: 'cover',
    }; */ 
    

    const [playFieldSteps, setplayFieldSteps] = useState(
        CardsData.map((item, index) =>         
            <PlayFieldStepsCard 
            key={item.id} 
            onclickFunction={index===0 ? goStartSet : undefined}
            visibility={index===0 ? true : false}
            styles={index===0 ? 
                    {backgroundImage: `url(${item.faceBackground})`, backgroundSize:'contain', borderColor:'red'} 
                    : 
                    {backgroundImage: `url(${item.faceBackground})`, backgroundSize:'contain'}}                                     
            cardType={item.type} 
            cardName={item.name}  
            cardImage={item.img} 
            cardPrice={item.price}  
            cardOwner=""/>
        )      
    );           

    function renderPlayFieldStepsForProcess(){  
        /* console.log(getCurrentPlayerPosition());  
        setCurrentPlayerPosition(5);
        console.log('PlayersData'); 
        console.log(PlayersData); 
        console.log(getCurrentPlayerPosition());  */


        setplayFieldSteps(CardsData?.map((item, index) =>    
            <PlayFieldStepsCard 
                key={item.id} 
                onclickFunction={undefined}
                visibility={index===0 ? true : true}
                styles={index===getCurrentPlayerPosition() ? 
                        {backgroundImage: `url(${item.faceBackground})`, 
                        backgroundSize:'contain', 
                        boxShadow: shadovCurrentPlayerAndStep,
                        zIndex:99
                        } 
                        : 
                        {backgroundImage: `url(${item.faceBackground})`, 
                        backgroundSize:'contain'}
                    } 
                ownerIndicatorColor={item.ownerId !== '' ?
                                    `${getPlayerColor(item.ownerId)}`
                                    :
                                    ''
                                }
                cardType={item.type} 
                cardName={item.name} 
                cardImage={item.img} 
                cardPrice={item.price}  
            />
        ));
    }
    

    return(
        <div className='play-field'>            
            {playFieldSteps}
            <PlayFieldCentralArea reRenderPlayFieldSteps={renderPlayFieldStepsForProcess}/>
            <StartGameSettings reRenderPlayFieldSteps={renderPlayFieldStepsForProcess}/>
            {/* cards */}
            {/* <button onClick={getplayFieldSteps}>TEST</button> */}
        </div>
    );
}