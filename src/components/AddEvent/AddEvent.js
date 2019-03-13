import React from "react";
import EventsContext from "../../EventsContext";
import './AddEvent.css';

const AddEvent = () => (
    <EventsContext.Consumer>
        {({ transactions, news, addEvent, getEventsTypes }) => (
            <AddEventInside
                transactions={transactions}
                news={news}
                addEvent={addEvent}
                getEventsTypes={getEventsTypes}
            />
        )}
    </EventsContext.Consumer>
);

class AddEventInside extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "news",
            eventsTypes: this.props.getEventsTypes(),
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.action = this.action.bind(this);
        this.changeType = this.changeType.bind(this);
    }

    action() {
        let res = {};
        res.type = this.state.type;


        for (let key in this.state.eventsTypes[this.state.type]) {
            res[key] = this.state[key];
        }

        this.props.addEvent(res);
        this.clearState();
    }

    clearState() {
        for (let key in this.state.eventsTypes[this.state.type]) {
            this.setState({ [key]: "" });
        }
    }

    changeType(event) {
        this.clearState();
        this.setState({ type: event.target.value });
    }

    changeHandler(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        let events = this.state.eventsTypes;


        let eventTypes = Object.keys(events);
        let options = [];

        for (let i = 0; i < eventTypes.length; i++) {
            options.push(
                <option value={eventTypes[i]} key={i}>
                    {eventTypes[i]}
                </option>
            );
        }

        let currentEvent = events[this.state.type];

        let inputs = [];

        for (let key in currentEvent) {
            // eslint-disable-next-line
            this.state[key] = this.state[key] ? this.state[key] : "";

            switch (currentEvent[key].type) {
                case 'date':
                    let n = new Date();
                    let yyyy = n.getFullYear();
                    let mm = n.getMonth()+1;
                    mm = mm < 10 ? '0'+mm : mm;
                    let dd = n.getDate();
                    dd = dd < 10 ? '0'+dd : dd;
                    // eslint-disable-next-line
                    this.state[key] = this.state[key] ? this.state[key] : `${yyyy}-${mm}-${dd}`;
                // eslint-disable-next-line
                case 'number':
                case 'text':
                    inputs.push(
                        <label key={`${this.state.type}/${key}`} className={'add-event__label'}>
                            <span className="add-event__label-title">{currentEvent[key].label}</span>
                            <input
                                className={'add-event__input'}
                                onChange={this.changeHandler}
                                key={`${key}/${this.state.type}`}
                                id={key}
                                type={currentEvent[key].type}
                                value={this.state[key]}
                                placeholder={currentEvent[key].placeholder}
                            />
                        </label>
                    );
                    break;

                case 'select':
                    // eslint-disable-next-line
                    this.state[key] = this.state[key] ? this.state[key] : currentEvent[key].options[0].value;
                    inputs.push(
                        <label key={`${this.state.type}/${key}`} className={'add-event__label'}>
                            <span className="add-event__label-title">{currentEvent[key].label}</span>
                            <select
                                className={'add-event__input'}
                                id={key}
                                onChange={this.changeHandler}>
                                    {currentEvent[key].options.map((option, i )=>{
                                        return (<option key={i} value={option.value} >{option.label}</option>)
                                    })}
                            </select>
                        </label>
                    );
                    break;

                case 'textarea':
                    inputs.push(
                        <label key={`${this.state.type}/${key}`} className={'add-event__label'}>
                            <span className="add-event__label-title">{currentEvent[key].label}</span>
                            <textarea className={'add-event__input add-event__input--textarea'}
                                      onChange={this.changeHandler}
                                      key={`${key}/${this.state.type}`}
                                      id={key}
                                      value={this.state[key]}
                                      placeholder={currentEvent[key].placeholder}
                                      cols="10"
                                      rows="5"/>
                        </label>
                    );
                    break;

                default:
                    break;
            }
        }

        return (
            <div className={'add-event'}>
                <h4 className={'add-event__headline'}>Добавить событие: {this.state.type}</h4>
                <div className="add-event__toggle">
                    Изменить тип события <select onChange={this.changeType}>{options}</select>
                </div>
                <div className="add-event__inputs">
                    {inputs}
                </div>
                <button className={'add-event__action'} onClick={this.action}>Добавить</button>
            </div>
        );
    }



    componentDidMount() {
    }
}

export default AddEvent;
