import { useRoute } from '@react-navigation/native';
import React, {useState, useEffect, Fragment} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TextInputField from '../components/TextInputField';
import { getUserDetailsAction } from '../redux/actions/getUserDetailsAction';
import { updateUserDetailsAction } from '../redux/actions/updateUserDetailsAction';
import Colors from '../utils/Colors';
import { isValidEmail, isValidName } from '../utils/Validation';

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const route =  useRoute();
  const dispatch = useDispatch();

  const getUserDetailsData = useSelector(
    (state) => state.getUserDetailsReducer.getUserDetailsData
  );

  const updateUserDetailsData = useSelector(
    (state) => state.updateUserDetailsReducer.updateUserDetailsData
  );

  const updateIsLoading = useSelector(
    (state) => state.updateUserDetailsReducer.updateIsLoading
  );

  useEffect(() =>     dispatch(getUserDetailsAction(route.params.user_id))  , []);

  useEffect(() => {
    if (getUserDetailsData !== undefined && getUserDetailsData !== null){
        setName(getUserDetailsData.name);
        setEmail(getUserDetailsData.email);
        setGender(getUserDetailsData.gender);
    }
  },[getUserDetailsData]);

  useEffect(() => {
    console.log(updateUserDetailsData,"updatee")
    if(updateUserDetailsData !== undefined && updateUserDetailsData !== null){
        setName(updateUserDetailsData.name);
        setEmail(updateUserDetailsData.email);
        setGender(updateUserDetailsData.gender);
    }
  },[updateUserDetailsData]);

  const updateData = () => {
    if (!isValidName(name)) {
        alert("Please enter a valid name.");
      } else if (!isValidEmail(email)) {
        alert("Please enter a valid email.");
      } else if (!isValidName(gender)) {
        alert("Please enter valid gender.");
      } else {
        dispatch(updateUserDetailsAction(route.params.user_id, name, email, gender));
      }
  };

  return (
    <Fragment>
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
        <View style={styles.mainView}>
            <View>
                <TextInputField 
                    value={name}
                    placeholder={"Name"}
                    iconName={"account-outline"}
                    autoCapitalize = 'words'
                    onChangeText={(text) => setName(text)}
                    />
                <TextInputField 
                    value={email}
                    placeholder={"Email"}
                    keyboardType='email-address'
                    iconName={"email-outline"}
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoCompleteType='email'
                    onChangeText={(text) => setEmail(text)}
                    />
                <TextInputField 
                    value={gender}
                    autoCapitalize = 'none'
                    placeholder={"Gender"}
                    iconName={"gender-male-female"}
                    onChangeText={(text) => setGender(text)}
                    />
            </View>
            <TouchableOpacity onPress={() => 
                updateIsLoading === false ? 
                    (name !== "" && email !== "" && gender !== "" ? 
                    updateData() 
                    : null) 
                : null} 
            style={[styles.btnView,{
                backgroundColor:name === "" || email === "" || gender === "" ? Colors.secondary : Colors.primary
            }]}>
                {updateIsLoading === false ?
                    <Text style={styles.btnText}>{"UPDATE"}</Text> :
                    <ActivityIndicator color={Colors.white} size={"small"} />
                }
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    btnView: {
        width:Dimensions.get("screen").width - 40,
        height:50,
        backgroundColor:Colors.primary,
        alignItems:'center',
        borderRadius:100,
        justifyContent:'center'
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    mainView: {
        flex:1,
        margin:20,
        alignItems:"center",
        justifyContent:"space-between"
    },
});

export default UserProfile;
