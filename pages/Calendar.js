import React, { Component } from 'react'
import moment from 'moment';
import {
  View, Text, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, ScrollView
} from 'react-native';
import { getEventByTime, getEventByDay } from '../Client/API/index.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Calendar } from 'react-native-calendars';


const signedUp = {key:'signedUp', color: 'orange', selectedDotColor: 'white'};
const basic = {key:'basic', color: 'gray', selectedDotColor: 'gray'};
const flagged = {key:'flagged', color: 'red'};

export default class CalendarClass extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      date: date,
      eventData: {},
      dayEvents: [],
      day: date.getFullYear()+'-'+('0'+(date.getMonth() + 1)).slice(-2)+'-'+('0' + date.getDate()).slice(-2),
      month: {
        'dateString': date.getFullYear()+'-'+('0'+ (date.getMonth() + 1)).slice(-2)+'-'+('0' + date.getDate()).slice(-2),
        'day': date.getDate(),
        'month': date.getMonth()+1,
        'timestamp': 0,
        'year': date.getFullYear(),
      },

    };
  }
  componentDidMount() {
    this.getMonthData(this.state.month);
    this.setState({
      day: this.state.month.dateString
    });
  }

  showList(arr) {
    return arr.map(event => {
      return <TouchableOpacity key={event.id} onPress={() => this.props.navigation.navigate('EventView', { 
                                        id: event.id, name: event.name,  location: event.location, description: event.description,
                                        etime: event.etime, maxslots: event.maxslots, slots: event.slots, edate: event.edate,
                                        fromMyEvent: false
                                        })}>
      <View style={styles.event} >
        {
          event.slots == 0 ?
          <Text style={styles.title}>{event.name}</Text>
          :
          <Text style={styles.titleOrange}>{event.name}</Text>
        }
        <Text style={styles.location}>{event.edate.slice(0, 10)}</Text>
        <Text style={styles.location}>{event.location} at {event.etime.slice(0,5)}</Text>
        <Text style={styles.description}>{event.description.length > 50 ? event.description.slice(0,50) + "..." : event.description}</Text>
      </View>
      </TouchableOpacity>
    })
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
    this.getEvents(day);
  };
  onMonthChange(month) {
    this.setState({
      day: {}
    });
    this.setState({
      month: month.month
    });
    this.getEvents(month);
    this.getMonthData(month);

  };
  render() {
    var markedDates = {};
    for (var i = 0; i < this.state.eventData.length; i++) {
      markedDates[this.state.eventData[i].edate.slice(0, 10)] = 
      this.state.eventData[i].slots > 0 ? {dots: [signedUp]}
      :
      {dots: [basic]};
      //  \''+this.state.eventData[i].edate+'\'
    }
    if (this.state.day) {
      markedDates[this.state.day] = {
        selected: true, 
        selectedColor: 'orange', 
        disableTouchEvent: true,
      }
    }
    
    return (
      
      !(this.state.eventData) ? (<ActivityIndicator />) :
      <React.Fragment>
        <Calendar
            style={{
              paddingBottom: 20,
              borderBottomWidth: 1, 
              borderColor: 'gray',
              shadowColor: "#000000",
              shadowOpacity: 0.3,
              shadowRadius: 5,
              shadowOffset: {
                height: 1,
                width: 0
              }
            }}
            theme={{
              todayTextColor: 'orange',
              calendarBackground: '#f2f2f2',
              selectedDayBackgroundColor: 'orange',
              selectedDayTextColor: '#ffffff',
              textDayFontWeight: '600',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '500',
              textDayFontSize: 15,
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
          { //If data then display api otherwise loading indicator
            this.state.dayEvents ? ( //if data
              <ScrollView showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}>
                  <React.Fragment>
                        <View style={styles.eventbox}>
                          { this.state.dayEvents && this.showList(this.state.dayEvents)}
                        </View>
                  </React.Fragment>
                  
                </ScrollView>
            )
              : //else 
              (<ActivityIndicator />)
          }
        </React.Fragment>
    );
  }
  
}

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
    marginTop: -5
  },
  createbutton:{
    position: 'fixed',
    width: 60,
    height: 60,
    borderRadius: 60/2,
    zIndex: 0,
    backgroundColor: 'orange',
    margin: 20,
    marginLeft: 'auto',
    padding: 13,
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  container: {

  },
  eventbox: {
    flexDirection: "column",
    flex: 1,
    width: '100%',
    position: 'absolute',
    top: '50%', 
    height: '100%'
  },
  calendar: {
    position: 'absolute',
    top: 10,
    right: 10, 
  },
  event: {
    flexDirection: "column",
    //height: 100,
    padding: 20,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'gray',
    borderStyle: 'solid'
  },
  title: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 22
  },
  titleOrange: {
    color: "orange",
    fontWeight: 'bold',
    fontSize: 22
  },
  description: {
    fontSize: 16
  },
  location: {
    fontSize: 16,
    fontStyle: "italic",
    color: 'gray'
  },
});