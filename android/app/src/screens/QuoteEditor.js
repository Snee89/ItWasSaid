import React from 'react';
import {
     StyleSheet,
     TextInput,
     Text,
     View,
     ImageBackground,
     Dimensions,
     Modal,
     PermissionsAndroid,
     Platform,
     Image,
     Animated

} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import { IconButton } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
     SliderHuePicker,
     SliderSaturationPicker,
     SliderValuePicker,
} from 'react-native-slider-color-picker';
import tinycolor from 'tinycolor2';
import DropDownPicker from 'react-native-dropdown-picker';
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";
import Toast from 'react-native-simple-toast';

export async function request_storage_runtime_permission() {

     try {
          const granted = await PermissionsAndroid.request(
               PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
               {
                    'title': 'ReactNativeCode Storage Permission',
                    'message': 'ReactNativeCode App needs access to your storage to download Photos.'
               }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {

               Alert.alert("Storage Permission Granted.");
          }
          else {

               Alert.alert("Storage Permission Not Granted");

          }
     } catch (err) {
          console.warn(err)
     }
}
const {

     width,
} = Dimensions.get('window');

export default class QuoteEditor extends React.Component {


     constructor(props) {
          super(props);
          this.state = {
               quote: 'Quote Goes Here',
               author: 'Author',
               imageUrl: props.route.params.imageUrl,
               QuotefontSize: 15,
               AuthorFontSize: 15,
               AuthorVisable: false,
               quoteTextMargin: '15%',
               authorBtnWord: 'Add Author',
               oldColor: "white",
               isVisible: true,
               modalVisible: false,
               fontFamily: 'notoserif',
               fontStyle: 'normal',
               fontWeight: 'normal',
               base64Image: '',
               colorIsVisable: false,
               pressStatus: true,
               newUri: null,
               FinishedModal: false,
          }
     }

     setColorSlidersVisable = () => {
          this.setState({
               colorIsVisable: !this.state.colorIsVisable
          })
     }

     setFontWeight = (fontWeight) => {
          this.setState({
               fontWeight
          })
     }
     setFontStyle = (fontStyle) => {
          this.setState({
               fontStyle: fontStyle
          })
     }
     setFontFamily = (fontFamily) => {
          this.setState({
               fontFamily: fontFamily
          })
     }
     changeColor = (colorHsvOrRgb, resType) => {
          if (resType === 'end') {
               this.setState({
                    oldColor: tinycolor(colorHsvOrRgb).toHexString(),
               });
               console.log(this.state.oldColor)
          }
     }
     setModalVisible = () => {
          this.setState({
               modalVisible: !this.state.modalVisible
          })
     }
     setBackGroundOp = () => {
          this.setState({
               pressStatus: !this.state.pressStatus
          })

     }
     changeAuthorVisable() {
          this.setState({
               AuthorVisable: !this.state.AuthorVisable,
          })
          if (this.state.AuthorVisable = true) {
               this.setState({
                    quoteTextMargin: '5%',
               })
          }
     }
     updateQuoteFont = (value) => {
          this.setState({
               QuotefontSize: value
          })
     }
     updateAuthorFont = (value) => {
          this.setState({
               AuthorFontSize: value

          })
     }
     checkAndroidPermission = async () => {
          try {
               const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
               await PermissionsAndroid.request(permission);
               Promise.resolve();
          } catch (error) {
               Promise.reject(error);
          }
     };
     CaptureViewShot = async () => {

          if (Platform.OS === 'android') {
               await this.checkAndroidPermission();
          }
          this.refs.viewShot.capture().then(uri => {
               this.openFinishedModal();

               this.setState({
                    newUri: uri
               })
               console.log(uri);
               //CameraRoll.save(uri, 'photo')
          });

     }
     DownloadImage = () => {
          CameraRoll.save(this.state.newUri, 'photo')
          Toast.show('Saved to Device')
     }
     openFinishedModal = () => {
          this.setState({
               FinishedModal: !this.state.FinishedModal
          })
     }
     shareImage = async () => {
          Toast.show('Saved to Device')

          CameraRoll.save(this.state.newUri, 'photo')
          const shareOptions = {
               title: 'It Was Said App',
               message: 'Check out the ItWasSaid App on Google Play',
          };
          await Share.open(shareOptions)
               .then((res) => { console.log(res.message, res.uri) })
     }

     render() {
          const {
               oldColor,
          } = this.state;

          return (


               <View style={styles.quoteContainer}>
                    <ViewShot ref="viewShot"
                         options={{
                              format: "jpg",
                              quality: 1.0,

                         }}>
                         <ImageBackground
                              id="mySvgElement"
                              source={{ uri: this.state.imageUrl }}
                              style={{
                                   width: this.screenWidth,
                                   height: 300,
                                   opacity: 0.95,
                                   backgroundColor: 'white'
                              }}
                         >

                              <Text style={[this.state.pressStatus ? styles.welcomePress : styles.quoteTextWBG || styles.quoteText,
                              {
                                   fontSize: this.state.QuotefontSize,
                                   marginTop: this.state.quoteTextMargin,
                                   color: this.state.oldColor,
                                   fontFamily: this.state.fontFamily,
                                   fontStyle: this.state.fontStyle,
                                   fontWeight: this.state.fontWeight,
                                   textAlign: 'center',
                                   marginLeft: '10%',
                                   width: '80%',
                                   padding: 15,
                                   marginTop: '15%',
                                   borderRadius: 25,
                                   opacity: .9,

                              }]}
                              >{this.state.quote}
                              </Text>
                              {this.state.AuthorVisable &&
                                   <Text style={[styles.quotee,
                                   {
                                        fontSize: this.state.AuthorFontSize,
                                        color: this.state.oldColor,
                                        fontFamily: this.state.fontFamily,
                                        fontStyle: this.state.fontStyle,
                                        fontWeight: this.state.fontWeight,

                                   }]}
                                   >{this.state.author}
                                   </Text>}
                         </ImageBackground>
                    </ViewShot>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

                         <TouchableOpacity>
                              <IconButton
                                   icon="check"
                                   size={30}
                                   color='darkgreen'

                                   onPress={() => this.CaptureViewShot(this.refs)}
                              >
                              </IconButton>
                         </TouchableOpacity>
                         <TouchableOpacity>
                              <IconButton
                                   icon="text"
                                   color="black"
                                   size={30}
                                   onPress={() => this.setModalVisible()}

                              />
                         </TouchableOpacity>
                         <TouchableOpacity>
                              <IconButton
                                   icon="image"
                                   color="lightgrey"
                                   size={30}
                                   onPress={() => this.setBackGroundOp()}

                              />
                         </TouchableOpacity>
                         <TouchableOpacity>
                              <IconButton
                                   icon="palette"
                                   color="darkorange"
                                   size={30}
                                   onPress={() => this.setColorSlidersVisable()}
                              />
                         </TouchableOpacity>
                         <TouchableOpacity>
                              <IconButton
                                   icon="face"
                                   color="purple"
                                   size={30}
                                   onPress={() => this.changeAuthorVisable()}
                              />
                         </TouchableOpacity>


                    </View>
                    <TextInput
                         onChangeText={quote =>
                              this.setState({ quote })
                         }
                         placeholder='Quote...'
                         style={styles.input}></TextInput>
                    <Text style={styles.labels} >Quote Size</Text>
                    <Slider

                         style={styles.slider}
                         minimumValue={15}
                         maximumValue={30}
                         step={1}
                         minimumTrackTintColor="#FFFFFF"
                         maximumTrackTintColor="#000000"
                         onValueChange={(value) => this.updateQuoteFont(value)}
                    />
                    {
                         this.state.AuthorVisable &&
                         <View>
                              <TextInput
                                   onChangeText={author =>
                                        this.setState({ author })
                                   }
                                   placeholder='Author...'
                                   style={styles.input}></TextInput>
                              <Text style={styles.labels}>Author Size</Text>
                              <Slider
                                   thumbStyle={styles.sliderThumb}
                                   style={styles.slider}
                                   minimumValue={15}
                                   maximumValue={30}
                                   step={1}
                                   minimumTrackTintColor="#FFFFFF"
                                   maximumTrackTintColor="#000000"
                                   onValueChange={(value) => this.updateAuthorFont(value)}
                              /></View>
                    }

                    <TouchableOpacity style={styles.buttonRow}>
                    </TouchableOpacity>
                    {this.state.colorIsVisable &&
                         <View style={styles.container}>
                              <View style={{ marginHorizontal: 24, marginTop: 20, height: 12, width: width - 48 }}>
                                   <SliderHuePicker
                                        ref={view => { this.sliderHuePicker = view; }}
                                        oldColor={oldColor}
                                        trackStyle={[{ height: 12, width: width - 48 }]}
                                        thumbStyle={styles.thumb}
                                        onColorChange={this.changeColor}
                                   />
                              </View>
                              <View style={{ marginHorizontal: 24, marginTop: 20, height: 12, width: width - 48 }}>
                                   <SliderSaturationPicker
                                        ref={view => { this.sliderSaturationPicker = view; }}
                                        oldColor={oldColor}
                                        trackStyle={[{ height: 12, width: width - 48 }]}
                                        thumbStyle={styles.thumb}
                                        onColorChange={this.changeColor}
                                        style={{ height: 12, borderRadius: 6, backgroundColor: tinycolor({ h: tinycolor(oldColor).toHsv().h, s: 1, v: 1 }).toHexString() }}
                                   />
                              </View>
                              <View style={{ marginHorizontal: 24, marginTop: 20, marginBottom: 10, height: 12, width: width - 48 }}>
                                   <SliderValuePicker
                                        ref={view => { this.sliderValuePicker = view; }}
                                        oldColor={oldColor}
                                        minimumValue={0.02}
                                        step={0.05}
                                        trackStyle={[{ height: 12, width: width - 48 }]}
                                        trackImage={require('react-native-slider-color-picker/brightness_mask.png')}
                                        thumbStyle={styles.thumb}
                                        onColorChange={this.changeColor}
                                        style={{ height: 12, borderRadius: 6, backgroundColor: 'black' }}
                                   />
                              </View>

                         </View>}

                    <Modal
                         animationType="slide"
                         transparent={true}
                         visible={this.state.modalVisible}

                    ><View style={styles.centeredView}>
                              <View style={styles.modalView}>
                                   <View style={styles.modalButtonViews}>
                                        <Text style={styles.modalText}>Font Famiy</Text>
                                        <DropDownPicker
                                             items={[
                                                  { label: 'normal', value: 'normal' },
                                                  { label: 'notoserif', value: 'notoserif' },
                                                  { label: 'sans-serif', value: 'sans-serif' },
                                                  { label: 'sans-serif-light', value: 'sans-serif-light' },
                                                  { label: 'sans-serif-thin', value: 'sans-serif-thin' },
                                                  { label: 'sans-serif-condensed', value: 'sans-serif-condensed' },
                                                  { label: 'sans-serif-medium', value: 'sans-serif-medium' },
                                                  { label: 'serif', value: 'serif' },
                                                  { label: 'Roboto', value: 'Roboto' },
                                                  { label: 'monospace', value: 'monospace' },

                                             ]}
                                             defaultValue="normal"
                                             containerStyle={{ height: 30, width: 150 }}
                                             style={{ backgroundColor: '#fafafa' }}
                                             dropDownStyle={{ backgroundColor: '#fafafa' }}
                                             onChangeItem={(item) => this.setFontFamily(item.value)}
                                             style={{
                                                  borderTopLeftRadius: 10, borderTopRightRadius: 10,
                                                  borderBottomLeftRadius: 10, borderBottomRightRadius: 10
                                             }}
                                             dropDownStyle={{
                                                  borderBottomLeftRadius: 20, borderBottomRightRadius: 20
                                             }}
                                        />
                                   </View>
                                   <View style={styles.modalButtonViews}>
                                        <Text style={styles.modalText}>Font Style</Text>
                                        <DropDownPicker
                                             items={[
                                                  { label: 'normal', value: 'normal' },
                                                  { label: 'italic', value: 'italic' },
                                             ]}
                                             defaultValue="normal"
                                             containerStyle={{ height: 30, width: 150 }}
                                             style={{ backgroundColor: '#fafafa' }}
                                             dropDownStyle={{ backgroundColor: '#fafafa' }}
                                             onChangeItem={(item) => this.setFontStyle(item.value)}
                                             style={{
                                                  borderTopLeftRadius: 10, borderTopRightRadius: 10,
                                                  borderBottomLeftRadius: 10, borderBottomRightRadius: 10
                                             }}
                                             dropDownStyle={{
                                                  borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
                                             }}
                                        />
                                   </View>
                                   <View style={styles.modalButtonViews}>
                                        <Text style={styles.modalText}>Font Weight</Text>
                                        <DropDownPicker
                                             items={[
                                                  { label: 'normal', value: 'normal' },
                                                  { label: 'bold', value: 'bold' },
                                             ]}
                                             defaultValue="normal"
                                             containerStyle={{ height: 30, width: 150 }}
                                             style={{ backgroundColor: '#fafafa' }}
                                             dropDownStyle={{ backgroundColor: '#fafafa' }}
                                             onChangeItem={(item) => this.setFontWeight(item.value)}
                                             style={{
                                                  borderTopLeftRadius: 10, borderTopRightRadius: 10,
                                                  borderBottomLeftRadius: 10, borderBottomRightRadius: 10
                                             }}
                                             dropDownStyle={{
                                                  borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
                                             }}
                                        />
                                   </View>

                                   <TouchableOpacity

                                   ><IconButton
                                             style={{ ...styles.openButton, fontSize: 25 }}
                                             icon="close"
                                             size={30}
                                             onPress={() => {
                                                  this.setModalVisible();
                                             }}
                                        />
                                   </TouchableOpacity>

                              </View>
                         </View>
                    </Modal>

                    <Modal
                         animationType="slide"
                         transparent={true}
                         visible={this.state.FinishedModal}>
                         <View style={styles.finishedmodalContainer}>
                              <Image
                                   source={{ uri: this.state.newUri }}
                                   style={{ width: 300, height: 250 }}
                              />
                              <View style={{ flexDirection: 'row' }}>
                                   <IconButton
                                        icon="close"
                                        size={50}
                                        color='red'

                                        onPress={() => this.openFinishedModal()}
                                   ></IconButton>
                                   <IconButton
                                        icon="download"
                                        size={50}
                                        color='grey'

                                        onPress={() => this.DownloadImage()}
                                   ></IconButton>
                                   <IconButton
                                        icon='share'
                                        size={50}
                                        color="blue"
                                        onPress={() => this.shareImage()}
                                   />
                              </View>
                         </View>


                    </Modal>

               </View >

          )

     }
}
const styles = StyleSheet.create({
     finishedmodalContainer: {
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
          height: '60%',
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          top: 100
     },

     modalView: {
          margin: 20,
          backgroundColor: "white",
          borderRadius: 20,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
               width: 0,
               height: 2
          },
          padding: 20,
          height: '60%',
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          top: 400
     },
     openButton: {
          borderRadius: 20,
     },
     modalButtonViews: {
          flexDirection: 'row',
          margin: 10
     },
     textStyle: {
          color: "white",
          fontWeight: "bold",
          textAlign: "center"
     },
     modalText: {
          marginRight: 15,
          textAlign: "center",
          fontFamily: 'monospace',
          color: 'darkgreen'
     },
     labels: {
          marginLeft: 10,
          color: 'slategrey'
     },
     buttonRow: {
          flexDirection: 'row'
     },
     quotee: {
          marginTop: '5%',
          textAlign: 'center',
          marginLeft: '20%',
          width: '60%',
          padding: 15,
          borderRadius: 25,
          opacity: .9,
          color: 'black',

     },
     slider: {
          width: '80%',
          marginLeft: '10%',

     },
     input: {
          paddingLeft: 20,
          margin: 10,
          borderRadius: 25,
          backgroundColor: 'lightblue'
     },
     quoteContainer: {
          alignContent: "center"
     },
     quoteText: {
          textAlign: 'center',
          marginLeft: '10%',
          width: '80%',
          padding: 15,
          marginTop: '15%',
          borderRadius: 25,
          opacity: .9,
          color: 'black',
          backgroundColor: 'rgba(255,255,255,0.6)',

     },

     container: {
          flex: 1,
          alignItems: "center",
     },
     thumb: {
          width: 20,
          height: 20,
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 10,
          shadowColor: 'black',
          shadowOffset: {
               width: 0,
               height: 2
          },
          shadowRadius: 2,
          shadowOpacity: 0.35,
     },
     button: {

          width: '80%',
          paddingTop: 3,
          paddingBottom: 3,
          backgroundColor: '#2E7D32',
          borderRadius: 7,
          margin: 10
     },
     text: {
          color: '#fff',
          fontSize: 20,
          textAlign: 'center',
          padding: 5
     }
})
