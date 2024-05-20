import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  closeButton: {
    marginBottom: 15,
    alignSelf: 'flex-end',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

const ListItem = React.memo(({ item, onPress }) => (
  <TouchableOpacity style={styles.listItem} onPress={onPress}>
    <Text style={styles.modalText}>{item.nombrePlanta}</Text>
  </TouchableOpacity>
));

const keyExtractor = (item) => item.idPlanta.toString();

const PlantModal = ({ visible, onClose, onSelect, plantas }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Seleccione una planta</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Icon name="close" size={20} color="#000" />
          </TouchableOpacity>
          <FlatList
            data={plantas}
            keyExtractor={keyExtractor}
            renderItem={({ item }) => <ListItem item={item} onPress={() => onSelect(item.nombrePlanta)} />}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PlantModal;