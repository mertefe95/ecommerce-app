const formatPrice = (price: any, noPrefix?: boolean) => {
  let currencyPrefix = "€ ";
  let convertedPrice = price
    ? parseFloat(price).toLocaleString("nl-NL", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0,00";

  return noPrefix ? convertedPrice : currencyPrefix + convertedPrice;
};

export default formatPrice;
