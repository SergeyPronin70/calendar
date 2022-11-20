import { Calendar } from 'antd';
import { Moment } from 'moment';
import React from 'react';
import { IEvent } from '../models/ievent';
import { formatDate } from '../utils/date';

interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: React.FC<EventCalendarProps> = (props) => {
    
    const dateCellRender = (value: Moment) => {
        const formatedDate = formatDate(value.toDate());
        const currentDateEvents = props.events.filter(ev => ev.date === formatedDate)
        return (
            <div>
                {currentDateEvents.map((ev, index) =>
                    <div key={index}>{ev.description}</div>
                )}
            </div>
        );
    };

    return (
        <Calendar
            dateCellRender={dateCellRender}
        />
    )
}

export default EventCalendar;