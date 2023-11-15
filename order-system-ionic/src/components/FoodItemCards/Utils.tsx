const formatPrice = (price: number) => {
    const priceStr = price.toFixed(2);
    return `\$${priceStr}`;
};

export { formatPrice };