import React from 'react';
import EventsContext from "../../EventsContext";
import NewsCard from "./NewsCard/NewsCard";
import TransactionsCard from "./TransactionsCard/TransactionsCard";
import './TimeLine.css';


const TimeLine = () => (
    <EventsContext.Consumer>
        {({ transactions, news }) => (
            <TimeLineInside
                transactions={transactions}
                news={news}/>

        )}
    </EventsContext.Consumer>
);

class TimeLineInside extends React.Component {
    constructor( props ){
        super( props );
        this.state = {
            sortDate: '0',
            kek: { tet: this.sortDate},
            sortPriority: {news: 1, transactions: 1},
            items: this.props.news.concat(this.props.transactions),

        };

        this.setSortRule = this.setSortRule.bind(this);
    }

    setSortRule(event){
        this.setState({[event.target.id]: JSON.parse(event.target.value)});
    }



    render() {

        let items = this.props.news.concat(this.props.transactions);

        items.sort((a,b)=>{
            let ai = this.state.sortPriority[a.type];
            let bi = this.state.sortPriority[b.type];
            if ( ai === bi){
                let arr = a.date.split('-');
                let brr = b.date.split('-');
                let ad = new Date (arr[0], arr[1]-1, arr[2]);
                let bd = new Date (brr[0], brr[1]-1, brr[2]);
                return (ad - bd)* this.state.sortDate;
            }
            return ai-bi;
        });

        const itemsList = items.map((item, i) =>{
                let el;
                switch (item.type) {
                    case 'news':
                        el = <NewsCard key={i} news={item} className={'time-line__card'}/>;
                        break;
                    case 'transactions':
                        el = <TransactionsCard key={i} transactions={item} className={'time-line__card'}/>;
                        break;
                    default:
                        el = null;
                        break;
                }
                return el;
            }
        );

        return (
            <div className={'time-line'}>
                <div className="time-line__setting">
                    <label className={'time-line__setting-label'}>
                        Сортировка по дате:
                        <select onChange={this.setSortRule} id={'sortDate'}>
                            <option value={0}>no priority</option>
                            <option value={-1}>Сначала новые</option>
                            <option value={1}>Сначала старые</option>
                        </select>
                    </label>
                    <label className={'time-line__setting-label'}>
                        Сортировка по типу:
                        <select onChange={this.setSortRule} id={'sortPriority'}>
                            <option value={'{"news":1,"transactions":1}'}>no priority</option>
                            <option value={JSON.stringify({news: 1, transactions: 2})} >news  transactions</option>
                            <option value={JSON.stringify({news: 2, transactions: 1})}>transactions  news</option>
                        </select>
                    </label>

                </div>
                <div className="time-line__cards">
                    {itemsList}
                </div>
            </div>
        );
    }
    componentDidMount() {

    }
    componentWillUpdate(prevProps, prevState){

    }
}


export default TimeLine;
