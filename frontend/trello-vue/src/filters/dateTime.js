import moment from 'moment'
moment.locale('zh-cn');
export default val => {
    return moment(val).format('LLL');
}