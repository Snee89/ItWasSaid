import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';
import { View, TouchableOpacity, Modal, Text, Dimensions, StyleSheet, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function CameraComponent2() {
     const navigation = useNavigation();
     const [photo, setPhoto] = useState(null);
     const [isModalVisable, setIsModalVisable] = useState(false);

     const openCloseModal = () => {
          setIsModalVisable(!isModalVisable)
          setPhoto('null')
     }
     const handleChoosePhoto = () => {

          const options = {
               noData: true,
          }
          ImagePicker.launchImageLibrary(options, response => {
               console.log(response);
               if (response.uri) {
                    openCloseModal();
                    setPhoto(response);
               } else if
                    (response.didCancel) {
                    console.log('User cancelled image picker');
               }
          })
     }
     const handleCameraPhoto = () => {

          const options = {
               noData: true,
          }
          ImagePicker.launchCamera(options, response => {
               console.log(response);

               if (response.uri) {
                    openCloseModal();
                    setPhoto(response);
               } else if
                    (response.didCancel) {
                    console.log('User cancelled image picker');
               }
          })
     }
     const sendImageToEditor = () => {
          navigation.navigate('QuoteEditor', { imageUrl: photo.uri })
          openCloseModal()
     }


     return (
          <View>
               <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity>
                         <IconButton
                              icon="image"
                              color="darkgreen"
                              size={40}
                              onPress={() => handleChoosePhoto()}
                         />
                    </TouchableOpacity>
                    <TouchableOpacity>
                         <IconButton
                              icon="camera"
                              color="darkgreen"
                              size={40}
                              onPress={() => handleCameraPhoto()}
                         />
                    </TouchableOpacity>
               </View>
               <View >
                    <Modal

                         animationType="slide"
                         transparent={true}
                         visible={isModalVisable}>
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
                                                  onPress={() => openCloseModal()}
                                                  size={40}
                                             />
                                             <IconButton
                                                  icon="check"
                                                  color="darkgreen"
                                                  onPress={() =>
                                                       sendImageToEditor()}
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