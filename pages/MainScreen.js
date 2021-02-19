import React from 'react';
import { TabBar,Icon } from '@ant-design/react-native';

import * as Font from 'expo-font';

//import EventInfo from './EventInfo'
import Home1Page from './MySchedules' //My Events page页面
import Home2Page from './Schedules' //Explore page页面
import Home3Page from './Search' //Search page页面

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'Tab1', //The default open默认开启tab1
    };
  }

  async componentDidMount() {
    await Font.loadAsync(
        'antoutline',
        // eslint-disable-next-line
        require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    );

    await Font.loadAsync(
        'antfill',
        // eslint-disable-next-line
        require('@ant-design/icons-react-native/fonts/antfill.ttf')
    );
    // eslint-disable-next-line
    this.setState({ isReady: true });
}


  onChangeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }
  render() {
    return (
      <React.Fragment>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#FD7420"
        barTintColor="#f5f5f5"
        >
        <TabBar.Item
          title="My Events"
          icon={<Icon name={"menu"} color={this.state.selectedTab=='Tab1'?"#FD7420":"#949494"} />}
          selected={this.state.selectedTab === 'Tab1'}
          onPress={() => this.onChangeTab('Tab1')}
        >
          <Home1Page></Home1Page>
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name={"plus"}  color={this.state.selectedTab=='Tab2'?"#FD7420":"#949494"}  />}
          title="Explore"
          selected={this.state.selectedTab === 'Tab2'}
          onPress={() => this.onChangeTab('Tab2')}
        >
          <Home2Page></Home2Page>
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name={"search"}  color={this.state.selectedTab=='Tab3'?"#FD7420":"#949494"} />}
          title="Search"
          selected={this.state.selectedTab === 'Tab3'}
          onPress={() => this.onChangeTab('Tab3')}
        >
          <React.Fragment>
            <h1>Hello</h1>
          </React.Fragment>
          <Home3Page></Home3Page>
        </TabBar.Item>
      </TabBar>
      </React.Fragment>
    );
  }
}