import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import {ListGroup} from 'react-bootstrap';
import {getBaseUrl} from '../../util/Util';
import * as Cookie from '../../util/Cookie';

let resObject;

Axios.get(`${getBaseUrl()}admin/providers`).then(res => {
    resObject = res.data;
});

function ReserveProvider() {
    const navigate = useNavigate();


    const handleClick = (e) => {
        Cookie.set('providerId', e.target.id);
        navigate('/service/reserve/workTimeInDay');
    }


    return (
        <div className="list">
            <ListGroup>
                {
                    resObject.data.map(e =>
                        <ListGroup.Item action id={e.id} onClick={handleClick}>
                            {e.username}
                        </ListGroup.Item>
                    )
                }
            </ListGroup>

        </div>
    );
}

export default ReserveProvider;
