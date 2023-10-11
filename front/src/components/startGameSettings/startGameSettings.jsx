import React, { useState} from 'react';

import './index.css';
import PlayerSettingsCard from './playerSettingsCard/PlayerSettingsCard';
import OptionSettings from './optionSettings/OptionSettings';
import {playersMinNum,playersMaxNum,
        bankSum,bankMinSum,bankMaxSum,setBankSum,
        getrandomColorHEX, 
        checkMinMaxPlayers,
        playerMoney,playerMaxMoney} from '../../data/GlobalData'
import {PlayersData} from '../../data/PlayersData';


export default function StartGame(props){
    const [PlayersSettingsCards, setPlayersSettingsCards] = useState(getPlayerSettingsCards(playersMinNum));

    function getPlayerSettingsCards (numPlayers){
        let fieldsNames=[]
        for (let i=0; i<numPlayers;i++){
            fieldsNames.push(
                <PlayerSettingsCard key={i+1} index={i+1} color={getrandomColorHEX()}/>
                )
        };     
        return fieldsNames;        
    }; 

    function updatePlayerSettingsCards(event){
        let numPlayers=event.target.value;
        if (!checkMinMaxPlayers(numPlayers)){ 
            numPlayers=playersMinNum;
            event.target.value=PlayersSettingsCards.length;
        } else{    
            setPlayersSettingsCards(getPlayerSettingsCards (numPlayers));
        }
        setTotalMoney();
    };

    function pressStartButton(){
        let elementStartGameSettings = document.querySelector('.start-game');
        elementStartGameSettings.style.visibility='hidden';   
        
        let elementGameBudget=elementStartGameSettings.querySelector('#total-money');
        setBankSum(elementGameBudget.value);

        setPlayersData();
        props.reRenderPlayFieldSteps();//propsing function to here place for rerender steps on play field on playfield code file

        /*let elementInnerArea = document.querySelector('.inner-area');
        let elementGameProcessInfo = elementInnerArea.querySelector('.game-process-info');
        elementGameProcessInfo.classList.remove("game-process-info--hidden"); */
        let elementInnerAreaChildren = document.querySelector('.inner-area').childNodes;
        elementInnerAreaChildren.forEach((item)=>{            
            item.style.visibility='visible';
        });
        let elementManageOjects = document.querySelector('.manage-objects');
        elementManageOjects.style.visibility='hidden';

        function setPlayersData(){   
            let elementsPlayersCards= elementStartGameSettings.querySelectorAll('.set-player');         
            elementsPlayersCards.forEach((elementPlayer, elementItem)=>{
                let playerName = elementPlayer.querySelector('.set-player__player-name').value;
                let elementPlayerColor = elementPlayer.querySelector('.set-player__player-color');
                let playerColor = elementPlayerColor.querySelector('span').style.backgroundColor;
                let playerMoney=document.querySelector('#player-money').value; 
                let dataPlayer={
                    playerName:playerName,
                    playerColor:playerColor,
                    playerBudget:playerMoney,
                    playerPlayFieldPosition:0,
                    playetCurrentMove:elementItem===0 ? true:false,
                    playerActive:true,
                    playerSkipStep:0,
                    remoteStepPosibility: false,
                    playerLoteryGame:0,
                    prisonInvoiceFlag:false
                }; 
                PlayersData.push(dataPlayer);            
                }); 
            /* console.log('---Start---PlayersData');
            console.log(PlayersData);  */            
        }
    }

    function setTotalMoney(){
        let elementNumPlayers=document.querySelector('#num-players');
        let elementTotaMoney=document.querySelector('#total-money');
        let elementPlayerMoney=document.querySelector('#player-money');        
        elementTotaMoney.value=(bankSum-elementPlayerMoney.value*elementNumPlayers.value) >=0? bankSum-elementPlayerMoney.value*elementNumPlayers.value: 0 ;
    };   

    function onChangeTotalMoney(event){
        setBankSum(event.target.value);
    };   

    return(
        <div className="start-game">
            <h2 className='start-game__title'>Початок гри</h2>

            <OptionSettings
                OptionClassName='start-game__option'
                CodeId='num-players' 
                OptionName={`Кількість гравців (max-${playersMaxNum})`}
                OptionValueType='number'
                OptionValue={playersMinNum}
                OptionValueMin={playersMinNum}
                OptionValueMax={playersMaxNum}
                OptionValueOnChange={updatePlayerSettingsCards}
                />
            
            <div className="start-game__players-settings">
                {PlayersSettingsCards}
            </div>

            <OptionSettings
                OptionClassName='start-game__option'
                CodeId='total-money' 
                OptionName='Банк'
                OptionValueType='number'
                OptionValue={bankSum-(playerMoney*playersMinNum)}
                OptionValueMin={bankMinSum}
                OptionValueMax={bankMaxSum}
                OptionValueOnChange={onChangeTotalMoney}
                />

            <OptionSettings
                OptionClassName='start-game__option'
                CodeId='player-money' 
                OptionName='Бюджет на гравця'
                OptionValueType='number'
                OptionValue={playerMoney}
                OptionValueMin={playerMoney}
                OptionValueMax={playerMaxMoney}
                OptionValueOnChange={setTotalMoney}
                />      

            <button className='start-game__button-start'
                    onClick={pressStartButton}>
                Розпочати гру
            </button>
        </div>
        
    );
}