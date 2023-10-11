import './index.css';

import { useState } from "react";
import {PlayersData,
        getCurrentPlayerNum,
        setCurrentPlayer,
        getCurrentPlayerPName,
        getPlayerPName,
        getCurrentPlayerPosition,
        setCurrentPlayerPosition,
        getCurrentPlayerBudget,
        moneyAddForPlayer,
        moneyStorneForPlayer,
        getCurrentPlayerSkipStep,
        setCurrentPlayerSkipStepPlusNum,
        setCurrentPlayerSkipStepMinusNum,
        setCurrentPlayerRemoteStepPosibility,
        getCurrentPlayerRemoteStepPosibility,
        setplayerLoteryGame,
        getplayerLoteryGame,
        getCurrentPlayerObjectPrice,
        setCurrentPlayerPrisonInviceFlag,
        getCurrentPlayerPrisonInviceFlag
    } from '../../../../data/PlayersData';

import {CardsData,
        setPlayFieldCardOwner,
        checkObjectOwner,
        getObjectOwner,
        getObjectPrice,
        getObjectType,
        getObjectName,
        checkMunicipalTreasuresTypeCard,
        checkChanceTypeCard,
        checkBunkerTypeCard,
        checkLoteryTypeCard,
        checkZSUDonateTypeCard,
        checkPrisonTypeCard,
        checkChornobaivkaTypeCard,
        repriceForAllCardsByOneOwnerAndType,
        getRepricePrice_ForAllCardsByOneOwnerAndTypePlusOneObject
    } from '../../../../data/CardsData';

import {bonusForFullPlayFieldRound,
        bankSum,
        setBankSum,
        loteryBonus,
        loteryTryesNum,
        gameSpeed
    } from '../../../../data/GlobalData';

import {getRandomChanceCard
    } from '../../../../data/ChanceCardsData'

import {getRandomMunicipalTreasuresCard
    } from '../../../../data/MunicipalTreasuresCardsData';



import {GameRoundIncrement} from '../../../../data/TestData';

//import {TestStepsScenario, GameRound} from '../../../../data/TestData';

//import { useState } from "../../../../../public/img/cube-sides/";



function ifPrisonTypeCardStep(){
    //***object is a "Prison" type  (object owner is 'owner prohibited') 
    let objectPrice=getCurrentPlayerObjectPrice();                        
    if (checkPrisonTypeCard(getCurrentPlayerPosition())){
        if(window.confirm(`${getCurrentPlayerPName()}, ти потрапив на об'єкт - "В'язниця"!\nНажаль, наступні два ходи доведеться пропустити:(\nАбо ти можеш внести заставу і продовжувати гру\n\nВнести заставу: ${objectPrice}$?`)){
            moneyStorneForPlayer(objectPrice, getCurrentPlayerNum());
            setBankSum(+bankSum+objectPrice);
            alert(`${getCurrentPlayerPName()}, ти вніс заставу: ${objectPrice}$\nПропускати 2 наступні ходи не доведеться`);
            return true;
        }else{                                            
            setCurrentPlayerSkipStepPlusNum(2);
            alert(`Застава не внесена: ${objectPrice}$\n${getCurrentPlayerPName()}, доведеться пропустити 2 наступні ходи`);
            return false;
        }
    }
    //***********************************************
};



function showManageObjectWindow(){
    let elementManageOjects = document.querySelector('.manage-objects');
    elementManageOjects.classList.remove('manage-objects--hidden');
    if(elementManageOjects.style.visibility==='visible'){
        elementManageOjects.style.visibility='hidden'
    }else{
        elementManageOjects.style.visibility='visible'
    }
}



export default function GameControlPoints(props){
    const [PlayCube1, setPlayCube1] = useState(getPlayCube(0));
    const [PlayCube2, setPlayCube2] = useState(getPlayCube(0));    

    function getPlayCube(cubeValue){
        /* switch (cubeValue) {
            case 'start':
                cubeValue=0;
                break;
            case undefined:
                cubeValue=Math.floor(Math.random() * (6 - 1) + 1);
                break;
            default:
                break;
        }; */
        let cubeImage='';
        switch (cubeValue) {
            case 1:
                cubeImage='../img/cube-sides/cube-1.png';
                break;
           case 2:
                cubeImage='../img/cube-sides/cube-2.png';
                break;
            case 3:
                cubeImage='../img/cube-sides/cube-3.png';
                break;
            case 4:
                cubeImage='../img/cube-sides/cube-4.png';
                break;
            case 5:
                cubeImage='../img/cube-sides/cube-5.png';
                break;
            case 6:
                cubeImage='../img/cube-sides/cube-6.png';
                break;
            default:
                cubeImage='../img/cube-sides/cube-error.png';
          }
        let playcube=(
            <div className='game-control-poins__play-cube'
                    cubevalue={cubeValue}
                    style={{backgroundImage:`url(${cubeImage})`}}>
            </div>
        );
        return playcube; 
    }

    function MakePlayerMove(){ 
        //start functions      
        function GoToNextPlayerStep (){
            let nextPlayer = getCurrentPlayerNum()+1; 
            //nextPlayer = nextPlayer < PlayersData.length ?  nextPlayer : (0, GameRoundIncrement());
            if(nextPlayer>=PlayersData.length){
                nextPlayer=0;
                GameRoundIncrement();/* for Emulator */
            }
            //nextPlayer=0; //for player number control
            setCurrentPlayer(nextPlayer);
            props.reRenderGameProcessInfo_Players();
            props.reRenderPlayFieldSteps();
        };
        //function ifPrisonTypeCardStep(){};
        function checkSkipStepForPlayer(){
            if(getCurrentPlayerSkipStep()){ 
                setCurrentPlayerSkipStepMinusNum(1); 
                if(getCurrentPlayerSkipStep()>=1){
                    alert (`${getCurrentPlayerPName()}, нажаль даний хід та ще ${getCurrentPlayerSkipStep()} доведеться пропустити :(\nАле не здавайся! :)`);
                } else{                                
                    alert(`${getCurrentPlayerPName()}, нажаль даний хід доведеться пропустити :(`);
                }                                                
                GoToNextPlayerStep ();
                return true;                              
            }else{
                return false;
            }
        };        
        function MakePlayfieldStepsMove(playStepsCount){
            let newPlayFieldCardPosition=getCurrentPlayerPosition();
            let oldPlayFieldCardPosition=getCurrentPlayerPosition();
            let bonusForFullPlayFieldRoundFlag=false;
            let playStepsCounter=0;
            let playStepsTimerDelay = 100/gameSpeed;
            let playStepsTimer = setTimeout(function request() {
                if(playStepsCounter<playStepsCount){
                    //===Do steps wiev from one playfield to enother
                    playStepsCounter++;
                    playStepsTimer = setTimeout(request, playStepsTimerDelay);
                    newPlayFieldCardPosition= newPlayFieldCardPosition+1;                         
                    if(newPlayFieldCardPosition>=CardsData.length){
                        newPlayFieldCardPosition= newPlayFieldCardPosition-CardsData.length;
                        bonusForFullPlayFieldRoundFlag=true;
                    } 
                    setCurrentPlayerPosition(newPlayFieldCardPosition);
                    props.reRenderPlayFieldSteps();
                    props.reRenderGameProcessInfo_Players();
                    //===
                }else{
                    //===Do action on a focused Playfield in a PlayerMove 
                    //Start functions----------
                    function checkAndPromoteRemoteStepPosibility(){
                        if(getCurrentPlayerRemoteStepPosibility()){
                            setCurrentPlayerRemoteStepPosibility(false);
                            if(window.confirm(`${getCurrentPlayerPName()}, так як ти був у бомбосховищі це дає змогу тобі відмовитись від цього ходу і повернутись на початкову позицію\n\nВідмовитись?`)){                                    
                                setCurrentPlayerPosition(oldPlayFieldCardPosition);
                                bonusForFullPlayFieldRoundFlag=false;
                                GoToNextPlayerStep ();
                                return true;
                            }else{
                                return false;
                            }
                        }
                    }                        
                    function BonusforRound(bonusForFullPlayFieldRoundFlag){
                        //***bonus for full play round
                        if(bonusForFullPlayFieldRoundFlag /* &&  newPlayFieldCardPosition===0 /* 1 */){
                            moneyAddForPlayer(bonusForFullPlayFieldRound,getCurrentPlayerNum());
                            setBankSum(+bankSum- +bonusForFullPlayFieldRound);
                            props.reRenderGameProcessInfo_Players();
                            bonusForFullPlayFieldRoundFlag=false;

                            /*await
                            function sleep(ms) {
                                return new Promise(resolve => setTimeout(resolve, ms));
                            }                            
                            async function demo() {
                                for (let i = 0; i < 2; i++) {
                                    //тут чекаємо все що не тут продовжить своє виконання
                                    console.log(`Waiting ${i} seconds...`);
                                    await sleep(i * 1000);
                                    
                                }
                                //тут продовжуємо код
                                console.log('Done');
                            }                            
                            demo();
                            */

                            alert(`${getCurrentPlayerPName()}, вітаємо! Тобі прилетів бонус за пройдене коло: ${bonusForFullPlayFieldRound}$`);                              
                        }
                        //***********************************************
                    };
                    function BuyNotEmptyOwnerObject(objectOwner, objectPrice){
                        //***object owner (play field cards) is NOT empty and object owner not a 'owner prohibited'
                        if(objectOwner!==9999999){
                            //---is curent player owner object 
                            /* console.log(`objectOwner ${objectOwner}`);
                            console.log(`getCurrentPlayer() ${getCurrentPlayerNum()}`);
                            console.log(CardsData); */
                            if(objectOwner===getCurrentPlayerNum()){
                                alert (`${getCurrentPlayerPName()}, це твій об'єкт\nСтягуй вартість оренди його з інших гравців, що сюди потрапляють\nНабувай у власність більше об'єктів даного типу і збільшуй орендну плату`);
                            //-----------------------------------------------
                            }else{
                            //---IS NOT curent player owner object 
                                moneyStorneForPlayer(objectPrice, getCurrentPlayerNum());
                                moneyAddForPlayer(objectPrice,objectOwner);
                                props.reRenderGameProcessInfo_Players(); 
                                alert (`Цей об'єкт має власника: ${getPlayerPName(objectOwner)}\nНеобхідно заплатити орендну за перебування в ньому: ${objectPrice}$`);
                            }
                            //-----------------------------------------------
                        }
                        //***********************************************
                    };
                    function BuyEmptyOwnerObject(newPlayFieldCardPosition, objectPrice){   
                        //***object owner (play field cards) is empty and object owner not a 'owner prohibited' 
                        if(checkObjectOwner(newPlayFieldCardPosition)===false){                            
                            //---buy object or auction                            
                            let ObjectType=getObjectType(newPlayFieldCardPosition);
                            let ObjectName=getObjectName(newPlayFieldCardPosition);  
                            if(getCurrentPlayerBudget()-objectPrice<0){
                                //___auction object 
                                alert ('Нажаль у тебе недостатньо коштів на придбання цього об\'єкту \nБуде проведено аукціон');
                                objectAuction(ObjectType, ObjectName, objectPrice);
                                //_______________________________________________ 
                            }else if(window.confirm(`${getCurrentPlayerPName()}, бажаєш придбати об'єкт?\n     ${ObjectType}\n     ${ObjectName}\nВартість: ${objectPrice}$\nЦіна оренди твоїх об'єктів цього типу становитиме: ${getRepricePrice_ForAllCardsByOneOwnerAndTypePlusOneObject(getCurrentPlayerNum(), newPlayFieldCardPosition)}$\n\nГравцям рекомендується купувати будь-яку власність, оскільки якщо в банку залишаються непродані об'єкти, втрачається інтерес до гри`)){
                                //___buy object
                                moneyStorneForPlayer(objectPrice, getCurrentPlayerNum());
                                setBankSum(+bankSum+objectPrice);
                                setPlayFieldCardOwner(newPlayFieldCardPosition, getCurrentPlayerNum());
                                repriceForAllCardsByOneOwnerAndType(getCurrentPlayerNum(), newPlayFieldCardPosition)
                                props.reRenderPlayFieldSteps(); 
                                props.reRenderGameProcessInfo_Players();
                                alert (`Вітаємо тебе ${getCurrentPlayerPName()}! \nОб'єкт:\n     ${ObjectType}\n     ${ObjectName}\nнабуто у власність`);  
                                //_______________________________________________ 
                            }else{
                                //___auction object  
                                    objectAuction(ObjectType, ObjectName, objectPrice);  
                                }
                                //_______________________________________________ 
                        }
                    };
                    function ifMunicipalTreasuresTypeCardStep(){
                        //***object is a "Municipal treasures" type (object owner is 'owner prohibited')
                        //let stepsToGoal=0;                       
                        if (checkMunicipalTreasuresTypeCard(newPlayFieldCardPosition)){
                            let MunicipalTreasuresCard=getRandomMunicipalTreasuresCard();
                            alert (`Випала картка "Міська скарбниця":\n\n${MunicipalTreasuresCard.message}`);
                            MunicipalTreasuresCard.action();
                            //reget price if playtr check Municipal prison -for correct price-object wiev
                            objectPrice= getObjectPrice(getCurrentPlayerPosition());
                        }
                        //return stepsToGoal;
                        //***********************************************
                    };
                    function ifChanceTypeCardStep(){
                        //***object is a "Chance" type  (object owner is 'owner prohibited')                          
                        if (checkChanceTypeCard(newPlayFieldCardPosition)){
                            let ChanceCardData=getRandomChanceCard();
                            alert (`Випала картка "Шанс":\n\n${ChanceCardData.message}`);
                            ChanceCardData.action();
                        }
                        //***********************************************
                    };
                    function ifBunkerTypeCardStep(){
                        //***object is a "Bunker" type  (object owner is 'owner prohibited')                         
                        if (checkBunkerTypeCard(newPlayFieldCardPosition)){
                            setCurrentPlayerRemoteStepPosibility(true);
                            alert (`${getCurrentPlayerPName()}, ти потрапив до бомбосховища!\nЦе дає тобі змогу відмовитись від наступного ходу зрозумівши, що зіграна комбінація кубиків тебе не влаштовує\n\nНаприклад якщо ти потрапиш на об'єкт з орендою, натомість хочеш зберегти кошти`);
                        }
                        //***********************************************
                    };
                    function ifLoteryTypeCardStep(){
                        if (checkLoteryTypeCard(getCurrentPlayerPosition())){
                            let playerLoteryGame=PlayersData[getCurrentPlayerNum()].playerLoteryGame;
                            alert (`${getCurrentPlayerPName()}, ти потрапив на поле лотереї\nКинь кубики х${playerLoteryGame<loteryTryesNum ? loteryTryesNum : playerLoteryGame} разів, якщо хоча б раз випаде дубль, то отримаєш бонус ${loteryBonus}$ з банку`);
                            playerLoteryGame<loteryTryesNum && setplayerLoteryGame(getCurrentPlayerNum(),loteryTryesNum);
                            elementGameControlPoinsMakeMove.classList.add("game-control-poins__make-move--lotery");
                            return true;
                        }else{
                            return false;
                        }
                    };
                    function ifZSUDonateTypeCardStep(){
                        //***object is a "Donate for ZSU" type  (object owner is 'owner prohibited')                         
                        if (checkZSUDonateTypeCard(newPlayFieldCardPosition)){
                            alert (`${getCurrentPlayerPName()}, ти донатиш на ЗСУ - ${objectPrice}$ \nТак тримати!`);
                            moneyStorneForPlayer(objectPrice, getCurrentPlayerNum());
                            setBankSum(+bankSum+objectPrice);
                        }
                        //***********************************************
                    };
                    
                    function ifChornobaivkaTypeStep(){        
                        //***object is a "Step burn" type  (object owner is 'owner prohibited')                         
                        if (checkChornobaivkaTypeCard(newPlayFieldCardPosition)){
                            alert (`${getCurrentPlayerPName()}, нажаль наступний хід доведеться пропустити :(\nАле не здавайся! :)`);
                            setCurrentPlayerSkipStepPlusNum(1);
                        }
                        //***********************************************
                    }; 
                    function objectAuction(ObjectType, ObjectName, objectPrice){
                        alert (`аукціон (in progress)\n ${ObjectType} - [${ObjectName}]: ${objectPrice}`);
                    };
                    //End functions----------                  

                    if(checkAndPromoteRemoteStepPosibility()){ 
                        return;
                    }
                    BonusforRound(bonusForFullPlayFieldRoundFlag);
                    let objectPrice= getObjectPrice(newPlayFieldCardPosition);
                    let objectOwner=getObjectOwner(newPlayFieldCardPosition);
                    BuyNotEmptyOwnerObject(objectOwner, objectPrice);
                    BuyEmptyOwnerObject(newPlayFieldCardPosition, objectPrice);  
                    ifMunicipalTreasuresTypeCardStep(); 
                    ifChanceTypeCardStep();                    
                    ifBunkerTypeCardStep();
                    if(ifLoteryTypeCardStep()){
                        return;
                    };
                    ifZSUDonateTypeCardStep();
                    ifPrisonTypeCardStep();
                    ifChornobaivkaTypeStep();                    
                    GoToNextPlayerStep (); 
                    playStepsTimer='';
                    return playStepsTimer;
                    //===
                }            
            }, playStepsTimerDelay);
        };
        function CubesGenerate(type){
            let cubeValue1;
            let cubeValue2;            
            let generateCubeEffectsCount=20;
            let generateCubeEffectsCounter=0;
            let generateCubeTimerDelay = 50/gameSpeed;
            let generateCubeTimer = setTimeout(function request() {
                if(generateCubeEffectsCounter<generateCubeEffectsCount){
                    cubeValue1=Math.floor(Math.random() * (6 - 1) + 1);
                    cubeValue2=Math.floor(Math.random() * (6 - 1) + 1);
                    generateCubeTimer = setTimeout(request, generateCubeTimerDelay);
                    generateCubeEffectsCounter++;
                    setPlayCube1(getPlayCube(cubeValue1));        
                    setPlayCube2(getPlayCube(cubeValue2));        
                }else{
                    elementGameControlPoinsMakeMove.style.pointerEvents= 'all';
                    //===Make animate move on play step / play field cards (go to playFieldCard - go to each with deley)
                    if(type==='MakePlayFieldSteps'){
                        let playStepsCount=+cubeValue1+ +cubeValue2;
                                //EmulatorTest on/off start
                                /* if(TestStepsScenario[getCurrentPlayerNum()][GameRound]){
                                    playStepsCount=TestStepsScenario[getCurrentPlayerNum()][GameRound];
                                    //console.log(TestStepsScenario[getCurrentPlayerNum()][GameRound]);
                                }
                                if(GameRound===11 && getCurrentPlayerNum()===1){
                                    moneyStorneForPlayer(7000, getCurrentPlayerNum());
                                }  
                                //EmulatorTest on/off end  */                           
                                
                                //playStepsCount=3; 
                                //10 -bunker
                                //28 - ZSU donat
                                //30 -prison
                                //38 -chornobaivka
                            //-----------------------------------------
                        MakePlayfieldStepsMove(playStepsCount);
                    }
                    if(type==='Lotery'){  
                        console.log(`Лотерея: ${cubeValue1} : ${cubeValue2}`); 
                        if(cubeValue1===cubeValue2){
                            moneyAddForPlayer(loteryBonus, getCurrentPlayerNum());
                            setBankSum(bankSum-loteryBonus);
                            setplayerLoteryGame(getCurrentPlayerNum(),0);
                            alert(`${getCurrentPlayerPName()}, вітаю!\nБонус ${loteryBonus}$ твій :)`);             
                        }else{                  
                            setplayerLoteryGame(getCurrentPlayerNum(),+getplayerLoteryGame(getCurrentPlayerNum())-1);
                        }
                        if(getplayerLoteryGame(getCurrentPlayerNum())===0){ 
                            elementGameControlPoinsMakeMove.classList.remove("game-control-poins__make-move--lotery"); 
                            alert(`${getCurrentPlayerPName()}, лотерея завершена!\nВ гру вступає наступний гравець- ${getPlayerPName(getCurrentPlayerNum()+1)}`);             
                            GoToNextPlayerStep ();
                        }
                    }
                    generateCubeTimer='';
                    return generateCubeTimer;
                }            
            }, generateCubeTimerDelay);
        };        
        //end functions
        

        //disable double click on playMoveButton
        let elementGameControlPoinsMakeMove = document.querySelector('.game-control-poins__make-move');
        elementGameControlPoinsMakeMove.style.pointerEvents= 'none';
        
        //catch prison invoice
        if (getCurrentPlayerPrisonInviceFlag()){
            setCurrentPlayerPrisonInviceFlag(false);
            props.reRenderPlayFieldSteps();
            props.reRenderGameProcessInfo_Players();
            if(!ifPrisonTypeCardStep()){
                GoToNextPlayerStep ();
                elementGameControlPoinsMakeMove.style.pointerEvents= 'all';
                return;
            }            
        }; 

        //cath skip move for player
        if (checkSkipStepForPlayer()){
            elementGameControlPoinsMakeMove.style.pointerEvents= 'all';
            return;
        } 
        //split generateCubex for lotery and playfieldMove
        if(getplayerLoteryGame(getCurrentPlayerNum())>0){
            CubesGenerate('Lotery');           
        }else{
            CubesGenerate('MakePlayFieldSteps');
        }
    }
        
    
        

    return(
        <div className={`game-control-poins${props.hidden ? " game-control-poins--hidden": ""}`}>
            <button className="game-control-poins__item"
                    /* onClick={setTimeout(RandomPlayCubes, 1000)} */
                    onClick={showManageObjectWindow}
                    >
                Управління об'єктами
            </button>
            <button className="game-control-poins__item game-control-poins__make-move"
                    /* onClick={setTimeout(RandomPlayCubes, 1000)} */
                    onClick={MakePlayerMove}
                    >
                {/* <div className='game-control-poins__play-cubes'> */}
                    {PlayCube1}
                    {PlayCube2}
                {/* </div> */}
            </button>
        </div>
    )
}