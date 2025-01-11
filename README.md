# aTrace Product Management Dashboard Assessment - Using Next.js 15, Zustand, and Tailwind CSS

This project is a simple product management dashboard that allows users to manage products, including creating, editing, and deleting products. The application is built using **Next.js 15**, **Zustand** for state management, and **Tailwind CSS** for styling. Below is an extensive guide explaining how these technologies were used to build this project.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Project Setup](#project-setup)
3. [Technologies Used](#technologies-used)
4. [State Management with Zustand](#state-management-with-zustand)
5. [Styling with Tailwind CSS](#styling-with-tailwind-css)
6. [Routing and Pages](#routing-and-pages)
7. [Key Features](#key-features)

---

## Introduction

This project is a product management dashboard built with **Next.js 15**, **Zustand** for state management, and **Tailwind CSS** for styling. It allows users to manage a list of products, including adding new products, editing existing ones, and deleting them. The state of the products is persisted locally in the browser using `localStorage`, and the user interface is responsive, thanks to the use of **Tailwind CSS**.

### Core Features:

- **Add Product**: Users can add new products to the dashboard with details like title, recipient, ETA, and status.
- **Edit Product**: Users can edit existing product details.
- **Delete Product**: Users can remove products from the list.
- **Filter by Status**: The products can be filtered by status (Pending, Delivered, Cancelled).
- **Responsive Design**: The application is fully responsive, ensuring it works on all device sizes.

---

## Project Setup

To get started with the project, follow the steps below.

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v16.x or higher)
- **npm** or **yarn** (package managers)

### Steps to Set Up the Project

1. **Clone the Repository:**
   First, clone the project repository to your local machine using the following command:
   ```bash
   git clone https://github.com/Goodness815/atrace-assessment.git
   ```
2. **Navigate to the Project Folder:**
   After cloning the repository, navigate to the project folder:
   cd atrace-assessment
3. **Install Dependencies:**
   Install the project dependencies using npm or yarn. Depending on your package manager:
   npm install
4. **Navigate to the Project Folder:**
   After cloning the repository, navigate to the project folder:
   cd atrace-assessment
5. **Start the Development Server:**
   Once dependencies are installed, you can start the development server using the following command:
   npm run dev

## 3. Technologies Used

This project leverages a variety of modern technologies to build a performant, scalable, and responsive web application. Below are the main technologies used:

### 1. **React**
   React is the core library used for building the user interface (UI) and managing the app's state. It allows us to build interactive and dynamic web pages using reusable components.

### 2. **Zustand (State Management)**
   Zustand is used for state management in this project. It provides a simple and scalable way to manage global state, making it easy to store and access data like product details, status, and other application states.

### 3. **Tailwind CSS**
   Tailwind CSS is a utility-first CSS framework that enables us to build custom, responsive, and modern user interfaces quickly. It helps us avoid writing custom CSS by using predefined classes for layout, styling, and responsiveness.

### 4. **TypeScript**
   TypeScript is used to provide static typing for the JavaScript code. It helps catch errors early during development, improves code quality, and enhances the overall developer experience.

### 5. **Vite**
   Vite is used as the build tool for this project. It offers fast development server start-up times and optimizes the build process, making it more efficient for modern web development.

### 6. **LocalStorage**
   The application uses LocalStorage to persist data (such as product information) across sessions. This allows the app to store products on the client side and retrieve them even after the browser is closed and reopened.

These technologies together help create a robust and efficient web application that is easy to maintain and extend.

## 4. State Management with Zustand

For managing the global state of the application, we use **Zustand**, a small, fast, and scalable state management solution for React. Zustand helps simplify state management by providing an easy-to-use API and eliminating the need for complex reducers or context providers.

### Key Concepts

- **Global Store:** Zustand uses a global store to store the application's state, which can be accessed and updated by any component in the app.
- **Actions:** In Zustand, actions are functions that modify the state. These can be used to create, update, and delete data.
- **Reactivity:** When the state changes, any component that subscribes to that state will automatically re-render to reflect the updated data.

### Store Structure

In this project, the store is defined in a custom hook located in the `utils/zustandStore.ts` file. This store holds the following states:

- **products:** An array of products stored in the state.
- **fetchProducts:** A function that fetches products with pagination (for example, fetching 5 products at a time).
- **countProducts:** A function that counts the total number of products.
- **productsByStatus:** A function that returns the number of products by their status (Pending, Delivered, Cancelled).
- **createProduct:** A function that adds a new product to the state.
- **updateProduct:** A function that updates an existing product.
- **deleteProduct:** A function that deletes a product from the state.
- **syncWithLocalStorage:** A function that syncs the store with the data in the browser's LocalStorage, ensuring the state is persisted between sessions.

### Example Usage

To access or modify the state within a component, you can use the custom `useStore` hook. Here's an example of how to create a new product:

```ts
const { createProduct } = useStore();

const newProduct = {
  title: 'New Product',
  recipient: 'John Doe',
  recipientPhone: '1234567890',
  description: 'Description of the new product',
  origin: 'New York',
  destination: 'California',
  eta: Date.now() / 1000, // ETA in Unix timestamp format
  status: 'Pending',
  packages: [{ name: 'Package 1', weight: 5, weightUnit: 'kg', quantity: 1, quantityUnit: 'pcs' }],
};

createProduct(newProduct);

## 5. Styling with Tailwind CSS

This project uses **Tailwind CSS**, a utility-first CSS framework that allows developers to build custom designs quickly and efficiently. Tailwind provides low-level utility classes that can be combined to create complex designs without writing custom CSS.

### Why Tailwind CSS?

- **Utility-First:** Tailwind provides utility classes for every CSS property, which enables a highly flexible and modular design system.
- **Responsive Design:** Tailwind makes it easy to create responsive layouts with simple, mobile-first breakpoints.
- **Customization:** You can customize Tailwind’s default configuration to suit your project’s design needs.

### How It's Used in the Project

Tailwind CSS is used throughout the project for layout, styling, and responsiveness. The main utility classes are applied directly within JSX elements to style components.

For example:

```jsx
<button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
  Save Product
</button>

## 6. Routing and Pages

The application utilizes **Next.js** for routing and rendering the pages. Next.js provides a file-based routing system, which allows developers to create pages by simply adding React components in the `pages` directory. Routing is handled automatically, with each file corresponding to a URL route.

### Page Structure

The project has a simple structure for its pages:
- `app/page.tsx`: This is the **HomePage** of the application, where users can view and manage products.
- `app/layout.tsx`: This file wraps the application and applies global styles, such as the `DashboardLayout`.

## 7. Key Features

The application offers the following key features:

### 1. Product Management
- **Add a Product**: Users can add new products through the product form, where they specify details such as the title, recipient, description, status, and package information.
- **Edit a Product**: Users can edit existing products. The form pre-fills with the current data of the product, allowing the user to update any fields and save the changes.
- **Delete a Product**: Products can be deleted from the product table. If a product is deleted from the current page and it's the last one on that page, the page automatically navigates to the previous page.

### 2. Pagination
- The product list is paginated, allowing users to view a subset of products at a time. Pagination controls allow users to navigate through pages, making it easier to manage large sets of products.
- The pagination logic is tied to the `fetchProducts` function, which retrieves products based on the page number and page size.

### 3. Product Status
- Products are categorized into three statuses: **Pending**, **Delivered**, and **Cancelled**.
- The **Summary Box** component displays counts of products by their current status, providing an overview of the product lifecycle.
- The ability to update the product status helps keep track of progress in real-time.

### 4. Package Management
- Each product can have one or more packages associated with it. Packages have attributes like name, weight, weight unit, quantity, and quantity unit.
- Users can add multiple packages to a product and manage them through the form. Packages can be removed or modified as needed.

### 5. Persistent State with Local Storage
- The application stores product data in **local storage**, ensuring that the data persists even after a page reload. 
- When a product is added, updated, or deleted, the changes are immediately reflected in local storage.

### 6. Responsive Design
- The layout is designed to be fully responsive. The sidebar is collapsible on mobile devices, providing a seamless experience across different screen sizes.
- The application makes use of **Tailwind CSS** to ensure it looks good on mobile and desktop devices alike.
