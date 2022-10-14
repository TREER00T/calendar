import {useNavigate} from 'react-router-dom';
import {format} from 'date-fns';
import {useState} from 'react';
import Calendar from './calendar/Calendar';
import './ReserveWorkTimeInDay.css';



function ReserveWorkTimeInDay() {
    const navigate = useNavigate();

    const [currentDate, setCurrentDate] = useState(new Date());

    const handleSetToday = () => setCurrentDate(new Date());

    return (
        <div className="light">
            <div className="calendar">
                    <span className="calendar-header">
                        {format(currentDate, "LLLL")}
                    </span>
                <button className="margin" onClick={handleSetToday}>Today</button>

                <Calendar value={currentDate} onChange={setCurrentDate}/>
            </div>

        </div>
    );

}

export default ReserveWorkTimeInDay;