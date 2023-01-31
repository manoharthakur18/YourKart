import React from 'react';
import {Text, View, Dimensions, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const data = [
  {
    id: 1,
    name: 'Laptop',
    url: 'https://www.shutterstock.com/image-photo/business-communications-mockup-laptop-voip-260nw-1868474806.jpg',
  },
  {
    id: 2,
    name: 'Shoe',
    url: 'https://www.shutterstock.com/image-vector/new-arrival-sport-shoes-banner-260nw-2113345487.jpg',
  },
  {
    id: 3,
    name: 'Tshirt',
    url: 'https://printnew.in/wp-content/uploads/2021/11/Printed-Graphic-T-shirt-Banner-For-Print-New-India-1-1024x441-1.png',
  },
  {
    id: 4,
    name: 'Jacket',
    url: 'https://www.shutterstock.com/image-photo/young-stylish-multiethnic-couple-black-260nw-2206657801.jpg',
  },
  {
    id: 5,
    name: 'Jeans',
    url: 'https://image.shutterstock.com/image-photo/banner-blue-jeans-denim-set-260nw-2204184265.jpg',
  },
];

const renderItem = ({item}) => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <Image
        source={{uri: item.url}}
        style={{width: '98%', borderRadius: 10, height: 200}}
      />
      <Text
        style={{
          marginTop: 5,
          fontSize: 24,
          fontWeight: 'bold',
        }}>
        {item.name}
      </Text>
    </View>
  );
};

const Slider = () => {
  return (
    <View style={{marginVertical: 5}}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        autoplay
        loop
      />
    </View>
  );
};

export default Slider;
