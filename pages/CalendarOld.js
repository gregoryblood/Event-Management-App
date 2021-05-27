import React, { Component } from 'react'
import {
  View, Text
} from 'react-native';
import { WhiteSpace, WingBlank, Card, Icon } from '@ant-design/react-native';
import * as Font from 'expo-font';
import Home1Page from './MyEvents'; //My Events page
import moment from 'moment';
import { getEventByTime } from '../Client/API/index.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'Tab2', //The default opentab1
      monthList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthValue: 0,
      eventData: [],
      dayEvent: []
    };
  }

  async componentDidMount() {
    //get icon
    await Font.loadAsync(
      'antfill',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antfill.ttf')
    );
    // eslint-disable-next-line
  }
  //切换tab event
  onChangeTab(tabName) {
    console.log(tabName)
    //switch tab
    this.setState({
      selectedTab: tabName,
    });
    if (tabName == 'Tab1') {
      this.getMonthData(this.state.monthValue)
    } else {
      this.setState({ dayEvent: [] })
    }
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
  //月 Switch month
  setMonth() {
    //Change month
    if (this.state.monthValue == 11) {
      this.setState({
        monthValue: 0
      })
      this.getMonthData(0)
    } else {
      var index = this.state.monthValue
      this.setState({
        monthValue: index + 1
      })
      this.getMonthData(index + 1)
    }
  }
  //Determine whether there is an event on the incoming date
  showtips(val) {
    var hidden = false;
    let monthVal = this.state.monthValue + 1
    if (monthVal < 10) {
      monthVal = "0" + monthVal
    }
    let dayVal = val;
    if (dayVal < 10) {
      dayVal = "0" + dayVal
    }
    //https://momentjs.com/
    let dat = moment(new Date().getFullYear() + '-' + monthVal + '-' + dayVal + ' 00:00:00')
    dat = new Date(dat).getTime()
    //If yes, display the following dot
    if (this.state.eventData && this.state.eventData.length) {
      // console.log(this.state.eventData)
      this.state.eventData.forEach(element => {
        let edate = new Date(moment(element.edate).format('YYYY-MM-DD') + " 00:00:00").getTime()
        // console.log(edate,dat,monthVal,dayVal,dat,moment("2021-02-03T00:00:00.000Z").format('YYYY-MM-DD') + " 00:00:00")
        if (edate == dat) {
          hidden = true
        }
      });
    }
    return hidden;
  }
  //Select the date, if there is an event on the date, access the interface to get the event
  showEvents(val) {
    //console.log(this.state.eventData)
    let monthVal = this.state.monthValue + 1
    if (monthVal < 10) {
      monthVal = "0" + monthVal
    }
    let dayVal = val;
    if (dayVal < 10) {
      dayVal = "0" + dayVal
    }
    let dat = moment(new Date().getFullYear() + '-' + monthVal + '-' + dayVal + ' 00:00:00')
    //console.log(dat)
    dat = new Date(dat).getTime()
    let dayEvent = []
    if (this.state.eventData && this.state.eventData.length) {
      this.state.eventData.forEach(element => {
        let edate = new Date(moment(element.edate).format('YYYY-MM-DD') + " 00:00:00").getTime()
        if (edate == dat) {
          dayEvent.push(element)
        }
      });
    }
    //console.log(dayEvent)
    this.setState({
      dayEvent
    })
  }
  //显示点击日期的所有事件
  //Show all events of the date you click
  showList(arr) {
    return arr.map((item, i) => {
      return <WingBlank>
        <Card>
          <WingBlank><h1 color="black">{item.name}</h1></WingBlank>
          <WingBlank><div>{item.edate}</div></WingBlank>
          <WingBlank><div>{item.location}</div></WingBlank>
          <WingBlank><div>{item.description}</div></WingBlank>
        </Card>
        <WhiteSpace></WhiteSpace>
      </WingBlank>
    })
  }

  render() {
    return (
      <View style={{ height: '97%', overflow: 'scroll' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{
            flex: 1, textAlign: 'left', padding: 12,
            margin: 'auto 2px',
            display: 'block'
          }}>
            {this.state.monthList[this.state.monthValue]}<span style={{ color: '#999' }} onClick={() => this.setMonth()}> ⏷ </span>
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <div style={{ margin: '12px' }}>
              <span  style={{ 'overflow': 'none', 'zIndex': 1, 'position': 'fixed', 'top': 5, 'right': 50, 'background': this.state.selectedTab == 'Tab1' ? "#D73F09" : "#fff", padding: 6, display: 'inline-block', border: '1px solid #ff9900' }}><Ionicons name={"ios-calendar"} size={30} color={this.state.selectedTab == 'Tab1' ? "#fff" : "#666"} /></span>
              <span  onClick={() => this.props.navigation.navigate('ViewEvents')} style={{ 'overflow': 'none', 'zIndex': 1, 'position': 'fixed', 'top': 5, 'right': 85, 'background': this.state.selectedTab == 'Tab2' ? "#ff9900" : "#fff", padding: 6, display: 'inline-block', border: '1px solid #ff9900' }}><Ionicons name={"ios-list"} size={30} color={this.state.selectedTab == 'Tab1' ? "#666" : "#fff"} /></span>
            </div>
          </div>
        </div>
        {
          <div>
            <WingBlank>
              {/*Calendar content */}
              <div>
                <div style={{ marginBottom: 12, borderRadius: 5, display: 'flex', flexDirection: 'row' }}>
                  <div style={{ flex: 1, textAlign: 'center' }}>S</div>
                  <div style={{ flex: 1, textAlign: 'center' }}>M</div>
                  <div style={{ flex: 1, textAlign: 'center' }}>T</div>
                  <div style={{ flex: 1, textAlign: 'center' }}>W</div>
                  <div style={{ flex: 1, textAlign: 'center' }}>T</div>
                  <div style={{ flex: 1, textAlign: 'center' }}>F</div>
                  <div style={{ flex: 1, textAlign: 'center' }}>S</div>
                </div>
                <div style={{ marginBottom: 12, border: '1px solid #999', borderRadius: 5, display: 'flex', flexDirection: 'row' }}>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>30</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>31</div>
                  <div onClick={() => this.showEvents(1)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }} >1
              {this.showtips(1) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(2)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>2
              {this.showtips(2) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(3)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>3
              {this.showtips(3) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(4)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>
                    4
               {this.showtips(4) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}
                  </div>
                  <div onClick={() => this.showEvents(5)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px' }}>5
              {this.showtips(5) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                </div>
                <div style={{ marginBottom: 12, border: '1px solid #999', borderRadius: 5, display: 'flex', flexDirection: 'row' }}>
                  <div onClick={() => this.showEvents(6)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>6
              {this.showtips(6) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(7)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>7
              {this.showtips(7) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(8)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>8
              {this.showtips(8) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(9)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>9
              {this.showtips(9) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(10)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>10
              {this.showtips(10) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(11)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>11
              {this.showtips(11) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(12)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px' }}>12
              {this.showtips(12) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                </div>
                <div style={{ marginBottom: 12, border: '1px solid #999', borderRadius: 5, display: 'flex', flexDirection: 'row' }}>
                  <div onClick={() => this.showEvents(13)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>13
              {this.showtips(13) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(14)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>14
              {this.showtips(14) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(15)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>15
              {this.showtips(15) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(16)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>16
              {this.showtips(16) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(17)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>17
              {this.showtips(17) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(18)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>18
              {this.showtips(18) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(19)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px' }}>19
              {this.showtips(19) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                </div>
                <div style={{ marginBottom: 12, border: '1px solid #999', borderRadius: 5, display: 'flex', flexDirection: 'row' }}>
                  <div onClick={() => this.showEvents(20)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>20
              {this.showtips(20) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(21)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>21
              {this.showtips(21) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(22)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>22
                  {this.showtips(22) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(23)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>23
              {this.showtips(23) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(24)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>24
              {this.showtips(24) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(25)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>25
              {this.showtips(25) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(26)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px' }}>26
              {this.showtips(26) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                </div>
                <div style={{ marginBottom: 12, border: '1px solid #999', borderRadius: 5, display: 'flex', flexDirection: 'row' }}>
                  <div onClick={() => this.showEvents(27)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>27
              {this.showtips(27) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(28)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>28
              {this.showtips(28) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(29)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>29
              {this.showtips(29) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(30)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>30
              {this.showtips(30) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div onClick={() => this.showEvents(31)} style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>31
              {this.showtips(31) && <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>}</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>1</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px' }}>2</div>
                </div>
              </div>
            </WingBlank>

            {/* card content */}
            {this.state.dayEvent && this.showList(this.state.dayEvent)}
          </div>}
      </View>
    )
  }


  componentDidMount() {
  }
}