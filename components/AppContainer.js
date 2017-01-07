/**
 * Created by brianmc on 1/7/17.
 */
'use strict';

import React, {Component} from 'react';
import {Text, View, StyleSheet, TabBarIOS} from 'react-native';
import Feed from './Feed.js';

class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'feed'
        }
    }
    render(){
        return(
            <TabBarIOS style={styles.container}>
                <TabBarIOS.Item
                title="Feed"
                selected={this.state.selectedTab == "feed"}
                systemIcon="favorites"
                onPress={()=>this.setState({selectedTab: 'feed'})}>
                <Feed/>
            </TabBarIOS.Item>
            <TabBarIOS.Item
                title="Search"
                selected={this.state.selectedTab == "search"}
                systemIcon="search"
                onPress={()=>this.setState({selectedTab: 'search'})}>
                <Text style={styles.welcome}>Tab 2</Text>
            </TabBarIOS.Item>
            </TabBarIOS>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

});

module.exports = AppContainer;