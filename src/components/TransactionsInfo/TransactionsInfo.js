import React from "react";
import EventsContext from "../../EventsContext";
import './TransactionsInfo.css';

const TransactionsInfo = (props) => (
    <EventsContext.Consumer>
        {({ getTransactions,updateTransactions }) => (
            <TransactionsInfoInside
                id={props.match.params.id}
                getTransactions={getTransactions}
                updateTransactions={updateTransactions}/>

        )}
    </EventsContext.Consumer>
);

class TransactionsInfoInside extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            isOpen: false
        };

        this.toggle = this.toggle.bind(this);
    }


    toggle(){
        let obj = this.props.getTransactions(this.props.id);
        let copy = Object.assign({}, obj);
        copy.isDeleted = true;

        this.props.updateTransactions(this.props.id, copy);

    }

    render() {

        let a = this.props.getTransactions(this.props.id);

        return(
            <div className={`transactions-card--info`}>
                { a && !a.isDeleted ?
                    (
                        <React.Fragment>
                            <div className="transactions-card__header">
                                <div className="transactions-card__header-title">
                                    {a.direction ==="income" ? 'Приход: ': 'Расход: '} {a.value} {a.currency}
                                </div>
                                <div className="transactions-card__header-action">
                                    <button onClick={this.toggle}>Удалить</button>
                                </div>

                            </div>
                            <div className={'transactions-card__subtitle'}>
                                <span className={'transactions-card__sender'}>От кого транзакция: {a.sender}</span>
                                <span className={'transactions-card__date'}>{a.date}</span>
                            </div>
                            <div className="transactions-card__body">
                                <div className="transactions-card__body-label">
                                    <div className="transactions-card__body-title">
                                        Описание:
                                    </div>
                                </div>
                                <div className="transactions-card__body-description">
                                    {a.description}
                                </div>
                            </div>
                        </React.Fragment>
                    ):
                    (
                        <div>
                            <p>Транзакция не найдена, удалена или еще не создана. =С</p>
                        </div>
                    )

                }
            </div>
        )
    }
}

export default TransactionsInfo;