import './Auth.css';
import Select from 'react-select';
import {FormGroup, FormControl, FormLabel, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import {isEmpty} from '../util/validator';
import {getBaseUrl} from '../util/Util';
import * as Cookie from '../util/Cookie';
import Axios from 'axios';


const personType = [
    {label: 'provider', value: 'provider'},
    {label: 'user', value: 'user'},
    {label: 'admin', value: 'admin'}
];


const state = {
    formData: {},
    formSubmitted: false,
    loading: false,
    itemSelected: {}
};

function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let {formData} = state;
    formData[name] = value;

    state.formData = formData;
}

function validateLoginForm() {

    const {formData} = state;

    return !isEmpty(formData.username) && !isEmpty(formData.password) && !isEmpty(state.itemSelected);
}

function Auth() {

    const navigate = useNavigate();

    async function singIn() {

        let isValidForm = validateLoginForm();

        if (!isValidForm)
            return;

        let res = await Axios.post(`${getBaseUrl() + state.itemSelected.value}/auth/signIn`,
            {
                username: state.formData.username,
                password: state.formData.password
            });

        if (res.data.statusCode === 200) {
            Cookie.set('personType', state.itemSelected.value);
            navigate('/home')
        }

    }


    return (
        <div className="App">
            <div>

                <FormGroup controlId="username"
                           validationState={state.formSubmitted}>
                    <FormLabel>Username</FormLabel>
                    <FormControl type="text" name="username" placeholder="Enter your username"
                                 onChange={handleInputChange}/>

                </FormGroup>
                <br/>
                <FormGroup controlId="password"
                           validationState={state.formSubmitted}>
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" name="password" placeholder="Enter your password"
                                 onChange={handleInputChange}/>

                </FormGroup>
                <br/>
                <FormLabel>Choose your person type</FormLabel>
                <br/>
                <Select
                    options={personType}
                    onChange={(data) => {
                        state.itemSelected = data
                    }}
                />
                <br/>
                <Button onClick={singIn} bsStyle="primary">Sign-In</Button>

            </div>

        </div>
    );
}

export default Auth;
