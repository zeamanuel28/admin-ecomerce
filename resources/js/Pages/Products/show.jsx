import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Provides the common layout for authenticated users
import { Head, Link } from '@inertiajs/react'; // Head for setting page title, Link for Inertia navigation
import { Button } from '@/components/ui/button'; // Assuming Shadcn UI button component

export default function ProductShow({ auth, product }) {
    return (
        // Wrap the page content with AuthenticatedLayout, passing the authenticated user data
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Product Details: {product.name}</h2>}
        >
            {/* Head component sets the HTML <title> tag for the page */}
            <Head title={product.name} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Product Name */}
                            <h3 className="text-3xl font-bold mb-4">{product.name}</h3>

                            {/* Product Image (conditionally rendered if image exists) */}
                            {product.image && (
                                <div className="mb-4">
                                    <img src={product.image} alt={product.name} className="w-full h-64 object-contain rounded" />
                                </div>
                            )}

                            {/* Product Description */}
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>

                            {/* Product Price */}
                            <p className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">${parseFloat(product.price).toFixed(2)}</p>

                            {/* Product Stock */}
                            <p className="text-md text-gray-600 dark:text-gray-400">In Stock: {product.stock}</p>

                            {/* Product Creation Date */}
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Created: {new Date(product.created_at).toLocaleDateString()}</p>

                            {/* Action Buttons */}
                            <div className="mt-6 flex gap-4">
                                {/* Link to edit the product */}
                                <Link href={route('products.edit', product.id)}>
                                    <Button>Edit Product</Button>
                                </Link>
                                {/* Link back to the product list */}
                                <Link href={route('products.index')}>
                                    <Button variant="outline">Back to List</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}