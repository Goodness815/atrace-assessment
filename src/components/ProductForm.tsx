"use client"; // Indicating this component runs on the client side (Next.js)

import { useState } from "react"; // Importing the useState hook for managing state
import useStore, { Product } from "../utils/zustandStore"; // Import Zustand store and Product type

// Defining props for the ProductForm component
interface ProductFormProps {
  initialData?: Partial<Product>; // Optional initial data to populate the form (for editing an existing product)
  onClose: () => void; // Function to close the form modal
}

// The main ProductForm component
const ProductForm = ({ initialData = {}, onClose }: ProductFormProps) => {
  // Accessing create and update functions from the Zustand store
  const { createProduct, updateProduct } = useStore();

  // Check if we are editing an existing product (based on the presence of an ID)
  const isEditing = Boolean(initialData.id);

  // Managing form state, initializing with either initialData or empty fields
  const [formData, setFormData] = useState<Partial<Product>>({
    title: initialData.title || "",
    recipient: initialData.recipient || "",
    recipientPhone: initialData.recipientPhone || "",
    description: initialData.description || "",
    origin: initialData.origin || "",
    destination: initialData.destination || "",
    eta: initialData.eta || 0, // Default ETA to 0 if not provided
    status: initialData.status || 'Pending', // Default status is 'Pending'
    packages: initialData.packages || [{ name: "", weight: 0, weightUnit: "", quantity: 0, quantityUnit: "" }],
  });

  // Handler for input field changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update the form state with new value
  };

  // Handler for changes in the package fields (when adding/editing packages)
  const handlePackageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedPackages = [...(formData.packages || [])]; // Copy current packages
    updatedPackages[index] = { ...updatedPackages[index], [name]: value }; // Update specific package field
    setFormData({ ...formData, packages: updatedPackages }); // Set updated packages to the form data
  };

  // Function to add a new empty package field
  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [
        ...(formData.packages || []),
        { name: "", weight: 0, weightUnit: "", quantity: 0, quantityUnit: "" },
      ], // Append new empty package object
    });
  };

  // Function to remove a package from the list
  const removePackage = (index: number) => {
    const updatedPackages = (formData.packages || []).filter(
      (_, i) => i !== index // Remove package by filtering out the one at the given index
    );
    setFormData({ ...formData, packages: updatedPackages }); // Set updated packages to the form data
  };

  // Function to save the product (either create a new product or update an existing one)
  const saveProduct = () => {
    if (isEditing) {
      // Update existing product if editing
      updateProduct(initialData.id as string, formData);
    } else {
      // Create a new product if not editing
      createProduct(formData as Omit<Product, "id">);
    }
    onClose(); // Close the form after saving the product
  };

  return (
    <div className="bg-white text-black rounded px-1 max-h-[90vh] overflow-y-scroll">
      {/* Title of the form */}
      <h2 className="text-lg font-bold mb-4">
        {isEditing ? "Edit Product" : "Add Product"} {/* Show different title based on whether it's editing or adding */}
      </h2>

      {/* Form to input product data */}
      <form>
        {/* Title input field */}
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange} // Update state on change
            className="w-full p-2 border rounded"
          />
        </div>
        
        {/* Recipient input field */}
        <div className="mb-4">
          <label className="block mb-1">Recipient</label>
          <input
            type="text"
            name="recipient"
            value={formData.recipient}
            onChange={handleInputChange} // Update state on change
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Recipient Phone input field */}
        <div className="mb-4">
          <label className="block mb-1">Recipient Phone</label>
          <input
            type="text"
            name="recipientPhone"
            value={formData.recipientPhone}
            onChange={handleInputChange} // Update state on change
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Description input field */}
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange} // Update state on change
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Origin input field */}
        <div className="mb-4">
          <label className="block mb-1">Origin</label>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleInputChange} // Update state on change
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Destination input field */}
        <div className="mb-4">
          <label className="block mb-1">Destination</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange} // Update state on change
            className="w-full p-2 border rounded"
          />
        </div>

        {/* ETA input field (Datetime) */}
        <div className="mb-4">
          <label className="block mb-1">ETA</label>
          <input
            type="datetime-local"
            name="eta"
            value={
              formData.eta
                ? new Date(formData.eta * 1000).toISOString().slice(0, -1) // Convert ETA to the correct datetime format
                : 0
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                eta: e.target.value
                  ? Math.floor(new Date(e.target.value).getTime() / 1000) // Convert the datetime to a timestamp
                  : undefined,
              })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Status field (only shown when editing) */}
        {isEditing && (
          <div className="mb-4">
            <label className="block mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange} // Update state on change
              className="w-full p-2 border rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        )}

        {/* Packages Section */}
        <div className="mb-4">
          <label className="block mb-1">Packages</label>
          <div className="flex flex-wrap gap-2">
            {/* Loop through the list of packages and display inputs for each */}
            {formData.packages?.map((pkg, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={pkg.name}
                  onChange={(e) => handlePackageChange(e, index)} // Update package field
                  className="p-2 border rounded w-1/4"
                />
                <input
                  type="number"
                  name="weight"
                  placeholder="Weight"
                  value={pkg.weight}
                  onChange={(e) => handlePackageChange(e, index)} // Update package field
                  className="p-2 border rounded w-1/4"
                />
                <select
                  name="weightUnit"
                  value={pkg.weightUnit}
                  onChange={(e) => handlePackageChange(e, index)} // Update package field
                  className="p-2 border rounded w-1/4"
                >
                  <option value="">Unit</option>
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={pkg.quantity}
                  onChange={(e) => handlePackageChange(e, index)} // Update package field
                  className="p-2 border rounded w-1/4"
                />
                <select
                  name="quantityUnit"
                  value={pkg.quantityUnit}
                  onChange={(e) => handlePackageChange(e, index)} // Update package field
                  className="p-2 border rounded w-1/4"
                >
                  <option value="">Unit</option>
                  <option value="pcs">pcs</option>
                  <option value="boxes">boxes</option>
                </select>
                <button
                  type="button"
                  onClick={() => removePackage(index)} // Remove package on click
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPackage} // Add new package on click
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Add Package
            </button>
          </div>
        </div>

        {/* Save and cancel buttons */}
        <button
          type="button"
          onClick={saveProduct} // Save or update product
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {isEditing ? "Update Product" : "Save Product"}
        </button>
        <button
          type="button"
          onClick={onClose} // Close the form without saving
          className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
