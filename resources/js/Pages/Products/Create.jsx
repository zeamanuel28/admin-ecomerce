import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ProductCreate({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        image: null, // Will store Base64 string or null
        stock: '',
    });

   // Function to handle file input change and convert to Base64
 const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                console.log('Base64 string generated:', base64String.substring(0, 100) + '...'); // Log first 100 chars
                console.log('Base64 string length:', base64String.length); // Log length
                setData('image', base64String); // Store Base64 string
            };
            reader.readAsDataURL(file);
        } else {
            console.log('No file selected, setting image to null.');
            setData('image', null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        // Send a POST request. Inertia will handle Base64 string as regular form data.
        post(route('products.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create Product</h2>}
        >
            <Head title="Create Product" />

            <div className="py-12">
                <div className="max-w-md mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className="space-y-6">
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
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="price">Price</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        name="price"
                                        value={data.price}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('price', e.target.value)}
                                    />
                                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        name="stock"
                                        value={data.stock}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('stock', e.target.value)}
                                    />
                                    {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                                </div>

                                {/* Image File Input for Base64 */}
                                <div>
                                    <Label htmlFor="image">Product Image (File)</Label>
                                    <Input
                                        id="image"
                                        type="file" // Type remains 'file'
                                        name="image_file" // Give it a different name to avoid conflict if you had 'image' for URL
                                        className="mt-1 block w-full"
                                        accept="image/*" // Restrict to image files
                                        onChange={handleImageChange} // Use the new handler
                                    />
                                    {/* Optional: Display a preview of the selected image */}
                                    {data.image && (
                                        <img src={data.image} alt="Image Preview" className="mt-2 h-24 w-24 object-cover rounded" />
                                    )}
                                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Button disabled={processing}>
                                        Create Product
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