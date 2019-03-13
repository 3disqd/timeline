import React from "react";

const EventsContext = React.createContext();

export class EventsStore extends React.Component {
    state = {
        // news: [],
        // transactions: [],
        news: [
            {
                id: 0,
                type: "news",
                title: "Аларм новость1",
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet architecto esse odit sapiente.',
                date: "2019-03-01",
                isChecked: false
            },
            {
                id: 1,
                type: "news",
                title: "Lorem ipsum!",
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolorem magnam officia sapiente voluptate voluptatibus!',
                date: "2019-03-10",
                isChecked: false
            }
        ],
        transactions: [
            {
                id: 0,
                currency: "баксы",
                date: "2019-03-10",
                description: "Баксы от Коли",
                direction: "income",
                sender: "Коля",
                type: "transactions",
                value: "228",
                isDeleted: false
            },
            {
                id: 1,
                currency: "евро",
                date: "2019-04-10",
                description: "описание от Васи",
                direction: "debt",
                sender: "Вася",
                type: "transactions",
                value: "300",
                isDeleted: false
            },
        ],
    };

    getEventsTypes = () =>{
        return {
            news: {
                title: {type: 'text', placeholder: 'Шок! Британские ученые..', label: 'Заголовок'},
                description: {type: 'textarea', placeholder: 'Что бы быстро и эффективно похудешь, нужно лишь...', label: 'Содержание'},
                date: {type:'date', label: 'Дата'},
            },
            transactions: {
                value: {type:'number', placeholder: '3.14', label: 'Сумма'},
                currency: {type:'text', placeholder: 'Тут мог быть селектор', label: 'Валюта'},
                sender:  {type:'text', placeholder: 'Емельян', label: 'Отправитель'},
                description:  {type:'textarea', placeholder: 'some placeholder', label: 'Описание'},
                direction:  {type:'select', options: [{label:'Расход', value:'debt'}, {label:'Приход', value: 'income'}] , label: 'Приход/расход'},
                date: {type:'date',label: 'Дата'},
            },
        }
    };

    getNews = (id) =>{
        if (this.state.news.length > id){
            return this.state.news[id];
        }
        return false;

    };

    getTransactions = (id) =>{
        if (this.state.transactions.length > id){
            return this.state.transactions[id];
        }
        return false;

    };

    updateNews = (id, obj) =>{
        let newNews = this.state.news;
            newNews[id] = obj;

        this.setState(() => ({ news: newNews }));
    };

    updateTransactions = (id, obj) =>{
        let newTransactions = this.state.transactions;
        newTransactions[id] = obj;

        this.setState(() => ({ transactions: newTransactions }));
    };

    addEvent = (obj) => {
        if (!obj.date){
            obj.date = '1970-00-01';
        }
        switch (obj.type) {
            case 'news':
                this.addNews(obj);
                break;
            case 'transactions':
                this.addTransactions(obj);
                break;
            default:
                console.log('kek');
        }


    };

    addNews = (obj) => {
        obj.id=this.state.news.length;
        obj.isChecked = false;

        this.setState({
            news: [
                ...this.state.news,
                obj
            ]
        });
    };

    addTransactions = (obj) => {
        obj.id=this.state.transactions.length;
        obj.isDeleted = false;
        obj.name=`${this.state.transactions.length}Transactions`;

        this.setState({
            transactions: [
                ...this.state.transactions,
                obj
            ]
        });
    };

    render() {
        return (
            <EventsContext.Provider
                value={{
                    addEvent: this.addEvent,
                    getEventsTypes: this.getEventsTypes,
                    news: this.state.news,
                    transactions: this.state.transactions,
                    getNews: this.getNews,
                    updateNews: this.updateNews,
                    getTransactions: this.getTransactions,
                    updateTransactions: this.updateTransactions

                }}
            >
                {this.props.children}
            </EventsContext.Provider>
        );
    }
}

export default EventsContext;