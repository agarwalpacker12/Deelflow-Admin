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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seller_user_id')->constrained('users')->onDelete('cascade');
            $table->text('address');
            $table->text('description')->nullable();
            $table->decimal('price', 15, 2)->nullable();
            $table->string('status')->default('available')->comment('e.g., available, under_contract, sold');
            $table->json('property_details')->nullable()->comment('e.g., bedrooms, bathrooms, sqft, type');
            $table->decimal('arv', 15, 2)->nullable()->comment('After Repair Value');
            $table->decimal('estimated_repairs', 15, 2)->nullable()->comment('Estimated Repair Costs');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
