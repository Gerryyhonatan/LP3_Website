document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            {
                id: 1,
                name: "GAS LPG3KG",
                img: "LPG 3kg.png",
                category: "3Kg",
                quote : "Gas LPG 3Kg berkualitas untuk keperluan rumah tangga dan usaha kecil dirumah anda",
                price: 18000
            },
            {
                id: 2,
                name: "GAS LPG5KG",
                img: "LPG 5,5kg.png",
                category: "5,5Kg",
                quote : "Gas LPG 5,5Kg berkualitas untuk keperluan usaha mikro kecil menengah",
                price: 68000
            },
            {
                id: 3,
                name: "GAS LPG12KG",
                img: "LPG 12kg.png",
                category: "12Kg",
                quote : "Gas LPG 12Kg berkualitas untuk keperluan bisnis dan rumah makan anda",
                price: 128000
            },
        ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,

        // Tambahkan barang ke keranjang
        add(newItem) {
            // Cek apakah item sudah ada di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            if (!cartItem) {
                // Jika barang belum ada di cart, tambahkan item baru
                this.items.push({ ...newItem, quantity: 1, total: newItem.price });
            } else {
                // Jika barang sudah ada, tambahkan kuantitas dan perbarui total
                this.items = this.items.map((item) => {
                    if (item.id !== newItem.id) return item;
                    item.quantity++;
                    item.total = item.price * item.quantity;
                    return item;
                });
            }

            // Perbarui total kuantitas dan total harga
            this.recalculateCart();
        },

        // Hapus barang dari keranjang
        remove(id) {
            // Cari item berdasarkan ID
            const cartItem = this.items.find((item) => item.id === id);

            if (cartItem) {
                if (cartItem.quantity > 1) {
                    // Kurangi kuantitas jika lebih dari 1
                    this.items = this.items.map((item) => {
                        if (item.id !== id) return item;
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        return item;
                    });
                } else {
                    // Hapus item jika kuantitas tinggal 1
                    this.items = this.items.filter((item) => item.id !== id);
                }

                // Perbarui total kuantitas dan total harga
                this.recalculateCart();
            }
        },

        // Fungsi untuk menghitung ulang total kuantitas dan harga
        recalculateCart() {
            this.quantity = this.items.reduce((total, item) => total + item.quantity, 0);
            this.total = this.items.reduce((total, item) => total + item.total, 0);
        }
    });
});

// Konversi angka ke format rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};
