import {CardsData,
        getObjectPositionByType,
        getObjectPrice
    } from './CardsData';
import {storneBankSum, addBankSum} from './GlobalData';

export let PlayersData=[
    /*{
        playerName:playerName,
        playerColor:playerColor,
        playerBudget:8000,
        playerPlayFieldPosition:0,
        playetCurrentMove:elementItem===0 ? true:false,
        playerActive:true,
        playerSkipStep:0,
        remoteStepPosibility: false,
        playerLoteryGame:0б
        prisonInvoiceFlag:false
    };  */ 
];

export function getCurrentPlayerPosition(){
    let currentPlayerPosition;
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            currentPlayerPosition=item.playerPlayFieldPosition
        }
    });
    return +currentPlayerPosition;
};

export function getCurrentPlayerPName(){
    let currentPlayerName;
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            currentPlayerName=item.playerName;
        }
    });
    return currentPlayerName;
};

export function getPlayerPName(playerNum){
    let PlayerName;
    playerNum= playerNum>=PlayersData.length ? 0 : playerNum;
    PlayersData.forEach((item, index)=>
    {
        if(index===playerNum){
            PlayerName=item.playerName;
        }
    });
    return PlayerName;
};

export function setCurrentPlayerPosition(position){
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            item.playerPlayFieldPosition=position;
        }
    });
};

export function setAllPlayersOnPosition(positionType){
    let cardPosition=getObjectPositionByType(positionType);
    PlayersData.forEach((item)=>
    {
            item.playerPlayFieldPosition=cardPosition;
    });
};

export function getCurrentPlayerColor(){
    let currentPlayerColor;
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            currentPlayerColor=item.playerColor
        }
    });
    return currentPlayerColor;
};

export function getCurrentPlayerBudget(){
    let currentPlayerBudget;
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            currentPlayerBudget=item.playerBudget;
        }
    });
    return +currentPlayerBudget;
};

export function getPlayerColor(playerId){
    let PlayerColor;
    PlayersData.forEach((item, index)=>
    {
        if(index===playerId){
            PlayerColor=item.playerColor
        }
    });
    return PlayerColor;
};

export function getCurrentPlayerNum(){
    let currentPlayer;
    PlayersData.forEach((item,index)=>
    {
        if(item.playetCurrentMove===true){
            currentPlayer=index;
        }
    });
    return +currentPlayer;
};

export function setCurrentPlayer(playerNum){
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            item.playetCurrentMove=false;
        }
    });
    PlayersData.forEach((item, index)=>
    {
        if(index=== +playerNum){
            item.playetCurrentMove=true;
        }
    });
};

export function moneyAddForPlayer(sum, playerId){
    PlayersData.forEach((item, index)=>
    {
        if(index===playerId){
            item.playerBudget=+item.playerBudget+ +sum;
        }
    });
};

export function moneyStorneForPlayer(sum, playerId){
    PlayersData.forEach((item, index)=>
    {
        if(index===playerId){
            item.playerBudget=+item.playerBudget+ -sum;
        }
    });
};

export function moneyAddForCurrentPlayer(sum){
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            item.playerBudget=+item.playerBudget+ +sum;
        }
    });
};

export function moneyStorneForCurrentPlayer(sum){
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            item.playerBudget=item.playerBudget- +sum;
        }
    });
};

export function moneyAddForAllPlayersByObjectType(sum, objectType){
    let owners=[];
    CardsData.forEach((item)=>
    {
        if(item.type===objectType && item.ownerId!==''){
            owners.push(item.ownerId);
        }
    });
    let ownersUnique=new Set(owners);
    ownersUnique=Array.from(ownersUnique);    
    ownersUnique.forEach((item)=>{
        moneyAddForPlayer(sum, +item);
    })
    storneBankSum(sum*ownersUnique.length);
};

export function moneyStorneForAllPlayersByObjectType(sum, objectType){
    let owners=[];
    CardsData.forEach((item)=>
    {
        if(item.type===objectType && item.ownerId!==''){
            owners.push(item.ownerId);
        }
    });
    console.log(`owners`);
    console.log(owners); 
    let ownersUnique=new Set(owners);
    ownersUnique=Array.from(ownersUnique);
    console.log(`ownersUnique`);
    console.log(ownersUnique);    
    ownersUnique.forEach((item)=>{
        moneyStorneForPlayer(sum, +item);
    });
    addBankSum(sum*ownersUnique.length);
};

export function getCurrentPlayerSkipStep(){
    let playerSkipStep;
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            playerSkipStep=item.playerSkipStep;
        }
    });
    return +playerSkipStep;
};

export function setCurrentPlayerSkipStepPlusNum(stepsCount){
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            item.playerSkipStep=+item.playerSkipStep+ +stepsCount;
        }
    });
};

export function setCurrentPlayerSkipStepMinusNum(stepsCount){
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            item.playerSkipStep=item.playerSkipStep - +stepsCount;
        }
    });
};

export function getCurrentPlayerRemoteStepPosibility(){
    let CurrentPlayerRemoteStepPosibility;
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            CurrentPlayerRemoteStepPosibility=item.remoteStepPosibility;
        }
    });
    return CurrentPlayerRemoteStepPosibility;
};

export function setCurrentPlayerRemoteStepPosibility(flag){
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            item.remoteStepPosibility=flag;
        }
    });
};

export function setAllPlayerRemoteStepPosibility(flag){
    PlayersData.forEach((item)=>
    {
        item.remoteStepPosibility=flag;
    });
};

export function setplayerLoteryGame(playerNum, countCubesPlay){
    PlayersData[playerNum].playerLoteryGame=countCubesPlay
}

export function getplayerLoteryGame(playerNum){
    return PlayersData[playerNum].playerLoteryGame;
}


export function getAllUniqueOwnerByTypeObject(objectType){
    let owners=[];
    CardsData.forEach((item)=>
    {
        if(item.type===objectType && item.ownerId!==''){
            owners.push(item.ownerId);
        }
    });
    let ownersUnique=new Set(owners);
    ownersUnique=Array.from(ownersUnique); 
    return ownersUnique;  
}

export function setAllPlayersByObjectTypeOnPositionByObjectType(objectTypeOwners, objectTypeGoalPosition){
    let goalPosition = getObjectPositionByType(objectTypeGoalPosition);
    let ownersUnique = getAllUniqueOwnerByTypeObject(objectTypeOwners);
    ownersUnique.forEach((item)=>{
        PlayersData[item].playerPlayFieldPosition=goalPosition;
    });
};



export function getCurrentPlayerPrisonInviceFlag(){
    let prisonInviceFlag;
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            prisonInviceFlag=item.prisonInvoiceFlag;
        }
    });
    console.log(prisonInviceFlag);
    return prisonInviceFlag;
};

export function setCurrentPlayerPrisonInviceFlag(flag){
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            item.prisonInvoiceFlag=flag;
        }
    });
};

export function setPrisonInviceFlagForPlayers(playersArray, flag){
    playersArray.forEach((index)=>{
        PlayersData[index].prisonInvoiceFlag=flag;
    })
};


export function getCurrentPlayerObjectPrice(){
    let objectPrice;
    PlayersData.forEach((player, playerIndex)=>
    {
        if(player.playetCurrentMove===true){
            objectPrice=getObjectPrice(player.playerPlayFieldPosition);
        };
    });
    console.log(objectPrice);
    return objectPrice;
};




