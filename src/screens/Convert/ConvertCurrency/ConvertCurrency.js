import React from "react";
import classes from './ConvertCurrency.module.scss'
import {useState, useEffect} from "react";

export function ConvertCurrency(props) {

    const [currencies, setCurrencies] = useState([])
    const [menuHidden, setMenuHidden] = useState(true)
    const [convertSelectFromTitle, setConvertSelectFromTitle] = useState(props.type === '1' ? 'UAH' : 'USD')


    useEffect(() => {
        if (props.currencies === 0) {
            // console.log('(ConvertCurrencies) Data >> Loading...', props.currencies)
        } else {
            // console.log('(ConvertCurrencies) Data >> Complete', props.currencies)
            setCurrencies(() => {
                let curr = []

                props.currencies.forEach(el => {
                    let status = false

                    if ( (props.type === '1' && el === 'UAH') || (props.type === '2' && el === 'USD')) {
                        status = true
                    }

                    curr.push({
                        name: el,
                        active: status
                    })
                })

                // console.log('Type >> ', props.type, '; Data >> ', curr)
                return curr;
            })
        }

    }, [props.currencies])

    useEffect(() => {
        // console.log('(ConvertCurrency) currencies >>> ', currencies)
        setConvertSelectFromTitle(() => {
            let newTitle;
            currencies.forEach(el => {
                if (el.active) newTitle = el.name;
                return null;
            })
            return newTitle;
        })
    }, [currencies])


    function changeActiveCurrencyHandler(title) {
        setCurrencies((prev) => {
            let curr = []
            prev.forEach((el, index) => {
                curr.push({
                    ...el,
                    active: el.name === title
                })

            })
            return curr
        })
    }

    function changeMenuHiddenHandler() {
        setMenuHidden((prev) => {
            return !prev
        })
    }

    function underMenuItemClick(data) {
        changeActiveCurrencyHandler(data.title)
        props.changeCurrencyTitle(data.title)
        props.changeActiveType(data.type)
        changeMenuHiddenHandler()
    }


    return (
        <div className={classes['ConvertCurrency']}>
            <div className={classes['ConvertCurrency__select']} id={'convertSelectFrom'}>
                <button
                    className={classes['ConvertCurrency__select-title']}
                    onClick={() => changeMenuHiddenHandler()}
                >
                    {convertSelectFromTitle}
                </button>
                <div className={
                    menuHidden
                        ? [classes['ConvertCurrency__select-undermenu'], classes['ConvertCurrency__select-undermenu_hidden']].join(' ')
                        : classes['ConvertCurrency__select-undermenu']

                }>
                    {currencies.map((el, index) => {
                        return (
                            <div
                                key={index}
                                className={
                                    el.active
                                        ? [classes['ConvertCurrency__select-undermenu-item'], classes['ConvertCurrency__select-undermenu-item_active']].join(' ')
                                        : classes['ConvertCurrency__select-undermenu-item']
                                }
                                onClick={() => underMenuItemClick({
                                    title: el.name,
                                    type: props.type
                                })}
                            >
                                {el.name}
                                {currencies.length !== index + 1 ? <hr/> : null}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={classes['ConvertCurrency__input']} id={'convertInputFrom'}>
                <input
                    type="text"
                    onChange={(e) => props.changeInputValue(e, props.type)}
                    value={props.inputValue.value}/>
            </div>
        </div>
    )
}