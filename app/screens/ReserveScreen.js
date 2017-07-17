import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

class ReserveScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>
                    Reserve Screen
                </Text>
            </View>
        )
    }
}



export default ReserveScreen;
