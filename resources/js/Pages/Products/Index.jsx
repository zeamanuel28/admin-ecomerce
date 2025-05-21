import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Assuming you have Input component
import { Label } from '@/components/ui/label'; // Assuming you have Label component

export default function ProductIndex({ auth, products, filters }) {
    // State for filter inputs, initialized from the 'filters' prop
    const [searchName, setSearchName] = useState(filters.name || '');
    const [minPrice, setMinPrice] = useState(filters.min_price || '');
    const [maxPrice, setMaxPrice] = useState(filters.max_price || '');

    // Function to apply filters
    const applyFilters = () => {
        router.get(
            route('products.index'),
            {
                name: searchName,
                min_price: minPrice,
                max_price: maxPrice,
            },
            {
                preserveState: true, // Keep the current scroll position and form state
                preserveScroll: true, // Preserve scroll position
                replace: true,       // Replace the current history entry
            }
        );
    };

    // Function to clear filters
    const clearFilters = () => {
        setSearchName('');
        setMinPrice('');
        setMaxPrice('');
        router.get(route('products.index'), {}, { replace: true }); // Navigate without filters
    };

    // Handle Enter key press on input fields to apply filters
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            applyFilters();
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('products.destroy', id), {
                onSuccess: () => alert('Product deleted successfully!'),
                onError: (errors) => alert('Error deleting product: ' + Object.values(errors).join(', ')),
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Products</h2>}
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold">All Products</h3>
                                <Link href={route('products.create')}>
                                    <Button>Add New Product</Button>
                                </Link>
                            </div>

                            {/* Filter Section */}
                            <div className="mb-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
                                <h4 className="text-lg font-semibold mb-3">Filter Products</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="searchName">Product Name</Label>
                                        <Input
                                            id="searchName"
                                            type="text"
                                            value={searchName}
                                            onChange={(e) => setSearchName(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Search by name..."
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="minPrice">Min Price</Label>
                                        <Input
                                            id="minPrice"
                                            type="number"
                                            step="0.01"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Min price"
                                                                                        className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="maxPrice">Max Price</Label>
                                        <Input
                                            id="maxPrice"
                                            type="number"
                                            step="0.01"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Max price"
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Button onClick={applyFilters}>Apply Filters</Button>
                                    <Button onClick={clearFilters} variant="outline">Clear Filters</Button>
                                </div>
                            </div>

                            {/* Product List */}
                            {products.length === 0 ? (
                                <p className="text-center text-gray-500 dark:text-gray-400">No products found matching your criteria.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Image</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stock</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                            {products.map((product) => (
                                                <tr key={product.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <img
                                                            src={product.image || 'https://placehold.co/48x48/E0E0E0/000000?text=NoImg'}
                                                            alt={product.name}
                                                            className="h-12 w-12 object-cover rounded"
                                                            onError={(e) => {
                                                                e.currentTarget.src = 'https://placehold.co/48x48/E0E0E0/000000?text=NoImg';
                                                            }}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                        <Link href={route('products.show', product.id)} className="text-blue-600 hover:underline">
                                                            {product.name}
                                                        </Link>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs truncate">{product.description}</p>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">${parseFloat(product.price).toFixed(2)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{product.stock}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <Link href={route('products.edit', product.id)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4">
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(product.id)}
                                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
