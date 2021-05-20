import React, { Component } from 'react'
import moment from 'moment';
import {
  View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, ScrollView
} from 'react-native';
import { getEventByTime, getEventByDay } from '../Client/API/index.js';
import {Feather} from '@expo/vector-icons';
import {Calendar} from 'react-native-calendars';
import { EventList } from './Components/EventList';

const signedUp = {key:'signedUp', color: 'gray', selectedDotColor: 'white'};
const basic = {key:'basic', color: 'gray', selectedDotColor: 'gray'};
const flagged = {key:'flagged', color: 'red'};

export default class CalendarView extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    
    this.state = {
      date: date,
      eventData: {},
      dayEvents: [],
      day: null,
      month: {
        'dateString': date.getFullYear()+'/'+
          ('0' + (date.getMonth() + 1)).slice(-2)+'/'+
          ('0' + date.getDate()).slice(-2),
        'day': ('0' + date.getDate()).slice(-2), 
        'month': ('0' + (date.getMonth() + 1)).slice(-2),
        'timestamp': 0,
        'year': date.getFullYear(),
      },

    };
  } 
  componentDidMount() {

    //This will update when naved back to 
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({
        day: null,
        dayEvents: []
      });
      this.getMonthData(this.state.month);
    });
    return () => {
      // Clear setInterval in case of screen unmount
      clearTimeout(interval);
      // Unsubscribe for the focus Listener
      unsubscribe;
    };

  }

  async getEvents(day) {
    //Calls api and will finish when data is loaded
    var startDate = moment(day.year + '-' + day.month + '-'+day.day + ' 00:00:00.00');
    
    const { data } = await getEventByDay(moment(startDate).format('YYYY-MM-DD'));
    this.setState({dayEvents: data});
  }
  async getMonthData(month) {
    var startDate = moment(month.year + '-' + (month.month) + '-01' + ' 00:00:00.00');
    var endDate = startDate.clone().endOf('month');
    //console.log(startDate.toDate(), moment(startDate).format('YYYY-MM-DD'));
    //console.log(endDate.toDate(), moment(endDate).format('YYYY-MM-DD'));
    var res = {};
    try {
      res = await getEventByTime(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'));
    }catch(e) {
      console.error(e);
    }
    
    if (res.data)
      this.setState({ eventData: res.data });
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
    if (this.state.day != 'Invalid Date')
      this.getEvents(day);
  };
  onMonthChange(month) {
    this.setState({
      day: {}
    });
    this.setState({
      month: month.month
    });
    
    this.getMonthData(month);
    this.getEvents(month);
  };
  render() {
    var markedDates = {};
    for (var i = 0; i < this.state.eventData.length; i++) {
      markedDates[this.state.eventData[i].edate.slice(0, 10)] = 
      this.state.eventData[i].slots > 0 ? 
      {dots: [signedUp]}
      :
      {dots: [basic]};
      //  \''+this.state.eventData[i].edate+'\'
    }
    if (this.state.day) {
      markedDates[this.state.day] = {
        selected: true, 
        selectedColor: '#ff7600', 
        disableTouchEvent: true,
      }
    }
    
    return (
      
      !(this.state.eventData) ? (<ActivityIndicator />) :
      <React.Fragment>
        <Calendar
            style={{
              paddingTop: 0,
              paddingBottom: 20,
              borderBottomWidth: 1, 
              borderColor: 'gray',
              shadowColor: "#000000",
              shadowOpacity: 0.3,
              shadowRadius: 10,
              shadowOffset: {
                height: 2,
                width: 0
              }
            }}
            theme={{
              todayTextColor: '#ff7600',
              calendarBackground: '#f2f2f2',
              selectedDayBackgroundColor: '#ff7600',
              selectedDayTextColor: '#ffffff',
              textDayFontWeight: '600',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '500',
              textDayFontSize: 15,
              textMonthFontSize: 24,
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
            renderArrow={(direction) => (<Feather size={42} color={'gray'} name={direction == 'left'? 'arrow-left' : 'arrow-right'}/>)}            // Do not show days of other months in month page. Default = false
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
          { //If data then display api otherwise loading indicator
            this.state.dayEvents ? ( //if data
              <ScrollView showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}>
                  <React.Fragment>
                        <View style={styles.eventbox}>
                          { this.state.dayEvents && EventList(this.props.navigation, 'CalendarView', this.state.dayEvents, 'default')}
                        </View>
                  </React.Fragment>
                  
                </ScrollView>
            )
              : //else 
              (<ActivityIndicator style={{top: '75%'}}/>)
          }
          {
            gUser.type !== 'Student' ? 
            <TouchableOpacity style={styles.createbutton} title="Add Event" color = '#ff9900' onPress={() => this.props.navigation.navigate('CreateEvent', {lastPage: 'ViewMyEvents'})}>
              <Feather style={styles.icon} name={'edit'} size={35} color={'white'} />
            </TouchableOpacity>
            :
            <View/>
          }
        </React.Fragment>
    );
  }
  
}

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
    marginTop: -3
  },
  createbutton:{
    position: 'fixed',
    width: 60,
    height: 60,
    borderRadius: 60/2,
    zIndex: 0,
    backgroundColor: '#ff7600',
    margin: 20,
    marginLeft: 'auto',
    padding: 13,
    position: 'absolute',
    bottom: 18,
    right: 10,
    textAlign:'center',
  },
  
  eventbox: {
    flexDirection: "column",
    flex: 1,
    width: '100%',
    position: 'absolute',
    top: '50%', 
    height: '100%'
  },
});