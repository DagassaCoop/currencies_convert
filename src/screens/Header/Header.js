import React from 'react';
import classes from './Header.module.scss'
import {useState, useEffect} from "react";
import {HeaderCurrency} from "./HeaderCurrency/HeaderCurrency";

export function Header(props) {

    const [defaultCurrencies, setDefaultCurrencies] = useState([])

    useEffect(() => {
        // console.log('Header useEffect >> start >> ', props.data)
        if (props.data === 0) {
            // console.log('GET request (Header) >>> Loading...')
        } else {
            // console.log('GET request (Header) >>> Complete')

            let newDefaultCurrencies = [
                {
                    name: 'USD',
                    value: 0
                },
                {
                    name: 'EUR',
                    value: 0
                },
                {
                    name: 'GBP',
                    value: 0
                },
                {
                    name: 'CAD',
                    value: 0
                }
            ]

            newDefaultCurrencies.forEach(el => {
                props.data.forEach(elIn => {
                    if (el.name === elIn.cc) {
                        el.value = elIn.rate;
                        return null;
                    }
                })
            })

            setDefaultCurrencies(newDefaultCurrencies)
        }

    }, [props.data])


    return (
        <header className={classes['Header']}>
            <div className={classes['Header__logo']}>
                <span>Currencies Convert</span>
            </div>
            <div className={classes['Header__currencies']}>
                <div className={'Header__currencies-from'}>
                    <span className={classes['Header__currencies-from-title']}>
                        UAH/
                    </span>
                </div>
                <div id={'HeaderCurrenciesTo'} className={classes['Header__currencies-to']}>
                    {defaultCurrencies.map((el, index) => <HeaderCurrency key={index} title={el.name}
                                                                          value={el.value}/>)}
                </div>
            </div>
        </header>
    )
}