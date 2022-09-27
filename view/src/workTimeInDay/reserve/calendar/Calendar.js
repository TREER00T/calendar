import {
    add,
    differenceInDays,
    endOfMonth,
    format,
    setDate,
    startOfMonth,
    sub,
} from 'date-fns';
import Cell from './Cell';
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
        return isPassedMonth ? "blue noClickMonth" : "blue";
    }

    const checkYear = () => {
        return isPassedYear ? "gray noClickYear" : "gray";
    }


    return (
        <div className="calendar-body">
            <div className="calendar-week-day">
                <br/>
                <Cell className={checkYear()} onClick={prevYear}>&lt;&lt;</Cell>
                <Cell className={checkMonth()} onClick={prevMonth}>&lt;</Cell>
                <Cell>{format(value, "yyyy")}</Cell>
                <Cell className="blue" onClick={nextMonth}>&gt;</Cell>
                <Cell className="gray" onClick={nextYear}>&gt;&gt;</Cell>

                <br/>
                {weeks.map((week) => (
                    <Cell className="calendar-days">{week}</Cell>
                ))}

                {Array.from({length: prefixDays}).map((_, index) => (
                    <Cell key={index}/>
                ))}

                {Array.from({length: numDays}).map((_, index) => {
                    const date = index + 1;
                    const isCurrentDate = date === value.getDate();
                    const isPassedDay = date < value.getDate();
                    let clickNextDayWhenHavePassedDay;

                    const isPassedMonth = value.getMonth() > new Date().getMonth();
                   // const isThisDate = clickDate < new Date().getDate();


                    if (!isPassedMonth)
                        clickNextDayWhenHavePassedDay = new Date().getDate() > date;
                    else
                        clickNextDayWhenHavePassedDay = false;

                    return (
                        <Cell
                            key={date}
                            isActive={isCurrentDate}
                            isPassedDay={isPassedDay}
                            clickNextDayWhenHavePassedDay={clickNextDayWhenHavePassedDay}
                            onClick={() => handleClickDate( date)}>
                            {/*onClick={() => handleClickDate( isThisDate ? new Date().getDate() : date)}>*/}

                            {date}
                        </Cell>
                    );
                })}

                {Array.from({length: suffixDays}).map((_, index) => (
                    <Cell key={index}/>
                ))}
            </div>
        </div>
    );
};

export default Calendar;