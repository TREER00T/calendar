import {
    add,
    differenceInDays,
    endOfMonth,
    setDate,
    setMonth,
    setYear,
    startOfMonth,
    sub,
} from 'date-fns';
import Number from './Number';
import {useState} from 'react';

const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


const Calendar = ({value = new Date(), onChange}) => {
    let [clickDate, setClickDate] = useState(value.getDate());
    let [clickMonth, setClickMonth] = useState(value.getMonth());
    let [clickYear, setClickYear] = useState(value.getFullYear());
    let monthPreCheck = {
        pre: () => {
            let a = clickMonth;
        }
    }

    const startDate = startOfMonth(value);
    const endDate = endOfMonth(value);
    const numDays = differenceInDays(endDate, startDate) + 1;

    const prefixDays = startDate.getDay();
    const suffixDays = 6 - endDate.getDay();

    const isPassedYear = clickYear <= new Date().getFullYear();
    const isPassedMonth = clickMonth <= new Date().getMonth();

    const prevYear = () => {
        if (!isPassedYear)
            handleClickYear(sub(value, {years: 1}).getFullYear())
    };
    const nextYear = () => {
        handleClickYear(add(value, {years: 1}).getFullYear())
    };
    const prevMonth = () => {
        if (isPassedMonth)
            // console.log(clickYear > value.getFullYear())
            handleClickMonth(sub(value, {months: 1}).getMonth())
    };
    const nextMonth = () => {
        // console.log(value.getMonth() === 11)
        if (value.getMonth() === 11)
            nextYear();
        handleClickMonth(add(value, {months: 1}).getMonth())
    };


    const handleClickDate = index => {
            const date = setDate(value, index);
            setClickDate(date.getDate())
            onChange(date);
        },
        handleClickMonth = index => {
            const date = setMonth(value, index);
            setClickMonth(date.getMonth())
            onChange(date);
        },
        handleClickYear = index => {
            const date = setYear(value, index);
            setClickYear(date.getFullYear())
            onChange(date);
        };

    const checkYear = () => {
        return (isPassedYear && isPassedMonth ? "noClickYear" : "") + " btn-gray tt";
    }, checkMonth = () => {
        return (isPassedMonth && isPassedYear ? "noClickMonth" : "") + " btn-blue t";
    };


    return (
        <div>
            <div className="pn-btn-body">
                <span className={checkYear()} onClick={prevYear}>&lt;&lt;</span>
                <span className={checkMonth()} onClick={prevMonth}>&#60;</span>
                <span>{clickYear}</span>
                <span className="btn-blue t" onClick={nextMonth}>&#62;</span>
                <span className="btn-gray tt" onClick={nextYear}>&gt;&gt;</span>
            </div>

            <div className="calendar-week-day">

                {weeks.map((week) => (
                    <th key={week}>{week}</th>
                ))}

                {Array.from({length: prefixDays}).map((_, index) => (
                    <Number key={index}/>
                ))}

                {Array.from({length: numDays}).map((_, index) => {
                    const dayClicked = index + 1;
                    const isCurrentDate = dayClicked === value.getDate();
                    const isPassedDay = new Date().getDate() > clickDate;
                    const isPassedMonth = new Date().getMonth() > clickMonth;
                    const isPassedYear = new Date().getFullYear() > clickYear;
                    const clickNextDayWhenHavePassedDay = !isPassedMonth ? new Date().getDate() > dayClicked : false;


                    return (
                        <Number
                            key={dayClicked}
                            isActive={isCurrentDate}
                            isPassedDay={isPassedDay}
                            isPassedMonth={isPassedMonth}
                            isPassedYear={isPassedYear}
                            // clickNextDayWhenHavePassedDay={clickNextDayWhenHavePassedDay}
                            onClick={() => handleClickDate(dayClicked)}>

                            {dayClicked}
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