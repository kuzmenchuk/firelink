import React from 'react';

import './input-fields.styles.scss';

export default function InputData(props) {

    return (
        <div className="input-data">
            {
                props.label ? <div className="input-data__name"><label>{props.label}</label></div>
                    : null
            }
            <div className="input-data__input">
                <div className="input-data__input_inner">
                    {
                        props.input ?
                            <input
                                class="bp3-input bp3-large bp3-fill"
                                type={props.type ? props.type : "text"}
                                name={props.name}
                                placeholder={props.placeholder}
                                dir="auto"
                                onChange={props.onChange}
                                value={props.value}
                            />
                            :
                            <textarea
                                class="bp3-input bp3-large bp3-fill"
                                name={props.name}
                                dir="auto"
                                placeholder={props.placeholder}
                                onChange={props.onChange}
                                value={props.value}
                                rows="4"
                            />
                    }
                </div>
            </div>
        </div>
    )
}

