"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import AIChat from "../components/AIChat"
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // 4 per row, 2 rows

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading products...</p>;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <>
    <AIChat/>
      <div className="min-h-screen bg-[#e6dbf4] py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-[#4e3084]">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center flex flex-col items-center">
            <div className="w-40 h-40 relative mb-4">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-1 text-center line-clamp-1">{product.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{product.category}</p>
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
            <div className="mt-auto w-full">
              <span className="text-xl text-purple-700 font-semibold block mt-3">${product.price}</span>
              <button className="w-full mt-3 bg-purple-500 text-white py-2 rounded-full hover:bg-purple-600 transition">Shop</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-6 py-2 bg-white border border-purple-300 text-purple-700 rounded-full hover:bg-purple-100 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-purple-700 font-semibold pt-2">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-6 py-2 bg-white border border-purple-300 text-purple-700 rounded-full hover:bg-purple-100 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
    </>
  
  );
};

export default ProductsPage;
