import type React from "react";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import axios from "axios";

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get<Product[]>('http://localhost:8080/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <div key={product.id} className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4"/>
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                        <p className="text-blue-600 font-bold mt-2">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;