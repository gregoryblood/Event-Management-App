import React, { Component } from 'react'
import {
  View, Text
} from 'react-native'
import { WhiteSpace, WingBlank, Card, Icon } from '@ant-design/react-native';
import * as Font from 'expo-font';
import Home1Page from './MySchedules' //My Events page

export default class Schedules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'Tab2', //The default opentab1
      monthList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthValue: 2
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

  onChangeTab(tabName) {
    //switch tab
    this.setState({
      selectedTab: tabName,
    });
  }

  setMonth() {
    //Change month
    if (this.state.monthValue == 11) {
      this.setState({
        monthValue: 0
      })
    } else {
      var index = this.state.monthValue
      this.setState({
        monthValue: index + 1
      })
    }
  }

  render() {
    return (
      <View style={{ height: '97%', overflow: 'scroll' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{
            flex: 1, textAlign: 'left', padding: 12,
            margin: 'auto 2px',
            display:this.state.selectedTab == 'Tab1' ?'block':'none'
          }}>
            {this.state.monthList[this.state.monthValue]}<span style={{ color: '#999' }} onClick={() => this.setMonth()}> ⏷ </span>
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <div style={{ margin: '12px' }}>
              <span onClick={() => this.onChangeTab('Tab1')} style={{ 'overflow': 'none', 'zIndex': 1,'position': 'fixed', 'top': 5, 'right': 50, 'background': this.state.selectedTab == 'Tab1' ? "#ff9900" : "#fff", padding: 6, display: 'inline-block', border: '1px solid #ff9900' }}><Icon name={"book"} color={this.state.selectedTab == 'Tab1' ? "#fff" : "#666"} /></span>
              <span onClick={() => this.onChangeTab('Tab2')} style={{ 'overflow': 'none','zIndex': 1, 'position': 'fixed', 'top': 5, 'right': 85, 'background': this.state.selectedTab == 'Tab2' ? "#ff9900" : "#fff", padding: 6, display: 'inline-block', border: '1px solid #ff9900' }}><Icon name={"menu"} color={this.state.selectedTab == 'Tab2' ? "#fff" : "#666"} /></span>
            </div>
          </div>
        </div>
        {
          this.state.selectedTab == 'Tab1' ? <div>
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
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>1</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>2</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>3</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>
                    4
              <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#000', margin: '0px auto' }}></div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px' }}>5</div>
                </div>
                <div style={{ marginBottom: 12, border: '1px solid #999', borderRadius: 5, display: 'flex', flexDirection: 'row' }}>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>6</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>7</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>8</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>
                    9
              <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>10</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>11</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px' }}>12</div>
                </div>
                <div style={{ marginBottom: 12, border: '1px solid #999', borderRadius: 5, display: 'flex', flexDirection: 'row' }}>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>13</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>14</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>
                    15
              <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>16</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>17</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>18</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px' }}>19</div>
                </div>
                <div style={{ marginBottom: 12, border: '1px solid #999', borderRadius: 5, display: 'flex', flexDirection: 'row' }}>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>20</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>21</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>22</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>
                    23
              <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#000', margin: '0px auto' }}></div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>24</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>
                    25
              <div style={{ width: 5, height: 5, borderRadius: '2.5px', background: '#f50', margin: '0px auto' }}></div></div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px' }}>26</div>
                </div>
                <div style={{ marginBottom: 12, border: '1px solid #999', borderRadius: 5, display: 'flex', flexDirection: 'row' }}>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>27</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>28</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>29</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>30</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>31</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px', borderRight: '1px solid #999' }}>1</div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '6px 0px' }}>2</div>
                </div>
              </div>
            </WingBlank>

            {/* card content */}
            <WingBlank>
              <Card>
                <WingBlank><h1 color="#f50">First Event</h1></WingBlank>
                <WingBlank><div>Wendnesday. Septemer 9,2021</div></WingBlank>
                <WingBlank><div>Location at 6:00 pm</div></WingBlank>
                <WingBlank><div>Description</div></WingBlank>
              </Card>
              <Card>
                <WingBlank><h1 color="#f50">Event</h1></WingBlank>
                <WingBlank><div>Wendnesday. Septemer 10,2021</div></WingBlank>
                <WingBlank><div>Location at 6:00 pm</div></WingBlank>
                <WingBlank><div>Description</div></WingBlank>
              </Card>
              <Card>
                <WingBlank><h1 color="#f50">Super long event name...</h1></WingBlank>
                <WingBlank><div>Wendnesday. Septemer 9,2021</div></WingBlank>
                <WingBlank><div>Location at 6:00 pm</div></WingBlank>
                <WingBlank><div>Description</div></WingBlank>
              </Card>
              <WhiteSpace></WhiteSpace>
            </WingBlank>
          </div> : <Home1Page></Home1Page>}
      </View>
    )
  }


  componentDidMount() {
  }
}