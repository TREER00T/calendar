import {
    add,
    differenceInDays,
    endOfMonth,
    format,
    setDate,
    startOfMonth,
    sub,
} from 'date-fns';
import Number from './Number';
import {useState} from 'react';

const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


const Calendar = ({value = new Date(), onChange}) => {
    let [clickDate, setClickDate] = useState(0);
    let [clickMonth, setClickMonth] = useState(0);

    const startDate = startOfMonth(value);
    const endDate = endOfMonth(value);
    const numDays = differenceInDays(endDate, startDate) + 1;

    const prefixDays = startDate.getDay();
    const suffixDays = 6 - endDate.getDay();

    const prevMonth = () => onChange(sub(value, {months: 1}));
    const nextMonth = () => onChange(add(value, {months: 1}));
    const prevYear = () => onChange(sub(value, {years: 1}));
    const nextYear = () => onChange(add(value, {years: 1}));

    const isPassedYear = value.getFullYear() <= new Date().getFullYear();
    const isPassedMonth = value.getMonth() <= new Date().getMonth();

    const handleClickDate = index => {
        const date = setDate(value, index);
        setClickDate(date.getDate())
        setClickMonth(date.getMonth())
        onChange(date);
    };

    const checkMonth = () => {
        return (isPassedMonth ? "noClickMonth" : "") + " btn-blue t";
    }

    const checkYear = () => {
        return (isPassedYear ? "noClickYear" : "") + " btn-gray tt";
    }


    return (
        <div>
            <div className="pn-btn-body">
                <span className={checkYear()} onClick={prevYear}>&lt;&lt;</span>
                <span className={checkMonth()} onClick={prevMonth}>&#60;</span>
                <span>{format(value, "yyyy")}</span>
                <span className="btn-blue t" onClick={nextMonth}>&#62;</span>
                <span className="btn-gray tt" onClick={nextYear}>&gt;&gt;</span>
            </div>

            <div className="calendar-week-day">

                {weeks.map((week) => (
                    <th>{week}</th>
                ))}

                {Array.from({length: prefixDays}).map((_, index) => (
                    <Number key={index}/>
                ))}

                {Array.from({length: numDays}).map((_, index) => {
                    const date = index + 1;
                    const isCurrentDate = date === value.getDate();
                    const isPassedDay = date < value.getDate();
                    const isPassedMonth = value.getMonth() > new Date().getMonth();
                    const clickNextDayWhenHavePassedDay = !isPassedMonth ? new Date().getDate() > date : false;
                    // const isThisDate = clickDate < new Date().getDate();


                    return (
                        <Number
                            key={date}
                            isActive={isCurrentDate}
                            isPassedDay={isPassedDay}
                            clickNextDayWhenHavePassedDay={clickNextDayWhenHavePassedDay}
                            onClick={() => handleClickDate(date)}>
                            {/*onClick={() => handleClickDate( isThisDate ? new Date().getDate() : date)}>*/}

                            {date}
                        </Number>
                    );
                })}

                {Array.from({length: suffixDays}).map((_, index) => (
                    <Number key={index}/>
                ))}
            </div>
        </div>
    );
};

export default Calendar;