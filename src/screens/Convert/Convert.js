import React from "react";
import classes from './Convert.module.scss'
import {useState, useEffect} from "react";
import {ConvertCurrency} from "./ConvertCurrency/ConvertCurrency";
import {inputValidation} from "../../helpers/inputValidation";
import {convert} from "../../helpers/convert";

export function Convert(props) {

    const [currencies, setCurrencies] = useState([]);
    const [currenciesNames, setCurrenciesNames] = useState([])
    const [activeType, setActiveType] = useState('1');
    const [firstCurrencyTitle, setFirstCurrencyTitle] = useState('UAH')
    const [firstCurrencyValue, setFirstCurrencyValue] = useState({value: '0.00'})
    const [secondCurrencyTitle, setSecondCurrencyTitle] = useState('USD')
    const [secondCurrencyValue, setSecondCurrencyValue] = useState({value: '0.00'})


    useEffect(() => {
        if (props.currencies === 0) {
            // console.log('(Convert) Currencies >> Loading...', props.currencies)
        } else {
            // console.log('(Convert) Currencies >> Complete', props.currencies)
            setCurrencies(() => {
                let curr = [
                    {
                        r030: undefined,
                        txt: 'Українська гривня',
                        rate: '1',
                        cc: 'UAH',
                        exchangedate: 'today'
                    }
                ]

                props.currencies.forEach(el => {
                    curr.push({...el})
                });

                return curr
            })
        }

    }, [props.currencies])

    useEffect(() => {
        setCurrenciesNames(() => {
            return currencies.map(el => el.cc)
        })
    }, [currencies])


    function changeActiveTypeHandler(type) {
        setActiveType(() => {
            return type
        })
    }

    function changeFirstCurrencyTitleHandler(title) {
        setFirstCurrencyTitle(() => {
            return title
        })
    }

    function changeSecondCurrencyTitleHandler(title) {
        setSecondCurrencyTitle(() => {
            return title
        })
    }

    function changeFirstCurrencyValueHandler(event, type) {
        setFirstCurrencyValue((prev) => {
            return inputValidation(event.target.value) ? {value: event.target.value} : {...prev}
        })
        changeActiveTypeHandler(type)
    }

    function changeSecondCurrencyValueHandler(event, type) {
        setSecondCurrencyValue((prev) => {
            return inputValidation(event.target.value) ? {value: event.target.value} : {...prev}
        })
        changeActiveTypeHandler(type)
    }

    function convertHandler() {
        if (activeType === '1') {
            setSecondCurrencyValue(() => {
                let result = convert(currencies, activeType, firstCurrencyTitle, firstCurrencyValue.value, secondCurrencyTitle, secondCurrencyValue.value)
                return {value: result}
            })
        } else {
            setFirstCurrencyValue(() => {
                let result = convert(currencies, activeType, firstCurrencyTitle, firstCurrencyValue.value, secondCurrencyTitle, secondCurrencyValue.value)
                return {value: result}
            })
        }
    }


    return (
        <div className={classes['Convert']}>
            <ConvertCurrency
                currencies={currenciesNames}
                type={'1'}
                changeActiveType={changeActiveTypeHandler}
                changeCurrencyTitle={changeFirstCurrencyTitleHandler}
                inputValue={firstCurrencyValue}
                changeInputValue={changeFirstCurrencyValueHandler}
            />
            <ConvertCurrency
                currencies={currenciesNames}
                type={'2'}
                changeActiveType={changeActiveTypeHandler}
                changeCurrencyTitle={changeSecondCurrencyTitleHandler}
                inputValue={secondCurrencyValue}
                changeInputValue={changeSecondCurrencyValueHandler}
            />
            <button className={classes['Convert__button']} onClick={() => {
                convertHandler()
            }}>
                Конвертировать
            </button>
        </div>
    )
}