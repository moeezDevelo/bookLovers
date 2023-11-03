export const GetImagePath = (key,size) =>{
    return `https://d1ycdk7bmtnujf.cloudfront.net/${size}/${key}`
}
export const GetProfilePath = (key) =>{
    return `https://d1ycdk7bmtnujf.cloudfront.net/${key}`
}

export const ConvertPhoneNumberToMasked = (phone) => {
    if (phone && phone.length === 12) {
        var countryCode = phone.substring(0, 2);
        var areaCode = phone.substring(2, 5);
        var phoneNumber1 = phone.substring(5, 8);
        var phoneNumber2 = phone.substring(8, 12)

        phone = (countryCode + '(' + areaCode + ')' + phoneNumber1 + '-' + phoneNumber2);
    }

    return phone;
}

export const StripMaskedPhoneNumber = (phone) => {
    if (phone) {
        phone = phone.replace('(', '');
        phone = phone.replace(')', '');
        phone = phone.replace('-', '');
    }

    return phone;
}