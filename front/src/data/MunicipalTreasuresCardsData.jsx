import {/* setCurrentPlayerSkipStepPlusNum, */
        moneyStorneForCurrentPlayer,
        moneyAddForCurrentPlayer,
        moneyAddForAllPlayersByObjectType,
        moneyStorneForAllPlayersByObjectType,
        setAllPlayersOnPosition,
        setAllPlayerRemoteStepPosibility,
        setCurrentPlayerPosition,
        setAllPlayersByObjectTypeOnPositionByObjectType,
        getAllUniqueOwnerByTypeObject,
        setPrisonInviceFlagForPlayers,
        getCurrentPlayerNum,
        setplayerLoteryGame
        /* getCurrentPlayerPosition */
    } from './PlayersData';

import {/* skipStepsChanceCard, */
        addBankSum,
        storneBankSum
    } from './GlobalData';

import {getObjectPositionByType} from './CardsData';



export let MunicipalTreasuresCards=[
    {
        id:1,
        type:'bonus',
        price:300,
        action(){moneyAddForCurrentPlayer(this.price); storneBankSum(this.price)},
        img:'',
        usageflag:false,
        get message(){return `Ти повідомив про знаходження техніки свинособак\nОтримуй: ${this.price}$`},
    },
    {
        id:2,
        type:'bonus',
        price:300,
        action(){moneyAddForCurrentPlayer(this.price); storneBankSum(this.price)},
        img:'',
        usageflag:false,
        get message(){return `Влада надає тобі фінансову допомогу\nОтримуй: ${this.price}$`},
    },
    {
        id:3,
        type:'fine',
        price:200,
        action(){moneyStorneForCurrentPlayer(this.price); addBankSum(this.price)},
        img:'',
        usageflag:false,
        get message(){return `Віталій Кличко просить гасити світло для економії\nШтраф: ${this.price}$`},
    },
    {
        id:4,
        type:'bonusByType',
        price:300,
        action(){moneyAddForAllPlayersByObjectType(this.price, 'ЗСУ');},
        img:'',
        usageflag:false,
        get message(){return `Залужний повідомляє про розгромлення руснявої армії\nВласники ЗСУ отримуйте: ${this.price}$`},
    },
    {
        id:5,
        type:'bonusByType',
        price:300,
        action(){moneyAddForAllPlayersByObjectType(this.price, 'ЗСУ');},
        img:'',
        usageflag:false,
        get message(){return `Міністр оборони повідомляє про поставку нової системи ППО\nВласники ЗСУ отримуйте: ${this.price}$`},
    },
    {
        id:6,
        type:'bonusByType',
        price:300,
        action(){moneyAddForAllPlayersByObjectType(this.price, 'Постачання');},
        img:'',
        usageflag:false,
        get message(){return `Міністр закордонних справ анонсував домовленості про очікувані нові постачання\nВласники об'єктів "Постачання" отримують: ${this.price}$`},
    },
    {
        id:7,
        type:'bonusByType',
        price:200,
        action(){moneyAddForAllPlayersByObjectType(this.price, `Стратегічний об'єкт`);},
        img:'',
        usageflag:false,
        get message(){return `Радник президента заявляє про видачу допомоги власникам стратегічних об'єктів ${this.price}$`},
    },
    {
        id:8,
        type:'fineByType',
        price:200,
        action(){moneyStorneForAllPlayersByObjectType(this.price, 'Гуманітарна допомога');},
        img:'',
        usageflag:false,
        get message(){return `Голова Миколаївської ОДА просить власників "Гуманітарної допомоги" виділити кошти для Миколаєва: ${this.price}$`},
    },
    {
        id:9,
        type:'fineByType',
        price:200,
        action(){moneyStorneForAllPlayersByObjectType(this.price, 'Постачання');},
        img:'',
        usageflag:false,
        get message(){return `Голова Харківської ОДА просить власників "Постачання" виділити кошти для оборони області: ${this.price}$`},
    },
    {
        id:10,
        type:'fineByType',
        price:200,
        action(){moneyStorneForAllPlayersByObjectType(this.price, 'Виробництво пакетів');},
        img:'',
        usageflag:false,
        get message(){return `Начальник військової адміністрації Кривого Рогу просить власників "Виробництва пакетів" виділити: ${this.price}$`},
    },
    {
        id:11,
        type:'goAllToStart',
        price:'',
        action(){setAllPlayersOnPosition('Старт');},
        img:'',
        usageflag:false,
        get message(){return `Українська розвідка викрила шпигуна, тому просить всіх покинути об'єкти та повернутись на поле "Старт"`},
    },
    {
        id:12,
        type:'goAllToBunker',
        price:'',
        action(){setAllPlayersOnPosition('Бомбосховище');setAllPlayerRemoteStepPosibility(true);},
        img:'',
        usageflag:false,
        get message(){return `Секретар РНБО просить всіх переміститись на поле "Бомбосховище"`},
    },
    {
        id:13,
        type:'goToPrison',
        price:'',
        action(){setCurrentPlayerPosition(getObjectPositionByType(`В'язниця`));
            },
        img:'',
        usageflag:false,
        //stepsCounter:0,
        get message(){return `Зрадник Медведчук назвав тебе спільником\nДо закінчення ведення слідства доведеться пройти до в'зниці`},
    },
    {
        id:14,
        type:'goToPrisonOwnersByObjectType',
        price:'',
        action(){setAllPlayersByObjectTypeOnPositionByObjectType('ЗМІ',`В'язниця`);
                //set prison invoice on a player level
                let uniquePlayersByObjectType = getAllUniqueOwnerByTypeObject('ЗМІ');
                
                //delete current user from array as he will be catch in main code on prison position
                let currentPlayerIndexInArray = uniquePlayersByObjectType.indexOf(getCurrentPlayerNum());
                if(currentPlayerIndexInArray >= 0) {
                    uniquePlayersByObjectType.splice(currentPlayerIndexInArray,1);
                }
                
                //set prisonInvoice flag for other palyers and cath him on a start when they are move step
                setPrisonInviceFlagForPlayers(uniquePlayersByObjectType, true);
            },
        img:'',
        usageflag:false,
        //stepsCounter:0,
        get message(){return `СБУ затримала власників ЗМІ через сюжет місцезнаходження нашої техніки\nВласники ЗМІ мають пройти до в'язниці`},
    },
    {
        id:15,
        type:'goToLoteryGame',
        price:'',
        action(){setCurrentPlayerPosition(getObjectPositionByType('Лотерея'));
                setplayerLoteryGame(getCurrentPlayerNum(), 5);
            },
        img:'',
        usageflag:false,
        //stepsCounter:0,
        get message(){return `В честь нашої перемоги перейдіть до "Лотереї" та отримайте 5 кидків кубиків\n`},
    },
];





function getOnlyNOTUsageCards(){
    let onlyNOTUsageCards=[];
    MunicipalTreasuresCards.forEach((item)=>{
        if(!item.usageflag){
            onlyNOTUsageCards.push(item);
        }
    });     
    if(onlyNOTUsageCards.length===0){
        alert('Зіграли всі картки міської скарбниці!\n\nМи їх перетасовуємо та заново пускаємо в гру по новому колу');
        MunicipalTreasuresCards.forEach((item)=>{
            item.usageflag=false;
        });
        onlyNOTUsageCards=getOnlyNOTUsageCards();
    }
    return onlyNOTUsageCards;
} 

export function getRandomMunicipalTreasuresCard(){  
    let NOTUsageCards=getOnlyNOTUsageCards(); 
    console.log(`MunicipalTreasuresCards`);
    console.log(MunicipalTreasuresCards);
    console.log(`NOTUsageCards`);
    console.log(NOTUsageCards); 
    let rand=Math.floor(Math.random() * NOTUsageCards.length);
    console.log(`rand`);
    console.log(rand);
    let randNOTUsageCard=NOTUsageCards[rand];
    MunicipalTreasuresCards.forEach((item)=>{
        if(item.id===randNOTUsageCard.id){
            item.usageflag=true;
            randNOTUsageCard.usageflag=true;
        }
    });
    console.log(`randNOTUsageCard`);
    console.log(randNOTUsageCard);
    console.log(`===============`);

    return randNOTUsageCard;
}


