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
        Schema::create('agreements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offer_id')->constrained('offers')->onDelete('cascade');
            $table->string('type')->comment('e.g., assignment, jv_agreement');
            $table->string('status')->default('draft')->comment('e.g., draft, sent_for_signature, signed, executed');
            $table->string('document_template_name')->nullable();
            $table->string('generated_document_path')->nullable()->comment('Path or reference to the generated document');
            $table->string('signature_provider_id')->nullable()->comment('ID from third-party signature service');
            $table->json('parties_involved')->nullable()->comment('Details of parties involved');
            $table->json('agreement_details')->nullable()->comment('Other agreement-specific data');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agreements');
    }
};
