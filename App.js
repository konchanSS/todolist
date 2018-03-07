import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Button,
    FlatList,
    Text,
    TouchableOpacity,
} from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            task: [],
            key: 0
        };
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:10, paddingTop:20, backgroundColor:'#DDDDDD'}}>
                    <FlatList
                        style={{flex:1}}
                        data={this.state.task}
                        renderItem={({item}) => <TouchableOpacity onPress={() => this._onPressCell(item)}><Text style={styles.item}>{item.text}</Text></TouchableOpacity>}
                    />
                </View>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <TextInput
                        style={{flex:3}}
                        placeholder="Type here to task"
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                    />
                    <View style={{flex:1, justifyContent:'center'}}>
                        <Button
                            style={{flex:1}}
                            onPress={this._onPressAdd}
                            title='追加'
                        />
                    </View>
                </View>
            </View>
        );
    }

    _onPressCell = (item) => {
        this.props.navigation.navigate('Detail', {
            item:item
        });
    };

    _onPressAdd = () => {
        this.state.task.push({key:this.state.key, text: this.state.text});
        this.setState({text:'', key:this.state.key+1});
        console.log(this.state.task);
    };
}

export class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task : this.props.navigation.state.params.item
        }
    }
    render() {
        return(
            <View style={{flex:1}}>
                <Text>{this.state.task.text}</Text>
            </View>
        )
    }
}

const RootStack = StackNavigator({
    Home: { screen: Home},
    Detail: { screen: Detail},
    },
    {
        initialRouteName: 'Home',
    }
);


export default class App extends Component{
    render() {
        return <RootStack/>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    list: {
        flex:1,
    },
    textInput:{
        flex:1,
        height: 40,
        padding: 20,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor:'white'
    },
});