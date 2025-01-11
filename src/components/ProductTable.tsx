"use client"; // Indicating the component is rendered on the client side (Next.js)

import React, { useState } from "react"; // Import React and the useState and useEffect hooks
import { Product } from "../utils/zustandStore"; // Import the Product type from Zustand store

// Define the props for the ProductTable component
interface ProductTableProps {
  products: Product[]; // Array of products to display
  fetchProducts: (page: number, pageSize: number) => Product[]; // Function to fetch products with pagination
  deleteProduct: (id: string) => void; // Function to delete a product by id
  onEditProduct: (product: Product) => void; // Function to edit a product (opens the modal)
}

const ProductTable: React.FC<ProductTableProps> = ({ 
  fetchProducts, // Function to fetch products passed as a prop
  deleteProduct, // Function to delete a product passed as a prop
  onEditProduct, // Function to open the modal passed as a prop
}) => {
  const [page, setPage] = useState(1); // Local state to keep track of the current page
  const pageSize = 5; // Define the number of products per page

  // Function to fetch the products based on the page and page size
  const fetchPaginatedProducts = (page: number, pageSize: number) => {
    return fetchProducts(page, pageSize);
  };

  // Function to handle deleting a product
  const handleDelete = (id: string) => {
    deleteProduct(id); // Call the deleteProduct function from props
    // If the deleted item was the last on the current page, go back one page
    if (page > 1 && fetchPaginatedProducts(page, pageSize).length === 1) {
      setPage(page - 1); // Move to the previous page if there is only 1 product left
    }
  };

  // Fetch the products of the current page
  const currentPageProducts = fetchPaginatedProducts(page, pageSize);

  return (
    <div className="overflow-x-auto bg-white p-4 rounded shadow-md">
      {/* Table displaying the list of products */}
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Product ID</th>
            <th className="border p-2 text-left">Title</th>
            <th className="border p-2 text-left">Description</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-left">ETA</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through the current page's products and display them */}
          {currentPageProducts.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="border p-2">{product.id}</td>
              <td className="border p-2">{product.title}</td>
              <td className="border p-2">{product.description}</td>
              <td className="border p-2">{product.status}</td>
              <td className="border p-2">
                {new Date(product.eta * 1000).toLocaleString()} {/* Format ETA */}
              </td>
              <td className="border p-2 flex gap-2">
                {/* Button to edit the product, which opens the modal */}
                <button
                  onClick={() => onEditProduct(product)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                {/* Button to delete the product */}
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        {/* Previous page button */}
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1} // Disable if we're on the first page
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>

        {/* Display the current page */}
        <span>Page {page}</span>

        {/* Next page button */}
        <button
          onClick={() =>
            setPage((prev) => 
              fetchPaginatedProducts(prev + 1, pageSize).length ? prev + 1 : prev // Only go to the next page if there are products
            )
          }
          disabled={currentPageProducts.length < pageSize} // Disable if the current page has fewer products than the page size
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
