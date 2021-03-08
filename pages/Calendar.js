import React, { Component } from 'react'
import {
  View
} from 'react-native';
import { WhiteSpace, WingBlank, Card } from '@ant-design/react-native';

import moment from 'moment';
import { getEventByTime } from '../Client/API/index.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Calendar, Agenda, } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class CalendarClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: undefined,
      eventData: [],
      dayEvent: []
    };
  }
  componentDidMount() {
    this.state.date = new Date();
  }
  
  async getMonthData(val) {
    this.setState({ dayEvent: [] })
    console.log(val)
    let monthVal = val + 1
    if (monthVal < 10) {
      monthVal = "0" + monthVal
    }
    var startDate = moment(new Date().getFullYear() + '-' + monthVal + '-01' + ' 00:00:00');
    var endDate = startDate.clone().endOf('month');
    //console.log(startDate.toDate(), moment(startDate).format('YYYY-MM-DD'));
    //console.log(endDate.toDate(), moment(endDate).format('YYYY-MM-DD'));
    const { data } = await getEventByTime(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'));
    //console.log(data)
    this.setState({ eventData: data })
  }
  showList(arr) {
    return arr.map((item, i) => {
      return <WingBlank>
        <Card>
          <WingBlank>{item.name}</WingBlank>
          <WingBlank>{item.edate}</WingBlank>
          <WingBlank>{item.location}</WingBlank>
          <WingBlank>{item.description}</WingBlank>
        </Card>
        <WhiteSpace></WhiteSpace>
      </WingBlank>
    })
  }
  render() {
    return (
      <React.Fragment>

        <Calendar
            style={{
              zIndex: 0,
              position: 'absolute',
              top: 75,
              width: '100%',
            }}
            theme={{
              todayTextColor: 'orange',
              calendarBackground: '#f2f2f2'
            }}
            // Initially visible month. Default = Date()
            current={this.state.date}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2021-01-01'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2040-12-30'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={(day) => {console.log('selected day', day)}}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={(day) => {console.log('selected day', day)}}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MMMM yyyy'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => {console.log('month changed', month)}}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            renderArrow={(direction) => (<Ionicons name={direction == 'left'? 'ios-arrow-back' : 'ios-arrow-forward'}/>)}            // Do not show days of other months in month page. Default = false
            hideExtraDays={false}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={false}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={subtractMonth => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            // Disable left arrow. Default = false
            disableArrowLeft={false}
            // Disable right arrow. Default = false
            disableArrowRight={false}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={true}
            // Replace default month and year title with custom one. the function receive a date as parameter.
            //renderHeader={(date) => {/*Return JSX*/}}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
          />
          
      </React.Fragment>
    )
  }
  
}

/*
        <TouchableOpacity onPress={() => fromMyEvent ? this.props.navigation.navigate('ViewMyEvents') : this.props.navigation.navigate('ViewEvents')} 
            style={{ flex: 1, textAlign: 'right', position: 'absolute', right: 0, top: 0, zIndex: 2}}>
          <View style={{ margin: 12 }}>
            <View style={{ overflow: 'none', zIndex: 1, position: 'absolute', top: 10, right: 10, backgroundColor: "#ff9900", padding: 6,  border: '1px solid #ff9900', borderTopRightRadius: 8, borderBottomRightRadius: 8 }}><Ionicons name={"ios-calendar"} size={30} color={"#fff"} /></View>
            <View style={{ overflow: 'none', zIndex: 1, position: 'absolute', top: 10, right: 45, backgroundColor: "#fff", padding: 6,  border: '1px solid #ff9900', borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}><Ionicons name={"ios-list"} size={30} color={"#666"} /></View>
          </View>
        </TouchableOpacity>
*/