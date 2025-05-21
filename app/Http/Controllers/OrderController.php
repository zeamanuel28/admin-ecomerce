<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\product;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the orders.
     */
    public function index(Request $request)
    {
        $query = Order::with('user') // Eager load the user who placed the order
                      ->orderBy('created_at', 'desc');

        // Optional: Filter by status
        if ($request->has('status') && $request->status !== null && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Optional: Search by order number or user name
        if ($request->has('search') && $request->search !== null) {
            $searchTerm = '%' . $request->search . '%';
            $query->where(function ($q) use ($searchTerm) {
                $q->where('order_number', 'like', $searchTerm)
                  ->orWhereHas('user', function ($userQuery) use ($searchTerm) {
                      $userQuery->where('name', 'like', $searchTerm);
                  });
            });
        }

        $orders = $query->get();

        return Inertia::render('Orders/index', [
            'orders' => $orders,
            'filters' => $request->only(['status', 'search']),
            'availableStatuses' => [
                'all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
            ],
        ]);
    }




 public function create()
    {
        // Fetch all users to populate the customer selection dropdown
        $users = User::all(['id', 'name', 'email']); // Select only necessary fields

        // Fetch all products if you plan to implement product selection for order items
        $products = Product::all(['id', 'name', 'price']); // Select only necessary fields

        return Inertia::render('Orders/Create', [
            'users' => $users,
            'products' => $products, // Pass products, even if not fully used yet
        ]);
    }

    /**
     * Store a newly created product in storage.
     * Note: This method currently belongs to ProductController.
     * If you want to store orders, you'll need a store method here for orders.
     */
    // public function store(Request $request)
    // {
    //     // This `store` method is commented out as it typically belongs to
    //     // a ProductController or a dedicated Order creation flow (e.g., checkout).
    //     // If you intend to manually create orders from the admin panel,
    //     // you would implement the validation and order creation logic here.
    // }

    /**
     * Display the specified order.
     */


    /**
     * Display the specified order.
     */
    public function show(Order $order)
    {
        // Eager load user and order items, and for each item, load its product
        $order->load('user', 'orderItems.product');

        return Inertia::render('Orders/Show', [
            'order' => $order,
            'availableStatuses' => [
                'pending', 'processing', 'shipped', 'delivered', 'cancelled'
            ],
        ]);
    }

    /**
     * Update the status of the specified order.
     */
    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $order->update(['status' => $request->status]);

        return redirect()->back()->with('success', 'Order status updated successfully.');
    }

    // Since we're managing orders from admin, create, store, edit, destroy are not directly exposed via resource
    // You would typically have a separate 'checkout' process for creating orders.
}