class CartService {
    static CART_KEY = 'travel_cart';

    static saveCart(cartData) {
        try {
            localStorage.setItem(this.CART_KEY, JSON.stringify(cartData));
            window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cartData }));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du panier:', error);
        }
    }

    static getCart() {
        try {
            const cartData = localStorage.getItem(this.CART_KEY);
            return cartData ? JSON.parse(cartData) : null;
        } catch (error) {
            console.error('Erreur lors de la récupération du panier:', error);
            return null;
        }
    }

    static clearCart() {
        try {
            localStorage.removeItem(this.CART_KEY);
            window.dispatchEvent(new CustomEvent('cartUpdated', { detail: null }));
        } catch (error) {
            console.error('Erreur lors de la suppression du panier:', error);
        }
    }

    static hasCart() {
        return !!this.getCart();
    }

    static getCartItemCount() {
        const cart = this.getCart();
        if (!cart) return 0;
        
        // Compter seulement les options (1 voyage fixe + options)
        // Si pas de voyage, pas de comptage
        if (!cart.trip) return 0;
        
        return 1 + (cart.selectedOptions?.length || 0);
    }

    static getCartSummary() {
        const cart = this.getCart();
        if (!cart) return null;
        
        return {
            destination: `${cart.trip.destinationCity}, ${cart.trip.destinationCountry}`,
            optionsCount: cart.selectedOptions?.length || 0,
            totalPrice: cart.totalPrice || 0
        };
    }

    static getCartTotal() {
        const cart = this.getCart();
        if (!cart) return 0;
        
        return cart.totalPrice || 0;
    }
}

export default CartService;
