import './index.css';
import {PlayersData} from '../../../../data/PlayersData';
import {shadovCurrentPlayerAndStep} from '../../../../data/GlobalData';
import {getPriceSoldSumFromAllObjectsByOwner} from '../../../../data//CardsData'

export default function gameProcessInfo (props){

    let playersCards=PlayersData.map((item, index)=>
        <div className="game-process-info__player"
                key={index}
                /* style={{backgroundColor:item.playerColor, width:`${(100/PlayersData.length)-2}%`}}  */
                style={index=== props.сurrentPlayer ? 
                    {backgroundColor:item.playerColor, 
                    width:`${(100/PlayersData.length)-2}%`,
                    /* borderColor:'rgb(214, 229, 124)', */
                    boxShadow: shadovCurrentPlayerAndStep
                    }
                    : 
                    {backgroundColor:item.playerColor, 
                    width:`${(100/PlayersData.length)-2}%`}}
                >
            <h4 className="game-process-info__player-name">{item.playerName}</h4>            
            <h5 className="game-process-info__player-budget">{`${item.playerBudget}$`}</h5>
            <h5 className="game-process-info__player-budget-objects">{`⛪️${getPriceSoldSumFromAllObjectsByOwner(index)}$`}</h5>
        </div>
    ) 
    return(
        <div className={`game-process-info${props.hidden ? " game-process-info--hidden": ""}`}>
            <h3 className="game-process-info__game-budget">Банк: {props.gameBudget}$</h3>
            <div className="game-process-info__players-line">
                {/* <div className="game-process-info__player">
                    <h4 className="game-process-info__player-name">Igor {props.playerName}</h4>
                    <h4 className="game-process-info__player-budget">$ 1000 {props.playerBudget}</h4>
                </div> */}
                {playersCards}
            </div>
        </div>
    )
}