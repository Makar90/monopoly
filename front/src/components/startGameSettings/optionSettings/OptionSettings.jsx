import './index.css';

export default function OptionSettings(props){
    return(
        <div className={`${props.OptionClassName || undefined} option`} >
            <label className='option__name'  
                    htmlFor={props.CodeId}>
                {props.OptionName}
            </label>
            <input className="option__value" 
                    id={props.CodeId} 
                    type={props.OptionValueType}
                    defaultValue={props.OptionValue}
                    min={props.OptionValueMin} 
                    max={props.OptionValueMax}
                    onChange={props.OptionValueOnChange || undefined}>
            </input>
        </div>
    );
}