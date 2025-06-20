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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('source')->nullable()->comment('e.g., api, csv, manual_entry');
            $table->json('original_data')->nullable()->comment('Raw data from external source');
            $table->string('status')->default('new')->comment('e.g., new, qualified, unqualified, contacted');
            $table->integer('qualification_score')->nullable()->comment('AI-powered qualification score');
            $table->text('lead_details')->nullable()->comment('Details about the lead, potentially property or contact info');
            $table->foreignId('assigned_to_user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
