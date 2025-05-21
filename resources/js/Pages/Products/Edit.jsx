import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Provides the common layout for authenticated users
import { Head, useForm } from '@inertiajs/react'; // Head for setting page title, useForm for form handling
import { Button } from '@/components/ui/button';   // Assuming Shadcn UI button component
import { Input } from '@/components/ui/input';     // Assuming Shadcn UI input component
import { Label } from '@/components/ui/label';     // Assuming Shadcn UI label component
import { Textarea } from '@/components/ui/textarea'; // Assuming Shadcn UI textarea component

export default function ProductEdit({ auth, product }) { // This component receives the 'product' prop from Laravel
    // useForm hook initializes form data with the existing product's details.
    // 'data' holds the current form input values, pre-filled with product data.
    // 'setData' is used to update form input values.
    // 'put' is the method to send a PUT request (for updates) to the backend.
    // 'processing' is a boolean indicating if the form is currently submitting.
    // 'errors' is an object containing validation errors returned from the backend.
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        description: product.description || '', // Use empty string if description is null
        price: product.price,
        image: product.image || '',         // Use empty string if image is null
        stock: product.stock,
    });

    // Function to handle form submission
    const submit = (e) => {
        e.preventDefault(); // Prevent default browser form submission behavior

        // Send a PUT request to the 'products.update' route for this specific product ID.
        // Inertia automatically handles sending the 'data' object as form data.
        put(route('products.update', product.id));
    };

    return (
        // Wrap the page content with AuthenticatedLayout, passing the authenticated user data
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit Product: {product.name}</h2>}
        >
            {/* Head component sets the HTML <title> tag for the page */}
            <Head title={`Edit ${product.name}`} />

            <div className="py-12">
                <div className="max-w-md mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* The form element, onSubmit calls our 'submit' function */}
                            <form onSubmit={submit} className="space-y-6">
                                {/* Product Name Input */}
                                <div>
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)} // Update 'name' in form data
                                    />
                                    {/* Display validation error for 'name' if it exists */}
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                {/* Description Textarea */}
                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('description', e.target.value)} // Update 'description'
                                    />
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                                </div>

                                {/* Price Input */}
                                <div>
                                    <Label htmlFor="price">Price</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01" // Allows decimal values for price
                                        name="price"
                                        value={data.price}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('price', e.target.value)} // Update 'price'
                                    />
                                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                                </div>

                                {/* Stock Input */}
                                <div>
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        name="stock"
                                        value={data.stock}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('stock', e.target.value)} // Update 'stock'
                                    />
                                    {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                                </div>

                                {/* Image URL Input */}
                                <div>
                                    <Label htmlFor="image">Image URL (or Base64)</Label>
                                    <Input
                                        id="image"
                                        type="text"
                                        name="image"
                                        value={data.image}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('image', e.target.value)} // Update 'image'
                                    />
                                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                                </div>

                                {/* Submit Button */}
                                <div className="flex items-center justify-end mt-4">
                                    <Button disabled={processing}> {/* Button is disabled while the form is submitting */}
                                        Update Product
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}