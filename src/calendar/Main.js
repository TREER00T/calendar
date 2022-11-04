import {format} from 'date-fns';
import {useState} from 'react';
import Calendar from './Calendar';
import './Main.css';



function Main() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleSetToday = () => setCurrentDate(new Date());

    return (
        <div className="light">
            <div className="calendar">
                    <span className="calendar-header">
                        {format(currentDate, "LLLL")}
                    </span>
                <span className="btn-outline-blue" onClick={handleSetToday}>Now</span>

                <Calendar value={currentDate} onChange={setCurrentDate}/>
            </div>

        </div>
    );

}

export default Main;