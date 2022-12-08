import React from "react";
import { TextInput, View, StyleSheet, Dimensions } from "react-native";
import  Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../utils/Colors";

const TextInputField = ({value, placeholder, autoCapitalize, autoCompleteType, autoCorrect, keyboardType, onChangeText, iconName}) => {
    return (
        <View style={styles.mainView}>
            <Icon name={iconName} size={24} color={Colors.primary} style={{marginHorizontal:10}} />
            <TextInput
                style={{ flex: 1, fontSize:16, color:Colors.primary }}
                placeholder={placeholder}
                value={value}
                keyboardType={keyboardType}
                underlineColorAndroid="transparent"
                onChangeText={onChangeText}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                autoCompleteType={autoCompleteType}    
            />
        </View>
    )

}

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: Colors.secondary,
        height: 50,
        width:Dimensions.get("screen").width - 40,
        borderRadius: 5,
        margin: 10,
    },
    imageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    }
});

export default TextInputField;