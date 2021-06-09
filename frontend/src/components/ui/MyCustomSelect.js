import React, {useEffect, useState} from 'react';
import Select from 'react-select'

const MyCustomSelect = (props) => {

    // react
    const [isDisabled, setIsDisabed] = useState(true)

    //destructure props
    const {name, onBlur } = props.field
    const options = props.data
    const defaultValue = props.selected ? props.selected : null
    const setField = props.form.setFieldValue;

    useEffect(() => {
        if (options && options.length === 0) {
            setIsDisabed(true)
        } else {
            setIsDisabed(false)
        }
        
    },[options])

    useEffect(() => {
        if (defaultValue && defaultValue.length > 0) {
            let tableFormat = defaultValue.map( (deck) => deck['value'])
            setField(name, tableFormat)
        }
    },[])


    const handleChange = (value, type) => {
        
        let idArray = [];
        if (value.length > 0) {
            idArray = value.map( (deck) => {
                return deck['value']
            })
        }

        setField(name, idArray)
  
    };

    const handleBlur = (event) => {

        onBlur(event);
    };

    return(
        <Select
            name={name}
            defaultValue={defaultValue}
            placeholder={'Select Deck..'}
            options={options}
            onChange={handleChange}
            onBlur={handleBlur}
            isMulti={true}
            isDisabled={isDisabled}
            isClearable={true}
          />
    )
}

export default MyCustomSelect;