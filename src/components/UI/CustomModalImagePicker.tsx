import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Modal, Pressable, View} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../config/colors';
import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {ImageResponseCheck} from '../../config/helper';

interface dataValue {
  fileName: string;
  fileSize: string;
  height: number;
  type: string;
  uri: string;
  width: number;
}

export interface ImagePickerResponseObject {
  errorStatus: boolean;
  errorMsg: any;
  data: dataValue | null;
}

interface ImagePickerProps {
  showModal: boolean;
  onCloseModal: () => void;
  modalResponse: (response: ImagePickerResponseObject) => void;
}

const CustomModalImagePicker: React.FC<ImagePickerProps> = ({
  showModal,
  modalResponse,
  onCloseModal,
}) => {
  const openCamera = () => {
    try {
      const options: CameraOptions = {
        mediaType: 'photo',
        cameraType: 'back',
      };

      launchCamera(options, (response: ImagePickerResponse) => {
        let result = ImageResponseCheck(response);
        onCloseModal();
        modalResponse(result);
      });
    } catch (error) {
      onCloseModal();
      modalResponse({errorStatus: true, errorMsg: error, data: null});
    }
  };

  const openGallery = () => {
    try {
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
      };

      launchImageLibrary(options, (response: ImagePickerResponse) => {
        let result = ImageResponseCheck(response);
        onCloseModal();
        modalResponse(result);
      });
    } catch (error) {
      onCloseModal();
      modalResponse({errorStatus: true, errorMsg: error, data: null});
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={onCloseModal}>
      <Pressable style={styles.modalView} onPress={onCloseModal}>
        <View style={styles.subContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Choose Image</Text>
            <View style={styles.btnLayout}>
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={openGallery}>
                <MIcon
                  name="photo-library"
                  size={40}
                  color={colors.secondaryDark}
                />
                <Text style={styles.btnText}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={openCamera}>
                <MIcon
                  name="photo-camera"
                  size={40}
                  color={colors.secondaryDark}
                />
                <Text style={styles.btnText}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default CustomModalImagePicker;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  subContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
  },
  headerContainer: {
    paddingVertical: 20,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 15,
    alignSelf: 'center',
  },
  btnLayout: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btnContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
    marginTop: 8,
  },
});
