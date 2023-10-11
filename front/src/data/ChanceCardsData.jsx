import {setCurrentPlayerSkipStepPlusNum,
        moneyStorneForCurrentPlayer,
        moneyAddForCurrentPlayer
    } from './PlayersData';

import {skipStepsChanceCard,
        addBankSum,
        storneBankSum
    } from './GlobalData';




export let ChanceCardsData=[
    {
        id:1,
        type:'skipMove',
        price:'',
        action(){setCurrentPlayerSkipStepPlusNum(skipStepsChanceCard)},
        img:'',
        usageflag:false,
        get message(){return `Сьогодні ти відправляєшся розвантажувати гуманітарку\nУ тебе пропуск наступного ходу`},
    },
    {
        id:2,
        type:'bonus',
        price:200,
        action(){moneyAddForCurrentPlayer(this.price); storneBankSum(this.price)},
        img:'',
        usageflag:false,
        get message(){return `Ти дізнався, що вся русня їде з Криму\nОтримуй ${this.price}$ на шампаньське`},
    },
    {
        id:3,
        type:'bonus',
        price:200,
        action(){moneyAddForCurrentPlayer(this.price); storneBankSum(this.price)},
        img:'',
        usageflag:false,
        get message(){return `Слава Україні!\nСлава Нації!\nІ пи***ць російській федерації!\nОтримуйте ${this.price}$ від філософа`},
    },
    {
        id:4,
        type:'bonus',
        price:200,
        action(){moneyAddForCurrentPlayer(this.price); storneBankSum(this.price)},
        img:'',
        usageflag:false,
        get message(){return `Ти завербував російську журналістку для акції протесту у прямому ефірі\nУкраїнські спецслужби надають тобі: ${this.price}$`},
    },
    {
        id:5,
        type:'bonus',
        price:200,
        action(){moneyAddForCurrentPlayer(this.price); storneBankSum(this.price)},
        img:'',
        usageflag:false,
        get message(){return `Ти поставив ставку, в букмекерській конторі, що запалає Кримський міст\nВиграш: ${this.price}$`},
    },
    {
        id:6,
        type:'bonus',
        price:300,
        action(){moneyAddForCurrentPlayer(this.price); storneBankSum(this.price)},
        img:'',
        usageflag:false,
        get message(){return `Ти спіймав свинособаку та відвів її на допит до Золкіна\nУкраїнські спецслужби надають тобі: ${this.price}$`},
    },
    {
        id:7,
        type:'bonus',
        price:300,
        action(){moneyAddForCurrentPlayer(this.price); storneBankSum(this.price)},
        img:'',
        usageflag:false,
        get message(){return `Ти забрав танк окупантів для фермерських потреб\nТвій прибуток: ${this.price}$`},
    },
    {
        id:8,
        type:'bonus',
        price:300,
        action(){moneyAddForCurrentPlayer(this.price); storneBankSum(this.price)},
        img:'',
        usageflag:false,
        get message(){return `Ти допоміг затримати Шарія\nУкраїнські спецслужби надають тобі: ${this.price}$`},
    },
    {
        id:9,
        type:'bonus',
        price:300,
        action(){moneyAddForCurrentPlayer(this.price); storneBankSum(this.price)},
        img:'',
        usageflag:false,
        get message(){return `Відомий блогер надіслав тобі бонус за наводку на ватника Романа\nОтримуй: ${this.price}$`},
    },
    {
        id:10,
        type:'bonus',
        price:300,
        action(){moneyAddForCurrentPlayer(this.price); storneBankSum(this.price)},
        img:'',
        usageflag:false,
        get message(){return `Поляки зібрали нам кошти на БАЙРАКТАР\nОтримуй: ${this.price}$`},
    },
    {
        id:11,
        type:'bonus',
        price:500,
        action(){moneyAddForCurrentPlayer(this.price); storneBankSum(this.price)},
        img:'',
        usageflag:false,
        get message(){return `Добрий день Everybody!\nБорис Джонсонюк надає грошову допомогу на озброєння. Отримуйте: ${this.price}$`},
    },
    {
        id:12,
        type:'fine',
        price:100,
        action(){moneyStorneForCurrentPlayer(this.price); addBankSum(this.price)},
        img:'',
        usageflag:false,
        get message(){return `Поки Анджеліна Джолі ходила по кав'ярні, ви чекали на каву втикаючи в телефон та непомітили її\nОплати рахунок: ${this.price}$`},
    },
    {
        id:13,
        type:'fine',
        price:200,
        action(){moneyStorneForCurrentPlayer(this.price); addBankSum(this.price)},
        img:'',
        usageflag:false,
        get message(){return `Цей день настав!\nМи збираємо на ядерну бомбу\nЗадонать: ${this.price}$`},
    },
    {
        id:14,
        type:'fine',
        price:200,
        action(){moneyStorneForCurrentPlayer(this.price); addBankSum(this.price)},
        img:'',
        usageflag:false,
        get message(){return `Сьогодні ти пішов з товаришем в бар випити по келиху зігріваючого\nОплати рахунок: ${this.price}$`},
    },
    {
        id:15,
        type:'fine',
        price:300,
        action(){moneyStorneForCurrentPlayer(this.price); addBankSum(this.price)},
        img:'',
        usageflag:false,
        get message(){return `Після перемоги ти пішов на концерт\nОплати білет: ${this.price}$`},
    },
];

function getOnlyNOTUsageCards(){
    let onlyNOTUsageCards=[];
    ChanceCardsData.forEach((item)=>{
        if(!item.usageflag){
            onlyNOTUsageCards.push(item);
        }
    });     
    if(onlyNOTUsageCards.length===0){
        alert('Зіграли всі картки шанс!\n\nМи їх перетасовуємо та заново пускаємо в гру по новому колу');
        ChanceCardsData.forEach((item)=>{
            item.usageflag=false;
        });
        onlyNOTUsageCards=getOnlyNOTUsageCards();
    }
    return onlyNOTUsageCards;
};

export function getRandomChanceCard(){  
    let NOTUsageCards=getOnlyNOTUsageCards(); 
    let rand=Math.floor(Math.random() * NOTUsageCards.length);
    let randNOTUsageCard=NOTUsageCards[rand];
    ChanceCardsData.forEach((item)=>{
        if(item.id===randNOTUsageCard.id){
            item.usageflag=true;
            randNOTUsageCard.usageflag=true;
        }
    });
    return randNOTUsageCard;
}; 