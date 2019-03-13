import React from "react";
import EventsContext from "../../EventsContext";
import './NewsInfo.css';

const NewsInfo = (props) => (
    <EventsContext.Consumer>
        {({ transactions, news,getNews,updateNews }) => (
            <NewsInfoInside
                id={props.match.params.id}
                getNews={getNews}
                updateNews={updateNews}/>

        )}
    </EventsContext.Consumer>
);

class NewsInfoInside extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            isOpen: false
        };

        this.toggle = this.toggle.bind(this);
    }


    toggle(){
        let obj = this.props.getNews(this.props.id);
        let copy = Object.assign({}, obj);
        copy.isChecked = !copy.isChecked;

        this.props.updateNews(this.props.id, copy);

    }

    render() {

        let a = this.props.getNews(this.props.id);

        return(
                <div className={`news-card--info`}>
                    { a ?
                        (
                            <React.Fragment>
                                <div className="news-card__header">
                                    <div className="news-card__header-title">
                                        Заголовок: {a.title}
                                    </div>
                                    <div className="news-card__header-action">
                                        <button onClick={this.toggle}>{a.isChecked ? 'Не ознакомлен' : 'Ознакомлен'}</button>
                                    </div>
                                </div>
                                <div className="news-card__body">
                                    <div className="news-card__body-label">
                                        <div className="news-card__body-title">
                                            Описание:
                                        </div>
                                        <div className="news-card__body-date">
                                            {a.date}
                                        </div>
                                    </div>
                                    <div className="news-card__body-description">
                                        {a.description}
                                    </div>
                                </div>
                            </React.Fragment>
                        ):
                        (
                            <div>
                                <p>Новость не найдена, удалена или еще не создана. =С</p>
                            </div>
                        )

                    }
                </div>
        )
    }
}

export default NewsInfo;