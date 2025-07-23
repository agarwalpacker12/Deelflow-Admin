<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update any existing users to be wholesalers
        DB::table('users')->update(['role' => 'wholesaler']);
        
        // Update the role column to have a more restrictive default and constraint
        Schema::table('users', function (Blueprint $table) {
            $table->string('role', 50)->default('wholesaler')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert the role column back to original state
        Schema::table('users', function (Blueprint $table) {
            $table->string('role', 50)->default('wholesaler')->change();
        });
    }
};
