'use strict';

import React, {Component} from 'react';
import {Text, View, ListView, StyleSheet} from 'react-native';

class Feed extends Component {
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(['a','b','c']),

        };
    }
    renderRow(rowData){
        return <Text style={styles.rowData}>
                    {rowData}
                </Text>
    }
    componentDidMount(){
        this.fetchFeed();
    }

    fetchFeed(){
        require('./AuthService.js').getAuthInfo((err, authInfo)=>{
           var url = 'https://api.github.com/users/'
               + authInfo.user.login
               + '/received_events';

           fetch(url, {
               headers: authInfo.header
           })
           .then((response)=> response.json())
           .then((responseData)=>{

               var feedItems =
                   responseData.filter((ev)=>
                   ev.type=='PushEvent');
               this.setState({
                   dataSource: this.state.dataSource
                       .cloneWithRows(feedItems)
               });
           })
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    rowData: {
        color: '#333',
        backgroundColor: '#fff',
        alignSelf: 'center',
    },
});

module.exports = Feed;