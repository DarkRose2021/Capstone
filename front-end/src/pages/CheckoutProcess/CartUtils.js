export function getProductQty(cart, productId) {
    if (cart && cart.Products) {
        const productInCart = cart.Products.find(
            (product) => product.ProductID === productId
        );
        return productInCart ? productInCart.Qty : 0;
    }
    return 0;
}

export function calculatePrice(qty, price) {
	return qty * price;
}

export function calculateTotal(cart, products) {
	let total = 0;
	if (cart && products) {
		products.forEach((product) => {
			const quantity = getProductQty(cart, product._id);
			total += calculatePrice(quantity, product.Price);
		});
	}
	return total;
}

export function calculateTotalItems(cart, products) {
    let totalItems = 0;
    if (cart && products) {
        products.forEach((product) => {
            totalItems += getProductQty(cart, product._id);
        });
    }
    return totalItems;
}

export function taxes(qty, price, tax) {
    let totalSalesTax = 0;
    for (let i = 0; i < qty; i++) {
        let salesTax = tax * price;
        totalSalesTax += salesTax;
    }
    return totalSalesTax;
}

export function totalSalesTax(cart, products, tax) {
    let totalTax = 0;
    if (cart && products) {
        products.forEach((product) => {
            const quantity = getProductQty(cart, product._id);
            const productTax = taxes(quantity, product.Price, tax);
            totalTax += productTax;
        });
    }

    return totalTax;
}