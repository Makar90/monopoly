export let playersMinNum=2;
export let playersMaxNum=6;

export let bankSum= 194500;
export let bankMaxSum=300000;
export let bankMinSum=100000;

export let playerMoney=8000;
export let playerMaxMoney=(bankMaxSum/2)/playersMaxNum;

export let bonusForFullPlayFieldRound=2000;

export let prisonPrice= 500;
export let loteryBonus=1000;
export let loteryTryesNum=3;
export let gameSpeed=1;
export let skipStepsChanceCard=1;

export let shadovCurrentPlayerAndStepColor='orange';
export let shadovCurrentPlayerAndStep=`0px 0px 15px 15px ${shadovCurrentPlayerAndStepColor}`;

export function addBankSum(sum){
    bankSum = +bankSum + +sum;
}

export function storneBankSum(sum){
    bankSum = +bankSum - +sum;
}










export function setBankSum(value){
    bankSum=value;  
};

export function getrandomColorHEX () {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}; 

export function checkMinMaxPlayers(numPlayers){
    if (+numPlayers > playersMaxNum || +numPlayers<playersMinNum){
        alert(`Тільки від ${playersMinNum} до ${playersMaxNum} гравців`); 
        return false;
    } else{    
    return true;
    }
};