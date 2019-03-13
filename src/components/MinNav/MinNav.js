import React from "react";
import {Link} from "react-router-dom";
import './MinNav.css';

const MinNav = () => (
    <div className={'mini-navigator'}>
        <Link to={'/add'}>Добавить событие</Link>
        <Link to={'/list'}>Вернуться к списку</Link>
    </div>
);

export default MinNav;