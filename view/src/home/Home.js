import './Home.css';
import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';


function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <Button className="btn-r" onClick={() => {
                navigate('/service/reserve')
            }} bsStyle="primary">رزرو خدمت</Button>
        </div>
    );
}

export default Home;
