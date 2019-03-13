import React from "react";
import './NewsCard.css';
import {Link} from "react-router-dom";

const NewsCard = (props) => (
        <Link to={`/news/${props.news.id}`} className={`${props.className} timeline-news-card`}>
            <div className={`timeline-news-card__header ${ !props.news.isChecked ? 'timeline-news-card__header--new' : ''}`}>
                {props.news.title}
            </div>
        </Link>
);

export default NewsCard;