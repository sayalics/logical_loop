import { useNavigation, useRoute } from '@react-navigation/native';
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../utils/Colors';
import { getPostListAction } from "../redux/actions/getPostListAction";
import { useDispatch, useSelector } from 'react-redux';

const Post = () => {
  const [dataSource, setDataSource] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  var counter = 1;
  const [fetchingFromServer, setFetchingFromServer] = useState(false);
  const [pageNo, setPageNo] = useState(counter);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getPostListData = useSelector(
    (state) => state.getPostListReducer.getPostListData
  );

  useEffect(() => {
    dispatch(getPostListAction(counter));
  },[]);

  useEffect(() => {
    if (
      getPostListData.data !== undefined &&
      getPostListData.data !== [] 
    ) {
      let newArray = [];
                getPostListData.data.map((element) => {
                  let newObj = {};
                  newObj['id'] = element.id;
                  newObj['user_id'] = element.user_id;
                  newObj['title'] = element.title;
                  newObj['body'] = element.body;
                  newArray.push(newObj);
                })
                setFetchingFromServer(false);
                if (
                    pageNo !== 1 &&
                    getPostListData.meta.pagination.total > 9
                ) {
                    setDataSource([...dataSource, ...newArray]);
                    setTotalUser(getPostListData.meta.pagination.total);
                } else {
                    setDataSource(newArray);
                    setTotalUser(getPostListData.meta.pagination.total);
                    setPageNo(counter);
                }
    }
    else if (fetchingFromServer === false) {
          let newArray = [];
          setDataSource(newArray);
          setPageNo(counter);
      }
  }, [getPostListData]);

  const ItemView = ({item}) => {
    return (
      <TouchableOpacity onPress={() => getItem(item)} style={styles.itemView}>
        <View style={styles.itemUserImage}>
            <Icon name="post-outline" color={Colors.primary} size={25} />
        </View>
        <View style={{width:Dimensions.get("screen").width - 100}}>
            <Text
                numberOfLines={1}
                style={styles.itemStyle}
                >
                {item.title}
            </Text>
            <Text numberOfLines={2} style={styles.itemEmail}>{item.body}</Text>
        </View>
      </TouchableOpacity>
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
    navigation.navigate("PostDetails",{
        post_id:item.id
    });
  };

  const loadMoreData = () => {
    setFetchingFromServer(true);
    dispatch(getPostListAction(pageNo + 1));
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
            contentContainerStyle={{
            paddingBottom: 50,
            }}          
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
        margin:20,
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
        alignSelf:'flex-start',
        alignItems:'center',
        justifyContent:'center',
        marginRight:20,
    }
});

export default Post;
