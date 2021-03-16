import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {List} from 'react-native-paper';
import {Avatar} from 'react-native-paper';
import Header from '../../Components/Header';
import ButtonNav from '../../Components/ButtonNav';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Doctor',
    text: 'Text here',
    image: require('../../../src/Avatars/1.jpg'),
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Doctor',
    text: 'Another text here',
    image: require('../../../src/Avatars/2.jpg'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Doctor',
    text: 'Another text here',
    image: require('../../../src/Avatars/3.jpg'),
  },
];

const Item = ({item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const DoctorList = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';

    return (
      <List.Item
        title={item.title}
        item={item}
        onPress={() => console.log(item.id)}
        description={item.text}
        left={(props) => <Avatar.Image size={50} source={item.image} />}
        right={(props) => (
          <ButtonNav
            icon="bell-outline"
            color="#9A5BF4"
            onPress={() => console.log('Pressed button')}
          />
        )}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  icon: {
    color: '#6200FE',
  },
});

export default DoctorList;
