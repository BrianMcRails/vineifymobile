'use strict';

import React, {Component} from 'react';
import {Text, View, ListView, StyleSheet, ActivityIndicator, Image} from 'react-native';
import moment from 'moment';

class Feed extends Component {
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.state = {
            dataSource: ds,
            showProgress: true

        };
    }
    renderRow(rowData){
        return(
          <View style={styles.rowData}>
              <Image
                  source={{uri: rowData.actor.avatar_url}}
                  style={styles.rowImage}/>
              <View style={styles.rowInfo}>
                  <Text style={styles.rowInformation}>
                      {moment(rowData.created_at).fromNow()}
                  </Text>
                  <Text style={styles.rowInformation}>
                      {rowData.actor.login}
                  </Text>
                  <Text style={styles.rowInformation}>
                      {rowData.repo.name}
                  </Text>

              </View>
          </View>
        );
    }
    componentDidMount(){
        this.fetchFeed();
    }

    fetchFeed(){
        require('./AuthService.js').getAuthInfo((err, authInfo)=>{
           var url = 'https://api.github.com/users/hendrikswan'
               //+ authInfo.user.login
               + '/received_events';

           fetch(url, {
               headers: authInfo.header
           })
           .then((response)=> response.json())
           .then((responseData)=>{
               var feedItems = 
                   responseData.filter((ev)=> 
                   ev.type=='ForkEvent');
               this.setState({
                   dataSource: this.state.dataSource
                       .cloneWithRows(feedItems),
                   showProgress: false
               });
               console.log(this.state.showProgress)
           })
        });
    }
    render() {
        if(this.state.showProgress) {
            return (
                <View style={styles.loadercontainer}>
                    <ActivityIndicator
                        animating={true}
                        size="large"
                        style={styles.loader}
                    />
                </View>
            );
        }else {
            return (
                <View style={styles.container}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}/>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 20
    },
    rowData: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
    },
    loader: {
        marginTop: 20,
    },
    loadercontainer: {
        flex: 1,
        justifyContent: 'center',
    },
    rowImage: {
        height: 36,
        width: 36,
        borderRadius: 18,
    },
    rowInfo: {
        paddingLeft: 20,
    },
    rowInformation: {
        backgroundColor: '#FFF',
        fontWeight: '600',
    }
});

module.exports = Feed;