import React from 'react'
import { View, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator, Keyboard, ImageBackground } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';

export default class PixabayScreen extends React.Component {

     screenWidth = Math.round(Dimensions.get('window').width);
     screenHeight = Math.round(Dimensions.get('window').height);
     ApiUrl = 'https://pixabay.com/api/?key=xxxxxxxxxxxxxxxxxxxxxxxx'
     constructor(props) {
          super(props);
          this.state = {
               pics: [],
               searchTerm: 'light background',
               isLoading: true,
               searchVisible: false,
               searchButtonVisable: true,
               editButton: false,
          }
     }
     search() {
          this.setState({
               searchVisible: !this.state.searchVisible,
               searchButtonVisable: !this.state.searchButtonVisable
          })
     }
     ShowEditButton = () => {
          this.setState({
               editButton: !this.state.editButton
          })
     }
     componentDidMount = () => {
          this.searchImages(this.state.searchTerm);
     }

     searchImages = (SearchWord) => {
          this.setState({
               isLoading: true
          })
          let SearchWordUrl = this.ApiUrl + SearchWord; fetch(SearchWordUrl)
               .then(Response => Response.json())
               .then((responseJson => {
                    this.setState({

                         pics: responseJson['hits'],
                         isLoading: false,
                    })
                    //console.log(this.state.pics)
               }))
     }
     render() {
          let images = this.state.pics.map((val, key) => {
               return <View key={key} style={styles.images}>
                    <ImageBackground
                         source={{ uri: val.largeImageURL }}
                         style={{
                              width: this.screenWidth,
                              height: 250
                         }}
                    >
                         <TouchableOpacity style={styles.txt}>

                              <IconButton
                                   icon='pencil'
                                   color='white'
                                   onPress={() =>
                                        this.props.navigation.navigate('QuoteEditor', { imageUrl: (val.largeImageURL) })
                                   } />
                         </TouchableOpacity>

                    </ImageBackground>
                    {this.state.isLoading && <ActivityIndicator style={styles.loader} size="large" />}
               </View>
          })
          return (
               <View>
                    {this.state.searchVisible &&
                         <View style={styles.searchContainer}>
                              <TextInput
                                   onChangeText={(searchTerm) => this.setState({ searchTerm })}
                                   style={styles.TextInput} />
                              <TouchableOpacity >
                                   <IconButton
                                        icon="magnify"
                                        width="15%"
                                        size={30}
                                        onPress={() => { this.searchImages(this.state.searchTerm); Keyboard.dismiss(); this.search(); }}
                                   />
                              </TouchableOpacity>
                         </View>
                    }
                    <ScrollView style={styles.scrollView}>
                         {images}
                    </ScrollView>
                    {this.state.searchButtonVisable && <TouchableOpacity
                         activeOpacity={0.7}
                         onPress={this.clickHandler}
                         style={styles.TouchableOpacityStyle}>

                         <IconButton
                              icon="magnify"
                              color='white'
                              size={50}
                              style={styles.FloatingButtonStyle}
                              onPress={() => this.search()}
                         />
                    </TouchableOpacity>}

               </View>
          )
     };

}
const styles = StyleSheet.create({
     images: {
     },
     TextInput: {
          backgroundColor: 'white',
          width: '85%',
          color: 'blue'
     },
     txt: {
          margin: 20,
          borderRadius: 25,
          flexDirection: 'row',
          width: 50,
          color: 'white',
          backgroundColor: 'lightgrey',
          opacity: .8,
     },
     searchContainer: {
          height: 60,
          flexDirection: "row",
          position: 'relative'
     },
     container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#8ee3ab',
     },
     TouchableOpacityStyle: {
          position: 'absolute',
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          right: 30,
          bottom: 80,
     },

     FloatingButtonStyle: {
          resizeMode: 'contain',
          width: 80,
          height: 80,
          color: 'white',
          backgroundColor: '#225e17',
     },
     loader: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center'
     }
})
