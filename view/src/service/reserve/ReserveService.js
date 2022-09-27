import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import {ListGroup} from 'react-bootstrap';
import {getBaseUrl} from '../../util/Util';
import * as Cookie from '../../util/Cookie';

let resObject;

Axios.get(`${getBaseUrl()}admin/services`).then(res => {
    resObject = res.data;
});

function ReserveService() {
    const navigate = useNavigate();

    const handleClick = (e) => {
        Cookie.set('serviceId', e.target.id);
        navigate('provider');
    }


    return (
        <div className="list">
            <ListGroup>
                {
                    resObject.data.map(e =>
                        <ListGroup.Item action id={e.id} onClick={handleClick}>
                            {e.name}
                        </ListGroup.Item>
                    )
                }
            </ListGroup>

        </div>
    );
}

export default ReserveService;
