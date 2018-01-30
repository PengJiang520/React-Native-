/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';


export default class Detail extends Component<{}> {
    //设置导航栏的样式和标题
    static navigationOptions = {
        title:'详情页',
    }

    render() {
        const { state ,goBack} = this.props.navigation;
        return (
            <View>
                <Text>我是详情页</Text>
                <Text>ID:{state.params.id}</Text>
                <Text onPress={() => goBack()}>返回</Text>
            </View>
        );
    }
}

