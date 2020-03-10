import * as React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import moment from 'moment';
import {ReactComponent as Virus} from './virus.svg'
import './App.css';

export interface Data {
    confirmed: number,
    deaths: number,
    recovered: number
}

function Stats() {

    const [time, setTime] = React.useState<String>('');
    const [data, setData] = React.useState<Data>({confirmed: 0, deaths: 0, recovered: 0});
    const [loading, setLoading] = React.useState<Boolean>(true);

    React.useEffect(() => {
        getData()
        setTime(moment().format('YYYY-MM-DD HH:mm:ss'));
        setInterval(() => {
            setTime(moment().format('YYYY-MM-DD HH:mm:ss'));
        }, 1000)
        setInterval(() => {
            getData();
        }, 10000)
    }, [])

    const getData = () => {
        axios.get('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief').then((response) => {
            setData(response.data)
            setLoading(false)
        })
    }

    return (
        <div className={'main'}>
            {loading ? <div className={'loader'}>
                <i className={'fa fa-spinner fa-3x fa-spin'}/>
            </div> : <div className={'data'}>
                <Virus/>
                <h2>Coronavirus Real-time Stats</h2>
                <div className={'time'}>{time}</div>
                <div>Confirmed: <span>{data.confirmed}</span></div>
                <div>Deaths: <span>{data.deaths}</span></div>
                <div>Recovered: <span>{data.recovered}</span></div>
                <div className={'credits'}>
                    <div>App made by <a href={'http://github.com/ttracz'}><i
                        className={'fa fa-github'}/> T-TRACZ</a></div>
                    <div>API data by <a href={'https://ainize.ai/laeyoung/wuhan-coronavirus-api'}>Laeyoung</a></div>
                </div>
            </div>}
        </div>
    );
}

export default Stats;
