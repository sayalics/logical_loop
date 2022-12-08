import { useRoute } from '@react-navigation/native';
import React, {useState, useEffect, Fragment} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../utils/Colors';
import { getPostDetailsAction } from "../redux/actions/getPostDetailsAction";
import { useDispatch, useSelector } from 'react-redux';

const PostDetails = () => {
  const [title, setTitle] = useState("");
  const [body, setbody] = useState("");
  const route =  useRoute();

  useEffect(() => {      
        dispatch(getPostDetailsAction(route.params.post_id));
    }, []);

  const dispatch = useDispatch();

  const getPostDetailsData = useSelector(
    (state) => state.getPostDetailsReducer.getPostDetailsData
  );

  useEffect(() => {
    if (getPostDetailsData !== undefined && getPostDetailsData !== null){
        setTitle(getPostDetailsData.title);
        setbody(getPostDetailsData.body);
    }
    },[getPostDetailsData]);

  return (
    <Fragment>
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
        <View style={styles.itemView}>
            <View style={styles.itemUserImage}>
                <Icon name="card-account-details-outline" color={Colors.primary} size={25} />
            </View>
            <View style={{width:Dimensions.get("screen").width - 100}}>
                <Text
                    style={styles.itemStyle}
                    >
                    {title}
                </Text>
                <Text style={styles.itemEmail}>{body}</Text>
            </View>
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
    itemView: {
        flex:1,
        flexDirection:"row",
        margin:20,
        alignItems:"flex-start",
        justifyContent:'flex-start'
    },
    itemStyle: {
        fontSize:18,
        color:Colors.primary
    },
    itemEmail:{
        fontSize:14,
        marginTop:10,
        color:Colors.neutral3,
    },
    itemUserImage:{
        height:30,
        width:40,
        backgroundColor:Colors.border,
        alignSelf:'flex-start',
        alignItems:'center',
        justifyContent:'center',
        marginRight:10,
    }
});

export default PostDetails;
