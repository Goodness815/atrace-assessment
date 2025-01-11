import { create } from 'zustand'; // Import Zustand library to create a store

// Define a Package interface to represent a product's package information
export interface Package {
  name: string; // Name of the package
  weight: number; // Weight of the package
  weightUnit: string; // Unit of the weight (e.g., kg, lbs)
  quantity: number; // Quantity of the package
  quantityUnit: string; // Unit of quantity (e.g., pcs, boxes)
}

// Define the Product interface, which includes the product details and a list of packages
export interface Product {
  id: string; // Unique identifier for each product
  title: string; // Title of the product
  recipient: string; // Name of the recipient
  recipientPhone: string; // Recipient's phone number
  description: string; // Product description
  origin: string; // Product origin
  destination: string; // Product destination
  eta: number; // Estimated time of arrival (timestamp)
  status: 'Pending' | 'Delivered' | 'Cancelled'; // Current status of the product
  packages: Package[]; // List of packages associated with the product
}

// Define the State interface, which includes the product-related actions and states
interface State {
  products: Product[]; // Array of products in the store
  fetchProducts: (page: number, pageSize: number) => Product[]; // Function to fetch a paginated list of products
  countProducts: () => number; // Function to count the total number of products
  productsByStatus: () => { pending: number; delivered: number; cancelled: number }; // Function to get product counts by status
  createProduct: (product: Omit<Product, 'id'>) => void; // Function to create a new product
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void; // Function to update an existing product
  deleteProduct: (id: string) => void; // Function to delete a product
  syncWithLocalStorage: () => void; // Function to sync state with localStorage
}

// Creating the store using Zustand
const useStore = create<State>((set, get) => ({
  // Initialize the products state from localStorage (if available), or default to an empty array
  products: [],

  // Ensure `localStorage` is accessed only on the client-side
  syncWithLocalStorage: () => {
    if (typeof window !== 'undefined') {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        set({ products: JSON.parse(storedProducts) });
      }
    }
  },

  // Function to fetch products based on pagination
  fetchProducts: (page, pageSize) => {
    const start = (page - 1) * pageSize; // Calculate the start index for pagination
    return get().products.slice(start, start + pageSize); // Slice the products array for the current page
  },

  // Function to count the total number of products
  countProducts: () => get().products.length,

  // Function to get the count of products by each status ('Pending', 'Delivered', 'Cancelled')
  productsByStatus: () => {
    const { products } = get(); // Get the current list of products
    return {
      pending: products.filter((p) => p.status === 'Pending').length, // Count 'Pending' products
      delivered: products.filter((p) => p.status === 'Delivered').length, // Count 'Delivered' products
      cancelled: products.filter((p) => p.status === 'Cancelled').length, // Count 'Cancelled' products
    };
  },

  // Function to create a new product
  createProduct: (product) => {
    set((state) => {
      // Generate a new product with a random UUID for the id
      const updatedProducts = [
        ...state.products,
        { id: crypto.randomUUID(), ...product }, // Add the new product to the list (default status is 'Pending')
      ];
      if (typeof window !== 'undefined') {
        localStorage.setItem('products', JSON.stringify(updatedProducts)); // Sync the updated products list to localStorage
      }
      return { products: updatedProducts }; // Update the state with the new list of products
    });
  },

  // Function to update an existing product
  updateProduct: (id, updatedProduct) => {
    set((state) => {
      // Update the product in the list by id
      const updatedProducts = state.products.map((p) =>
        p.id === id ? { ...p, ...updatedProduct } : p // Merge updated product details into the existing product
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('products', JSON.stringify(updatedProducts)); // Sync the updated list to localStorage
      }
      return { products: updatedProducts }; // Update the state with the new list of products
    });
  },

  // Function to delete a product by its id
  deleteProduct: (id) => {
    set((state) => {
      // Filter out the product to delete by its id
      const updatedProducts = state.products.filter((p) => p.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('products', JSON.stringify(updatedProducts)); // Sync the updated list to localStorage
      }
      return { products: updatedProducts }; // Update the state with the new list of products
    });
  },
}));

// Export the store to be used in other parts of the application
export default useStore;
