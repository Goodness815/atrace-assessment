"use client"
import DashboardLayout from "@/components/DashboardLayout"; // Import DashboardLayout component
import ProductForm from "@/components/ProductForm"; // Import ProductForm component
import ProductTable from "@/components/ProductTable"; // Import ProductTable component
import SummaryBox from "@/components/SummaryBox"; // Import SummaryBox component
import useStore, { Product } from "@/utils/zustandStore"; // Import Zustand store for state management
import { useState } from "react"; // Import useState hook from React

// Main component for the Home Page
export default function HomePage() {
  // Destructure methods and properties from Zustand store
  const {
    products,
    fetchProducts,
    countProducts,
    productsByStatus,
    deleteProduct,
  } = useStore();

  // Local state for managing modal visibility and selected product for editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Partial<Product> | null>(null);

  // Get total product count and status counts (pending, delivered, cancelled)
  const totalProducts = countProducts();
  const { pending, delivered, cancelled } = productsByStatus();

  // Function to open the modal and set the selected product (for editing)
  const handleOpenModal = (product: Partial<Product> | null = null) => {
    setSelectedProduct(product); // Set the selected product (if any)
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal and reset the selected product
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedProduct(null); // Reset the selected product
  };

  return (
    <DashboardLayout> {/* Wrap the content inside the dashboard layout */}
      <main className="md:p-6 text-black">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1> 
        </header>

        {/* Section to show summary of total products and product statuses */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <SummaryBox title="Total Products" value={totalProducts} /> {/* Total products summary */}
          <SummaryBox title="Pending" value={pending} /> {/* Pending products summary */}
          <SummaryBox title="Delivered" value={delivered} /> {/* Delivered products summary */}
          <SummaryBox title="Cancelled" value={cancelled} /> {/* Cancelled products summary */}
        </section>

        <section>
          {/* Button to open the modal for adding a new product */}
          <div className="w-full flex items-center justify-end">
          <button 
            className="bg-green-400 self-end my-2 text-white px-3 py-1 rounded hover:bg-gray-600 disabled:opacity-50"
            onClick={() => setIsModalOpen(true)} // Open modal when clicked
          >
            Add Product
          </button>
          </div>

          {/* Product Table */}
          <ProductTable
            products={products} // List of products to display
            fetchProducts={fetchProducts} // Fetch products function
            deleteProduct={deleteProduct} // Delete product function
            onEditProduct={handleOpenModal} // Callback to open modal for editing a product
          />
        </section>

        {/* Modal for Product Form */}
        {isModalOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40 p-8">
            {/* Modal overlay */}
            <div className="bg-white p-6 relative rounded shadow w-full max-w-4xl">
              {/* Modal content */}
              <button
                onClick={handleCloseModal} // Close the modal when clicked
                className="absolute top-1 right-4 text-black text-2xl"
              >
                &times; {/* Close button */}
              </button>
              {/* Product form component to create or edit a product */}
              <ProductForm
                initialData={selectedProduct || {}} // Pass selected product data or empty object
                onClose={handleCloseModal} // Close the modal after form submission
              />
            </div>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}
