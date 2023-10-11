
import React, { useState/* , useEffect */ } from 'react'
import InputColor from 'react-input-color';

import './index.css';
//import {getrandomColorHEX} from '../../../data/GlobalData'

//let colore=getrandomColorHEX();

export default function PlayerSettingsCard(props){
    const [Color, setColor] = useState(/* getrandomColorHEX() */);
    //console.log(Color);
    //let colore=getrandomColorHEX();

    return(
        <div className='set-player'>
            <label className="set-player__player-name-label"                             
                    htmlFor={`player-name${props.index}`} >
                І'мя гравець-{props.index}
            </label>

            <input className="set-player__player-name" 
                    id={`player-name${props.index}`} 
                    type='text' 
                    placeholder="name">
            </input>
            <InputColor
                className="set-player__player-color"
                initialValue={props.color}
                /* initialValue={colore} */
                value={Color}
                onChange={setColor}
                placement="right"/>
            {/* <div
                style={{
                width: 50,
                height: 50,
                marginTop: 20,
                backgroundColor: color.rgba,
                }}>
                    54545
            </div> */}                  
        </div>
    )
}