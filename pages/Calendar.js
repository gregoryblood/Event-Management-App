import React, { Component } from 'react'
import {
  View, StyleSheet
} from 'react-native';
import { WhiteSpace, WingBlank, Card } from '@ant-design/react-native';

import moment from 'moment';
import { getEventByTime } from '../Client/API/index.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Calendar, Agenda, } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';


const signedUp = {key:'signedUp', color: 'orange', selectedDotColor: 'white'};
const basic = {key:'basic', color: 'gray', selectedDotColor: 'gray'};
const flagged = {key:'flagged', color: 'red'};

export default class CalendarClass extends Component {
  constructor(props) {
    super(props);
    const date = new Date()
    this.state = {
      date: date,
      eventData: [],
      dayEvent: [],
      day: date.getFullYear()+'-'+('0'+date.getMonth()).slice(-2)+'-'+('0' + date.getDay()).slice(-2),
      month: {
        'dateString': date.getFullYear()+'-'+('0'+date.getMonth()).slice(-2)+'-'+('0' + date.getDay()).slice(-2),
        'day': date.getDay(),
        'month': date.getMonth(),
        'timestamp': 0,
        'year': date.getFullYear(),
      },

    };
  }
  componentDidMount() {
    this.getMonthData(this.state.month);
  }
  
  async getMonthData(month) {
    //console.log(month);
    var startDate = moment(month.year + '-' + month.month + '-01' + ' 00:00:00.00');
    var endDate = startDate.clone().endOf('month');
    //console.log(startDate.toDate(), moment(startDate).format('YYYY-MM-DD'));
    //console.log(endDate.toDate(), moment(endDate).format('YYYY-MM-DD'));

    const { data } = await getEventByTime(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'));
    if (data)
      this.setState({ eventData: data });
    //console.log(this.state.eventData);

  }


  timeToString() {
    const date = this.state.date;
    return date.toISOString().split('T')[0];
  }

  onDayPress(day) {
    this.setState({
      day: day.dateString
    });
  };
  onMonthChange(month) {
    this.setState({
      month: month.month
    });
    console.log(month);

  };
  render() {
    const day = this.state.day
    var markedDates = null;
    markedDates = {
      [this.state.day]: {
        selected: true, 
        selectedColor: 'orange', 
        disableTouchEvent: true,
      }
    }
    for (var i = 0; i < this.state.eventData.length; i++) {
      markedDates[this.state.eventData[i].edate.slice(0, 10)] = 
      this.state.eventData[i].slots > 0 ? {dots: [signedUp]}
      :
      {dots: [basic]};
      //  \''+this.state.eventData[i].edate+'\'
    }
    
    console.log(markedDates);
    return (
      !day ? <span>LoadingWells</span> :
      <Calendar
          theme={{
            todayTextColor: 'orange',
            calendarBackground: '#f2f2f2',
            selectedDayBackgroundColor: 'orange',
            selectedDayTextColor: '#ffffff',
            textDayFontWeight: '600',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '500',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
          // Initially visible month. Default = Date()
          current={this.state.date}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={'2021-01-01'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={'2040-12-30'}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {this.onDayPress(day)}}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {this.onDayPress(day)}}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'MMMM yyyy'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {this.onMonthChange(month)}}
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
          //renderHeader={(date) => {/*Return JSX}}
          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={true}
          markingType={'multi-dot'}

          markedDates={markedDates}
        />
    );
  }
  
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});
/*
        <Agenda
          // The list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key has to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          items={{
            '2021-03-08': [{name: 'item 1 - any js object'}],
            '2012-05-23': [{name: 'item 2 - any js object', height: 80}],
            '2012-05-24': [],
            '2012-05-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
          }}
          // Callback that gets called when items for a certain month should be loaded (month became visible)
          loadItemsForMonth={(month) => {console.log('trigger items loading')}}
          // Callback that fires when the calendar is opened or closed
          onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
          // Callback that gets called on day press
          onDayPress={(day)=>{console.log('day pressed')}}
          // Callback that gets called when day changes while scrolling agenda list
          onDayChange={(day)=>{console.log('day changed')}}
          // Initially selected day
          selected={this.state.date}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={'2021-01-01'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={'2050-12-30'}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          // Specify how each item should be rendered in agenda
          renderItem={this.renderItem.bind(this)}
          // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
          renderDay={(day, item) => {return (<View />);}}
          // Specify how empty date content with no items should be rendered
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          // Specify how agenda knob should look like
          renderKnob={() => {return (<View>Knob</View>);}}
          // Specify what should be rendered instead of ActivityIndicator
          renderEmptyData = {() => {return (<View />);}}
          // Specify your item comparison function for increased performance
          rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
          // Hide knob button. Default = false
          hideKnob={false}
          // By default, agenda dates are marked if they have at least one item, but you can override this if needed
          markedDates={{
            '2012-05-16': {selected: true, marked: true},
            '2012-05-17': {marked: true},
            '2012-05-18': {disabled: true}
          }}
          // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
          disabledByDefault={true}
          // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
          onRefresh={() => console.log('refreshing...')}
          // Set this true while waiting for new data from a refresh
          refreshing={false}
          // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
          refreshControl={null}
          // Agenda theme
          theme={{
            todayTextColor: 'orange',
            //calendarBackground: '#f2f2f2',
            selectedDayBackgroundColor: 'orange',
            selectedDayTextColor: '#ffffff',
            textDayFontWeight: '600',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '500',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,

            agendaDayTextColor: 'yellow',
            agendaDayNumColor: 'green',
            agendaTodayColor: 'red',
            agendaKnobColor: 'blue'
          }}

        />
        <TouchableOpacity onPress={() => fromMyEvent ? this.props.navigation.navigate('ViewMyEvents') : this.props.navigation.navigate('ViewEvents')} 
            style={{ flex: 1, textAlign: 'right', position: 'absolute', right: 0, top: 0, zIndex: 2}}>
          <View style={{ margin: 12 }}>
            <View style={{ overflow: 'none', zIndex: 1, position: 'absolute', top: 10, right: 10, backgroundColor: "#ff9900", padding: 6,  border: '1px solid #ff9900', borderTopRightRadius: 8, borderBottomRightRadius: 8 }}><Ionicons name={"ios-calendar"} size={30} color={"#fff"} /></View>
            <View style={{ overflow: 'none', zIndex: 1, position: 'absolute', top: 10, right: 45, backgroundColor: "#fff", padding: 6,  border: '1px solid #ff9900', borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}><Ionicons name={"ios-list"} size={30} color={"#666"} /></View>
          </View>
        </TouchableOpacity>

        
*/