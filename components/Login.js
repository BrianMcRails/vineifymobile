/**
 * Created by brianmc on 1/6/17.
 */
'use strict';

import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ActivityIndicator} from 'react-native';

class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            showProgress: false
        }
    }

    render() {
        let errorCtrl = <View/>;
        if(!this.state.success && this.state.badCredentials){
            errorCtrl = <Text style={styles.error}>
                That username and password combination did not work
            </Text>
        }
        if(!this.state.success && this.state.unknownError){
            errorCtrl = <Text style={styles.error}>
                We encountered an unexpected issue
            </Text>
        }
        return (
            <View style={styles.container}>
                <Image style={styles.logo}
                       source={require('../assets/vines.jpg')}/>
                <Text style={styles.heading}>Vineify</Text>
                <TextInput
                    onChangeText={(text)=> this.setState({username: text})}
                    style={styles.input}
                    placeholder="username"/>
                <TextInput
                    onChangeText={(text)=> this.setState({password: text})}
                    style={styles.input}
                    placeholder="password"
                    secureTextEntry={true}/>
                <TouchableHighlight
                    onPress={this.onLoginPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableHighlight>

                {errorCtrl}

                <ActivityIndicator
                    style={styles.loader}
                    animating={this.state.showProgress}
                    size="large"/>

            </View>
        );
    }

    onLoginPressed(){
        this.setState({showProgress: true});

        var authService = require('./AuthService.js');
        authService.login({
            username: this.state.username,
            password: this.state.password
        }, (results) => {
            this.setState(Object.assign({
                showProgress: false
            }, results));
            if(results.success && this.props.onLogin){
                console.log('succsessful call');
                this.props.onLogin();
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#F5FCFF',
        flex:1,
        paddingTop: 40,
        alignItems: 'center',
        padding: 10,
    },
    logo: {
        height: 100,
        width: 100,
        borderRadius: 25,
    },
    heading: {
        fontSize: 20,
    },
    input: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#599A66',
    },
    button: {
        height: 50,
        backgroundColor: '#599A66',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center',
    },
    loader: {
        marginTop: 20,
    },
    error: {
        color: 'red',
        paddingTop: 10,
    }
});

module.exports = Login;