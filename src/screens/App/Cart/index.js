import React, { Fragment, useEffect } from 'react';
import { View, Text, StatusBar, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { CartHeader } from '../../../components/Headers/index';
import { Button } from '../../../components/Button/index';
import Colors from '../../../utills/Colors';
import { useSelector } from 'react-redux';
import { height } from 'react-native-dimension';
import { removeCartItem } from '../../../Redux/Actions/Cart';
import { useDispatch } from 'react-redux';
import stripe from 'tipsi-stripe';
import { GetImagePath } from '../../../utills/Methods';
export default function Cart({ navigation, route }) {
    const cartItem = useSelector(state => state.Cart.cartItem);
    const dispatch = useDispatch();
    let sum = cartItem.reduce((a, c) => { return a + c.Price.replace('$', '') * c.quantity }, 0);
    const size=`500x500`;
    const _showCartItem = ({ item }) => {
        return (
            <View style={styles.itemsContainer}>
                <View style={styles.itemInfoContainer}>
                    <Image source={{ uri: GetImagePath(item?.ImageUrl,size) }} resizeMode='cover' style={styles.itemImage} />
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.itemNameText}>{item?.Title}</Text>
                        <Text numberOfLines={1} style={styles.authorText}>{item?.Description}</Text>
                        <View style={styles.quantityContainer}>
                            <Text style={styles.qtyText}>QTY:</Text>
                            <View style={styles.itemQuantityContainer}>
                                <Text style={styles.quantityText}>{item?.quantity}</Text>
                            </View>
                            {/* <TouchableOpacity>
                                <Text style={styles.updateQuantityText}>Update{'\n'}Quantity</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </View>
                <View style={[styles.line, { borderBottomColor: Colors.border }]} />
                <View style={styles.itemPriceContainer}>
                    <Text style={styles.itemPriceText}>{`Member Price: ${item.Price}`}</Text>
                    <TouchableOpacity onPress={() => dispatch(removeCartItem(item))} >
                        <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    const _handleCardPayProcess = async () => {
        const paymentMethod = await stripe.paymentRequestWithCardForm({
            requiredBillingAddressFields: 'full',
            prefilledInformation: {
                billingAddress: {
                    name: 'Gunilla Haugeh',
                    line1: 'Canary Place',
                    line2: '3',
                    city: 'Macon',
                    state: 'Georgia',
                    country: 'US',
                    postalCode: '31217',
                },
            },
        })
        console.log(paymentMethod)
    }
    useEffect(() => {
        stripe.setOptions({
            publishableKey: 'pk_test_51HZnDWJVs1DolA50ItuTje30ZbNaaXIdne44MrBfBpv2syhv5etOgOgQvev9ea5JQgKjicBZs4pGHDyYL5thZVjn00OzsJqCmm'
        })
    }, [])
    return (
        <Fragment>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={Colors.white}
            />
            <SafeAreaView
                style={(styles.container, { backgroundColor: Colors.white })}
            />
            <SafeAreaView style={styles.container}>
                <CartHeader onPress={() => navigation.goBack()}
                    title='Cart'
                />
                <View style={styles.mainViewContainer}>
                    <View style={styles.yourCartCotainer}>
                        <Text style={styles.cartItemsText}>Your Cart</Text>
                        <Text style={styles.cartItemsText}>{`${cartItem.length} items`}</Text>
                    </View>
                    <View style={styles.flatListContainer}>
                        <FlatList
                            data={cartItem}
                            ItemSeparatorComponent={() => <View style={styles.itemSeparatorComponent} />}
                            renderItem={_showCartItem}
                            style={{ flex: 1 }}
                            contentContainerStyle={{ paddingBottom: height(2) }}
                            showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.Id.toString()}
                        />
                    </View>
                    <View style={styles.pricesTextContainer}>
                        <View style={styles.subTotalContainer}>
                            <Text style={styles.priceHeading}>Subtotal</Text>
                            <Text style={styles.priceText}>{`$${sum}`}</Text>
                        </View>
                        <View style={styles.estimatedContainer}>
                            <Text style={styles.priceHeading}>Estimated Shipping</Text>
                            <Text style={styles.priceText}>Free</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.subTotalPriceContainer}>
                            <Text style={styles.subTotalHeading}>Subtotal</Text>
                            <Text style={styles.totalPriceText}>{`$${sum}`}</Text>
                        </View>
                    </View>
                    <Button title='CHECKOUT' style={styles.checkOutButton}
                        onPress={_handleCardPayProcess}
                    />
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ backgroundColor: Colors.appColor }} />
        </Fragment>
    );
}
