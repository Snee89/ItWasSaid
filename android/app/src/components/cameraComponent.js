import React from 'react';
import { IconButton } from 'react-native-paper';
import { View, TouchableOpacity, Modal, Text, Dimensions, StyleSheet, Image } from 'react-native';
import RNImagePicker from 'react-native-image-picker';
export default class CameraComponent extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               photo: null,
               modalIsVisable: false,
          }
     }
     static navigationOptions = {
          title: 'Home',
          headerStyle: {
               backgroundColor: '#03A9F4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
               fontWeight: 'bold',
          },
     };

     openCloseModal = () => {
          console.log(this.state.photo)
          this.setState({
               modalIsVisable: !this.state.modalIsVisable,
               photo: null
          })
     }

     handleChoosePhoto = () => {
          this.openCloseModal();
          const options = {
               noData: true,
          }
          RNImagePicker.showImagePicker(options, response => {
               if (response.uri) {
                    this.setState({ photo: response })
               }
          })
     }
     handleCameraPhoto = () => {
          this.openCloseModal();
          const options = {
               noData: true,
          }
          RNImagePicker.launchCamera(options, response => {
               if (response.uri) {
                    this.setState({ photo: response })
               }
          })
     }

     render() {
          const { photo } = this.state
          return (

               <View>
                    <View style={{ flexDirection: 'row' }}>
                         <TouchableOpacity>
                              <IconButton
                                   icon="image"
                                   color="darkgreen"
                                   size={40}
                                   onPress={() => this.handleChoosePhoto()}
                              />
                         </TouchableOpacity>
                         <TouchableOpacity>
                              <IconButton
                                   icon="camera"
                                   color="darkgreen"
                                   size={40}
                                   onPress={() => this.handleCameraPhoto()}
                              />
                         </TouchableOpacity>
                    </View>
                    <View >
                         <Modal

                              animationType="slide"
                              transparent={true}
                              visible={this.state.modalIsVisable}>
                              <View>

                                   {photo && (
                                        <View style={styles.modalContainer}>
                                             <Image
                                                  source={{ uri: photo.uri }}
                                                  style={{ width: 300, height: 300 }}
                                             />
                                             <View style={{ flexDirection: 'row' }}>
                                                  <IconButton
                                                       icon="close"
                                                       color="red"
                                                       onPress={() => this.openCloseModal()}
                                                       size={40}
                                                  />
                                                  <IconButton
                                                       icon="check"
                                                       color="darkgreen"
                                                       onPress={() =>
                                                            this.props.navigation.navigate('QuoteEditor')
                                                       }
                                                       size={40}
                                                  />

                                             </View>
                                        </View>)
                                   }
                              </View>

                         </Modal>
                    </View>
               </View>
          )
     }
}
const styles = StyleSheet.create({
     modalContainer: {
          margin: 20,
          backgroundColor: "white",
          borderRadius: 20,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
               width: 0,
               height: 2
          },
          padding: 40,
          height: '80%',
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          top: 100
     }
})