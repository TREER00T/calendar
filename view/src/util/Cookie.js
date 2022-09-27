import Cookies from 'universal-cookie';

const cookies = new Cookies();

function set(key, value) {
    cookies.set(key, value);
}

function get(key) {
    return cookies.get(key);
}

export {
    set,
    get
}