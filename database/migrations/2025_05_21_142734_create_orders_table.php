<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Link to users table
            $table->string('order_number')->unique();
            $table->decimal('total_amount', 10, 2); // Total amount of the order
            $table->string('status')->default('pending'); // e.g., pending, processing, shipped, delivered, cancelled
            $table->string('shipping_address');
            $table->string('billing_address')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('payment_status')->default('pending'); // e.g., pending, paid, failed, refunded
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};