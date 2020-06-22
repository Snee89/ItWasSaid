import React from 'react';
import { View, Alert, StyleSheet, Text, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { IconButton } from 'react-native-paper';

export default class QuoteScreen extends React.Component {
     apiUrl = 'https://quotes.rest/qod';
     qodByCategory = 'https://quotes.rest/qod.json?category=';
     constructor(props) {
          super(props);
          this.state = {
               isLoading: true,
               dataSource: [],
               error: null,
          };
     }

     getData = () => {
          this.setState({ isLoading: true, error: null });
          let h = new Headers();
          h.append('X-TheySaidSo-Api-Secret', 'M1MaKvPSaR1Ns13hlXDqvAeF');
          let req = new Request(this.apiUrl, {
               headers: h,
               method: 'GET',
          });
          fetch(req)
               .then(response => response.json())
               .then((responseJson) => {
                    this.setState({
                         isLoading: false,
                         dataSource: responseJson.contents.quotes
                    })
               })
               .catch((error) => {
               })
     }

     getCategoryQuote = (value) => {
          let h = new Headers();
          h.append('X-TheySaidSo-Api-Secret', 'M1MaKvPSaR1Ns13hlXDqvAeF');
          let req = new Request(this.qodByCategory + value, {
               headers: h,
               method: 'GET',
          });
          fetch(req)
               .then(response => response.json())
               .then((responseJson) => {
                    this.setState({
                         isLoading: false,
                         dataSource: responseJson.contents.quotes
                    })
               }).catch((error) => {
                    Alert.alert(
                         'Connection Error',
                         'Please connect to Wifi to get your daily Quote',
                         [
                              {
                                   text: 'OK',

                              },
                         ],
                         { cancelable: false },
                    );
               })

     }
     componentDidMount() {
          this.getData();
     }
     render() {

          let quotes = this.state.dataSource.map((val, key) => {
               return <View key={key}>
                    <ImageBackground
                         source={{ uri: val.background }}
                         style={{
                              position: 'absolute',
                              width: '100%',
                              height: 700
                         }}
                    >
                         <Text style={styles.txt}>{val.author} said </Text>
                         <View style={styles.quotebackground}>
                              <Text style={styles.quote}>"{val.quote}"</Text>
                         </View>

                    </ImageBackground>

               </View >
          })
          return (
               <View style={styles.container}>
                    <View>{quotes}</View>

                    <TouchableOpacity
                         style={styles.buttonContainer}
                         activeOpacity={0.7}
                    >
                         <IconButton
                              icon="brush"
                              color="yellow"
                              size={30}
                              onPress={() => this.getCategoryQuote('art')}
                         />
                         <IconButton
                              icon="emoticon-excited"
                              color="orange"
                              size={30}
                              onPress={() => this.getCategoryQuote('funny')}
                         /><IconButton
                              icon="face"
                              color="lightblue"
                              size={30}
                              onPress={() => this.getCategoryQuote('life')}
                         /><IconButton
                              icon="heart"
                              color="red"
                              size={30}
                              onPress={() => this.getCategoryQuote('love')}
                         /><IconButton
                              icon="briefcase"
                              color="brown"
                              size={30}
                              onPress={() => this.getCategoryQuote('management')}
                         /><IconButton
                              icon="notebook"
                              color="green"
                              size={30}
                              onPress={() => this.getCategoryQuote('students')}
                         /><IconButton
                              icon="football"
                              color="white"
                              size={30}
                              onPress={() => this.getCategoryQuote('sports')}
                         />
                    </TouchableOpacity>
                    <TouchableOpacity
                         activeOpacity={0.7}
                         onPress={this.clickHandler}
                         style={styles.TouchableOpacityStyle}>
                         <IconButton
                              icon="format-quote-close"
                              color='white'
                              size={50}
                              style={styles.FloatingButtonStyle}
                              onPress={() =>
                                   this.props.navigation.navigate('Choose an Image')
                              }
                         />
                    </TouchableOpacity>
                    {this.state.isLoading && <ActivityIndicator style={styles.loader} size="large" />}

               </View>
          )
     }

}
const styles = StyleSheet.create({
     loader: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center'
     },
     container: {
          width: '100%',
          flex: 1,
     },
     quotebackground: {
          width: '90%',
          marginLeft: '5%',
          backgroundColor: 'rgba(255,255,255,0.6)',
          borderRadius: 25
     },
     IconButton: {
          marginLeft: 15
     },
     txt: {
          paddingTop: '30%',
          textAlign: "center",
          fontSize: 24,
          color: 'white'
     },
     buttonContainer: {
          maxWidth: '100%',
          width: '100%',
          flexDirection: 'row',
          textAlign: "center",

     },
     quote: {

          paddingTop: '10%',
          paddingBottom: '10%',
          fontStyle: "italic",
          fontSize: 20,
          marginRight: '10%',
          marginLeft: '10%',
          textAlign: 'center',
          color: 'darkslategrey'
     },
     err: {
          color: 'red',
          fontSize: 30,
          fontWeight: 'bold'
     },
     TouchableOpacityStyle: {
          position: 'absolute',
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          right: 30,
          bottom: 50,
     },
     FloatingButtonStyle: {
          resizeMode: 'contain',
          width: 80,
          height: 80,
          color: 'white',
          backgroundColor: 'darkgreen',
     },

});
