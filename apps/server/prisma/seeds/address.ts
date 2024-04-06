const { AddressType } = require('@prisma/client');

module.exports = [
  {
    userId: 1,
    houseNumber: '69/1',
    street: 'Umraniye 1 sokak',
    zipCode: '34742',
    city: 'Istanbul',
    countryId: 228,
    addressType: AddressType.DELIVERY,
    currentAddress: true,
  },
  {
    userId: 1,
    houseNumber: '69/1',
    street: 'Umraniye 1 sokak',
    zipCode: '34742',
    city: 'Istanbul',
    countryId: 228,
    addressType: AddressType.INVOICE,
    currentAddress: true,
  },
];
