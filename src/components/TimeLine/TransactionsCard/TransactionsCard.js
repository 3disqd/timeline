import React from "react";
import './TransactionsCard.css'
import {Link} from "react-router-dom";

const TransactionsCard = (props) => (

    props.transactions.isDeleted ? null :
        <Link to={`/transactions/${props.transactions.id}`} className={`${props.className} transactions-card`}>
            {/*<h6>Это Транзакция</h6>*/}
            <div className="transactions-card__header">
                <div>
                    {props.transactions.direction === 'income' ? 'Приход' : 'Расход'}
                </div>
                <div>
                    <span
                        className={props.transactions.direction === 'income'
                            ? 'transactions-card__value--positive'
                            : 'transactions-card__value--negative'}>
                        {props.transactions.value}
                    </span>
                    <span className={'transactions-card__currency'}>
                        {props.transactions.currency}
                    </span>
                </div>
            </div>
            <div className="transactions-card__footer">
                <span className={'transactions-card__sender'}>Отправитель: {props.transactions.sender}</span>
                <span className={'transactions-card__date'}>{props.transactions.date}</span>
            </div>
       </Link>
);

export default TransactionsCard;