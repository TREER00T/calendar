import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import {format} from 'date-fns';
import {useState} from 'react';
import {getBaseUrl} from '../../util/Util';
import * as Cookie from '../../util/Cookie';
import Calendar from './calendar/Calendar';
import './ReserveWorkTimeInDay.css';

let resObject;


Axios.get(`${getBaseUrl()}provider/workTimeInDays/2`, { //${Cookie.get('providerId')}
    params: {
        service_id: 2 //Cookie.get('serviceId')
    }
}).then(res => {
    resObject = res.data;
});


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