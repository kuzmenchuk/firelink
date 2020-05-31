import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import './input-fields.styles.scss';

export default function InputData(props) {

    return (
        <div className="input-data">
            <TextField
                id="outlined-helperText"
                className="input-data__inner"
                label={props.label ? props.label : null}
                value={props.value}
                // helperText="Some important text"
                variant="outlined"
                type={props.type ? props.type : "text"}
                name={props.name}
                onChange={props.onChange}
                multiline={!props.input}
                rows={props.input ? null : "4"}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {props.name === 'href' ? null : props.maxLength - props.value.length}
                        </InputAdornment>
                    )
                }}
                inputProps={{
                    maxLength: props.maxLength
                }}
            />
        </div>
    )

    // return (
    //     <div className="input-data">
    //         {
    //             props.label ? <div className="input-data__name"><label>{props.label}</label></div>
    //                 : null
    //         }
    //         <div className="input-data__input">
    //             <div className="input-data__input_inner">
    //                 {
    //                     props.input ?
    //                         <input
    //                             class="bp3-input bp3-large bp3-fill"
    //                             type={props.type ? props.type : "text"}
    //                             name={props.name}
    //                             placeholder={props.placeholder}
    //                             dir="auto"
    //                             onChange={props.onChange}
    //                             value={props.value}
    //                         />
    //                         :
    //                         <textarea
    //                             class="bp3-input bp3-large bp3-fill"
    //                             name={props.name}
    //                             dir="auto"
    //                             placeholder={props.placeholder}
    //                             onChange={props.onChange}
    //                             value={props.value}
    //                             rows="4"
    //                         />
    //                 }
    //             </div>
    //         </div>
    //     </div>
    // )
}

