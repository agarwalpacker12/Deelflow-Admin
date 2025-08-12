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
        Schema::table('roles', function (Blueprint $table) {
            // Drop the foreign key constraint
            $table->dropForeign(['organization_id']);
            
            // Drop the unique constraint
            $table->dropUnique(['organization_id', 'name']);
            
            // Make organization_id nullable
            $table->unsignedBigInteger('organization_id')->nullable()->change();
            
            // Add new unique constraint that allows for global roles (null organization_id)
            // We'll use a partial unique index approach
            $table->unique(['name'], 'roles_global_name_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('roles', function (Blueprint $table) {
            // Drop the global unique constraint
            $table->dropUnique('roles_global_name_unique');
            
            // Make organization_id not nullable
            $table->unsignedBigInteger('organization_id')->nullable(false)->change();
            
            // Add back the foreign key constraint
            $table->foreign('organization_id')->references('id')->on('organizations')->onDelete('cascade');
            
            // Add back the unique constraint
            $table->unique(['organization_id', 'name']);
        });
    }
};
