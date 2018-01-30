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
    FlatList,
    ActivityIndicator,
} from 'react-native';

import Item from '../Components/Item.js';
// import movies from  './movies.json';

const api = 'https://api.douban.com/v2/movie/in_theaters';

export default class List extends Component<{}> {
    static navigationOptions = {
        title:'列表页',
    }

    state ={
        movies:[],
        refreshing: false,
        ready:false,
    }
    refreshing =false;
    start =0;
    count =12;

    fetchData =(start =0, count =12 ) =>{
        if(this.refreshing) {
            return;
        }
        this.setState({
            refreshing :true,
        })

        this.refreshing =true;

        return fetch(`${api}?start=${start}&count=${count}`)
            .then((response) => response.text())
            .then((responseText) => {
                const json = JSON.parse(responseText);
                this.setState({
                    refreshing : false,
                })
                this.refreshing =false;
                return json;
            })
            .catch((error) => {
                console.error(error);
            })
    }

    freshData = async () => {
        const json =await  this.fetchData();
        this.setState({
            movies : json.subjects,
        })
    }

    fetchMore = async () => {
        const json = await this.fetchData(this.start, this.count);
        if (json) {
            this.start += this.count - 1;
            this.setState({
                movies: this.state.movies.concat(json.subjects),
            });
        }
    };

    async componentDidMount() {
        await this.fetchMore();
        this.setState({
            ready:true,
        })
    }


    render() {
        const {movies, refreshing, ready} = this.state;
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                {
                    ready ?
                        <FlatList
                            //style={styles.row}
                            numColumns={3}
                            keyExtractor ={item =>item.id}
                            columnWrapperStyle={styles.row}
                            data={movies}
                            onRefresh={this.freshData}
                            onEndReached={this.fetchMore}
                            onEndReachedThreshold={0}
                            refreshing={refreshing}
                            ListFooterComponent ={() => {
                                return refreshing && <ActivityIndicator size="large" />
                            }

                            }
                            renderItem={({item}) => {
                                return (<Item
                                    title={item.title}
                                    image={item.images.medium}
                                    stars={item.rating.stars}
                                    onPress={() => navigate('Detail' ,{
                                        id:item.id,
                                    })}
                            />)
                            }
                    }
                />
                :
                <ActivityIndicator size="large" style={styles.loading} />

                }

            </View>

        );
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        paddingHorizontal: 15,
    },
    loading: {
        marginTop: 100,
    }
})

