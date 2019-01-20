import React, {Component} from 'react';
import { StyleSheet, ImageBackground, Text, View, AsyncStorage, Platform, TouchableHighlight, Alert} from 'react-native';
import { Icon} from 'react-native-elements'
import { Header, Left, Button, Body, Title, Right,Container, Content} from 'native-base';
import DropdownMenu from 'react-native-dropdown-menu';
import { Actions} from 'react-native-router-flux';
import ProductInfo from '../services/ProductInfo';
import Config from '../Config';


export default class BuyProduct extends Component {

    constructor(){
      super()
      this.state = {
        product_id : '',
        dataSource : {},
        number: ''
      }
    }

    componentWillMount(){
      this.getProductInfo(); 
    }

    getProductInfo = async () => {
        const product_id = await AsyncStorage.getItem('product_id');
        const products = new ProductInfo(Config.apiUrl, Config.authorization);
        products.getProduct(product_id)
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
              dataSource : responseJson
          })
        })
        .catch((err) => {
            console.warn(" Get Product Error!" + err);
        });
    }

    updateNumber = (number) => {
      this.setState({ number: number })
    }

    orderOperation = () => {
        if(this.state.number === '' || this.state.number === 'Adet seç'){
            Alert.alert("Lütfen adet seçiniz.")
        }else{
            AsyncStorage.setItem('product_name', this.state.dataSource.name);
            Actions.productList();
        }
    }

    render() {
      var data = [["Adet Seç","1", "2", "3", "4", "5"]];
        return (
            <Container>
                <Header >
                        <Left style={{marginTop: 7}}>
                            <Button transparent onPress={()=> Actions.productList()}>
                                <Icon size = {40} type = 'materialicons' name ='keyboard-arrow-left' color = {Platform.OS === 'ios' ? 'black' : 'white'}/>
                            </Button>
                        </Left>
                            <Body>
                                <Title style={{marginTop: Platform.OS === 'ios' ? 10 : 1, fontSize: 15, color: Platform.OS === 'ios' ? 'black' : 'white'}}>Tanbula</Title>
                            </Body>
                        <Right></Right>
                </Header>
              <Content style = {styles.container}>
                    <View style = {{ flex:1 }}>
                        <ImageBackground
                            style={{width: '100%', height: 250}}
                            source={{uri: this.state.dataSource.photoUrl}}
                        >
                          <View style={{ flex : 1,  justifyContent:'flex-end', alignItems: 'flex-end', marginBottom: 200}}>
                            <View style={{ height: 15, width: 60, justifyContent:'center', alignItems: 'center',  marginLeft:5, backgroundColor: 'lightgray', borderRadius: 3}}>
                                <Text style={{ fontSize:10, color:'black'}}>
                                    {this.state.dataSource.totalOrderCount} sipariş
                                </Text>
                            </View>
                          </View>
                        </ImageBackground>
                        <View style={{ flex:1, marginLeft:10}}>
                          <View style={{ flex:1, marginLeft:5, marginTop:20}}>
                              <Text style={{ fontSize:12, fontWeight:'bold', color:'black', marginTop:5}}>
                                  {this.state.dataSource.name}
                              </Text>
                          </View>
                          <View style={{ flex:1, marginLeft:5,marginTop:20}}>
                              <Text style={{ fontSize:15, fontWeight:'bold', color:'blue', marginTop:5}}>
                                  {this.state.dataSource.unitPrice} TL
                              </Text>
                          </View>
                          <View style={{ flex:1, marginLeft:5,marginTop:20}}>
                              <Text style={{ fontSize:12, fontWeight:'bold', color:'black', marginTop:5}}>
                                  Bitiş tarihi : {this.state.dataSource.endDate}
                              </Text>
                          </View>
                          <View style={{ flex:1, marginLeft:5, marginTop:20}}>
                              <Text style={{ fontSize:12, color:'black', marginTop:5}}>
                                  {this.state.dataSource.description}
                              </Text>
                          </View>
                        </View>
                        <View style={{backgroundColor: 'red'}} />
                          <DropdownMenu
                            bgColor={'white'}
                            tintColor={'#666666'}
                            activityTintColor={'green'}
                            handler={(selection) => this.setState({number: data[selection]})}
                            data={data}
                          >
                            <View style={{flex:1,marginTop:20}}>
                                <TouchableHighlight
                                    style={styles.button}
                                    onPress={this.orderOperation}
                                    activeOpacity={1}>
                                        <Text style={{color :'white'}}>SİPARİŞ VER</Text>
                                </TouchableHighlight>
                            </View>
                          </DropdownMenu>
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
      },
        button: {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#3777dd',
          height: 40,
          borderRadius: 20,
          zIndex: 100
        }
  
  })
  


