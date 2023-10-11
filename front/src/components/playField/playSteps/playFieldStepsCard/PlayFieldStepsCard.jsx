import './index.css';

export default function PlayFieldStepsCard(props){
    return(
        <div className={`card-common ${props.visibility ? '':'card-common--hidden'}`}
                style={props.styles} 
                onClick={props.onclickFunction}
                >
            {/* <div className="card-common__owner-indicator"
                style={{backgroundColor:props.ownerIndicatorColor}}
                >
            </div> */}
            <h4 className="card-common__type">{props.cardType}</h4>
            <h5 className="card-common__name">{props.cardName}</h5>
            <img className="card-common__image" src={props.cardImage || '#'} alt="#" width='90%'></img>
            <h5 className="card-common__price"
                style={{backgroundColor:props.ownerIndicatorColor}}
                >
                {props.cardPrice}
            </h5>
        </div>
    );
} 