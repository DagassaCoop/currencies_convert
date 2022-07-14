import React from "react";
import classes from './HeaderCurrency.module.scss'

export function HeaderCurrency(props) {
    return (
        <div className={classes['HeaderCurrency']}>
            <span className={classes['HeaderCurrency__title']}>/{props.title} - </span>
            <span className={classes['HeaderCurrency__value']}>{props.value}</span>
        </div>
    )
}