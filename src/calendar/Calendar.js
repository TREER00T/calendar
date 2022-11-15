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


    const timeNow = new Date();
    const startDate = startOfMonth(value);
    const endDate = endOfMonth(value);
    const numDays = differenceInDays(endDate, startDate) + 1;

    const prefixDays = startDate.getDay();
    const suffixDays = 6 - endDate.getDay();

    const isPassedYear = clickYear <= timeNow.getFullYear() && clickYear <= value.getFullYear();
    const isPassedMonth = clickMonth <= timeNow.getMonth();

    const prevYear = () => {
        if ((timeNow.getFullYear() <= clickYear || timeNow.getMonth() <= clickMonth) || (value.getFullYear() <= clickYear || value.getMonth() <= clickMonth)) {
            let date = sub(value, {years: 1});
            value = date;
            handleClickYear(date.getFullYear())
        }
    };
    const nextYear = () => {
        let date = add(value, {years: 1});
        value = date;
        handleClickYear(date.getFullYear());
    };
    const prevMonth = () => {

        let date = sub(value, {months: 1});

        value = date;

        if (clickMonth === 11) {
            handleClickYear(value.getFullYear())
        }

        handleClickMonth(date.getMonth());

    };
    const nextMonth = () => {
        let date = add(value, {months: 1});
        value = date;

        if (clickMonth === 11) {
            handleClickYear(date.getFullYear());
        }

        handleClickMonth(date.getMonth());
    };


    const handleClickDate = index => {
            const date = setDate(value, index);
            setClickDate(date.getDate());
            onChange(date);
        },
        handleClickMonth = index => {
            const date = setMonth(value, index);
            setClickMonth(date.getMonth());
            onChange(date);
        },
        handleClickYear = index => {
            const date = setYear(value, index);
            setClickYear(date.getFullYear());
            onChange(date);
        };

    const checkYear = () => {
        return (isPassedYear || timeNow.getFullYear() + 2 > clickYear ? "noClickYear" : "") + " btn-gray tt";
    }, checkMonth = () => {
        return (clickYear > timeNow.getFullYear() ? "" :
            isPassedMonth ? "noClickMonth " : "") + "btn-blue t";
    };


    return (
        <div>
            <div className="pn-btn-body">
                <span className={checkYear()} onClick={prevYear}>&lt;&lt;</span>
                <span className={checkMonth()} onClick={prevMonth}>&#60;</span>
                <span>{value.getFullYear()}</span>
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
                    const isPassedYear = clickYear > timeNow.getFullYear();
                    const isPassedMonth = clickMonth > timeNow.getMonth();
                    const isPassedDay = timeNow.getDate() > dayClicked && !isPassedMonth && !isPassedYear;


                    return (
                        <Number
                            key={dayClicked}
                            isActive={isCurrentDate}
                            isPassedDay={isPassedDay}
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