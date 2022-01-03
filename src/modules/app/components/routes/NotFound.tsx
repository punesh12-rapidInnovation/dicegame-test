import { Button, NotFoundCont } from './style';
import Error404 from 'assets/images/Center404.svg'
import history from 'shared/helpers/history';


const NotFound = () => {
    return (
        <NotFoundCont>

            <img src={Error404} alt="" />
            <Button onClick={() => history.push('/')}> Back to homepage</Button>
        </NotFoundCont >
    );
};

export default NotFound;