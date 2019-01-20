import React, { Component } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableHighlight,
    Platform,
    AsyncStorage,
    Alert
} from 'react-native';
import { Header, Left, Body, Title, Right,Container, Content} from 'native-base';
import { Actions } from 'react-native-router-flux';
import ProductInfo from '../services/ProductInfo';
import Config from '../Config';



export default class ProductList extends Component{
    constructor(){
        super()
        this.state = {
         dataSource : []
        }
      }
     
    componentWillMount(){
        this.getOrderName();
        this.getProductInfo();
    }

    getOrderName = async () => {
        const product_name = await AsyncStorage.getItem('product_name');
        if(product_name !== null){
            Alert.alert(product_name + " ürününü sipariş verdiniz.");
            await AsyncStorage.removeItem('product_name');
        }
    }

    getProductInfo = async () => {
        const products = new ProductInfo(Config.apiUrl, Config.authorization);
        products.getAllProducts()
        .then(response => response.json())
        .then(responseJson => {
            this.setState({
                dataSource: responseJson.productList
            })
        })
        .catch((err) => {
            console.warn("Product List Error!" + err);
        });
           
    }

    renderSeperator = () => {
        return(
            <View
                style = {{ height: 10,  width: '100%',  underlayColor:"transparent"}}>
            </View>
        )
    }

    gotoScreen(product_id) {
        AsyncStorage.setItem('product_id', product_id);// burada seçilen aracın device id si tutulacak
        Actions.buyProduct();
      }
  
    keyExtractor= item => String(item.productId);
    _renderItem =  ({item}) => {
        return (
            <TouchableHighlight
            underlayColor="transparent"
            onPress={this.gotoScreen.bind(this,item.productId)}>
               <View style={{flex:1, flexDirection: 'row', height: 150, backgroundColor : 'white', borderWidth:1,  borderColor:'lightgray', margin:10}}>
                    <View style={{ flex:1, marginLeft:5, justifyContent:'center', alignItems: 'center'}}>
                        <Image
                            style={{width: 120, height: 120}}
                            source={{uri: item.photoUrl}}
                        />
                    </View>
                    <View style={{ flex:1, marginLeft:10}}>
                        <View style={{ flex:1, marginLeft:5, marginTop:5}}>
                            <Text style={{ fontSize:12, fontWeight:'bold', color:'black', marginTop:5}}>
                                {item.name}
                            </Text>
                        </View>
                        <View style={{ flex:1, marginLeft:5}}>
                            <Text style={{ fontSize:15, fontWeight:'bold', color:'blue', marginTop:5}}>
                                {item.unitPrice} TL
                            </Text>
                        </View>
                        <View style={{ flex:1, marginLeft:5}}>
                            <Text style={{ fontSize:12, color:'black', marginTop:5}}>
                                Bitiş zamanı:
                            </Text>
                            <Text style={{ fontSize:10, color:'black', marginTop:5}}>
                                {item.expirationDate}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex : 1,  justifyContent:'flex-end', alignItems: 'flex-end', marginBottom: 15}}>
                        <View style={{ height: 15, width: 60, justifyContent:'center', alignItems: 'center',  marginLeft:5, backgroundColor: 'lightgray', borderRadius: 3}}>
                            <Text style={{ fontSize:10, color:'black'}}>
                                {item.totalOrderCount} sipariş
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
          ) 
    }

    render(){
        const title = "Tanbula"
        return (
            <Container>
                <Header >
                        <Left style={{marginTop: 7}}></Left>
                            <Body>
                                <Title style={{marginTop: Platform.OS === 'ios' ? 10 : 1, fontSize: 15, color: Platform.OS === 'ios' ? 'black' : 'white'}}>{title}</Title>
                            </Body>
                        <Right></Right>
                    </Header>
            <Content style = {styles.container}>
                    <View
                        style = {{ height: 10,  width: '100%',  underlayColor:"transparent"}}>
                    </View>
                     <FlatList
                        data={this.state.dataSource}
                        keyExtractor = {this.keyExtractor}
                        renderItem={this._renderItem}
                        ItemSeparatorComponent={this.renderSeperator}
                    />
                     <View
                        style = {{ height: 10,  width: '100%',  underlayColor:"transparent"}}>
                    </View>
            </Content>
          </Container>
            
                
    
                  
           
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:21,
        flex:1,
        backgroundColor: 'white'
    }
})
