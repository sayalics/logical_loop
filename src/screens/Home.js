import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, {useState, useEffect, Fragment} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../utils/Colors';
import { EventRegister } from "react-native-event-listeners";
import { getUserListAction } from "../redux/actions/getUserListAction";
import { useDispatch, useSelector } from 'react-redux';

export const emitConfig = {API_CALLING:"API_CALLING"}

const Home = () => {
  const [dataSource, setDataSource] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  var counter = 1;
  const [fetchingFromServer, setFetchingFromServer] = useState(false);
  const [pageNo, setPageNo] = useState(counter);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getUserListData = useSelector(
    (state) => state.getUserListReducer.getUserListData
  );

  useEffect(() => {
    if (
      getUserListData.data !== undefined &&
      getUserListData.data !== [] 
    ) {
      let newArray = [];
                getUserListData.data.map((element) => {
                    let newObj = {};
                    newObj['id'] = element.id;
                    newObj['name'] = element.name;
                    newObj['email'] = element.email;
                    newObj['gender'] = element.gender;
                    newObj['status'] = element.status;
                    newArray.push(newObj);
                })
                setFetchingFromServer(false);
                if (
                    pageNo !== 1 &&
                    getUserListData.meta.pagination.total > 9
                ) {
                    setDataSource([...dataSource, ...newArray]);
                    setTotalUser(getUserListData.meta.pagination.total);
                } else {
                    setDataSource(newArray);
                    setTotalUser(getUserListData.meta.pagination.total);
                    setPageNo(counter);
                }
    }
    else if (fetchingFromServer === false) {
          let newArray = [];
          setDataSource(newArray);
          setPageNo(counter);
      }
  }, [getUserListData]);

  useEffect(() => {
    const emitSubscribe = EventRegister.addEventListener(
      emitConfig.API_CALLING, (msg) => {
        dispatch(getUserListAction(counter));
      }
    )

    return () => {
      EventRegister.removeEventListener(emitSubscribe);
    }
  }, []);

  useEffect(() => {
    dispatch(getUserListAction(counter));
  },[])

  const ItemView = ({item}) => {
    return (
      <View style={[styles.itemView,{marginHorizontal:20}]}>
      <TouchableOpacity onPress={() => getItem(item)} style={styles.itemView}>
        <View style={styles.itemUserImage}>
            <Icon name="user" color={Colors.primary} size={25} />
        </View>
        <View style={{width:Dimensions.get("screen").width - 120}}>
            <Text
                numberOfLines={1}
                style={styles.itemStyle}
                >
                {item.name}
            </Text>
            <Text numberOfLines={1} style={styles.itemEmail}>{item.email}</Text>
        </View>
        </TouchableOpacity>
        <Icon name="cog" color={Colors.neutral3} size={20} 
        onPress={() => navigation.navigate("UserProfile",{
            user_id:item.id
        })}/>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    navigation.navigate("Post",{user_id:item.id});
  };

  const loadMoreData = () => {
    setFetchingFromServer(true);
    dispatch(getUserListAction(pageNo + 1));
    setPageNo(pageNo + 1);
  };

  function renderFooter() {
    return (
      fetchingFromServer === true ? <ActivityIndicator color={Colors.primary} size="large" style={styles.articlesFooter} /> : null
    );
  }

  const EmptyComponent = () => {
    return (
        <ActivityIndicator size={"large"} color={Colors.primary} style={{marginTop:20}} />
    )
  }

  return (
    <Fragment>
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
        <FlatList
            ItemSeparatorComponent={ItemSeparatorView}
            keyboardShouldPersistTaps={'handled'}
            keyExtractor={(item) => item.id.toString()}
            initialNumToRender={10}
            ListEmptyComponent={EmptyComponent}
            ListFooterComponent={renderFooter()}
            data={dataSource !== undefined && dataSource !== []
            ? dataSource
            : []}
            extraData={dataSource !== undefined && dataSource !== []
            ? dataSource
            : []}
            renderItem={ItemView}
            onEndReachedThreshold={0.001}
            onEndReached={() => {
            totalUser !== 0 ?
                dataSource !== undefined &&
                dataSource !== [] &&
                dataSource.length !== totalUser &&
                dataSource.length > 9
                ? loadMoreData()
                : null
                : null
            }}
            />
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
        height:80,
        // marginHorizontal:20,
        alignItems:'center',
        justifyContent:'flex-start'
    },
    itemStyle: {
        fontSize:18,
        color:Colors.primary
    },
    itemEmail:{
        fontSize:12,
        color:Colors.neutral3,
        marginTop:2
    },
    itemUserImage:{
        height:40,
        width:40,
        backgroundColor:Colors.border,
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center',
        marginRight:20,
    }
});

export default Home;
