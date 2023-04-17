export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'GBP',  
    }).format(price)
};
