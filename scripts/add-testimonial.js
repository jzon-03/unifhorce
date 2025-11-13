#!/usr/bin/env node

/**
 * Testimonial CSV Helper Script
 * 
 * This script helps add new testimonials to the CSV file
 * Usage: node add-testimonial.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const CSV_PATH = path.join(__dirname, '../src/assets/data/testimonials.csv');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function validateInput(input, fieldName) {
  if (!input || input.trim() === '') {
    throw new Error(`${fieldName} is required and cannot be empty`);
  }
  return input.trim();
}

function generateInitials(name) {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('');
}

function formatCSVField(value) {
  // If the value contains commas, wrap it in quotes
  if (value.includes(',') || value.includes('"')) {
    // Escape any existing quotes by doubling them
    const escaped = value.replace(/"/g, '""');
    return `"${escaped}"`;
  }
  return value;
}

async function addTestimonial() {
  console.log('\n🏥 Add New Testimonial to Unifhorce CSV\n');
  console.log('Please provide the following information:\n');

  try {
    // Collect testimonial data
    const name = validateInput(
      await question('Full Name: '),
      'Name'
    );

    const title = validateInput(
      await question('Job Title (e.g., ICU Nurse, Charge Nurse): '),
      'Title'
    );

    const hospital = validateInput(
      await question('Hospital/Facility Name: '),
      'Hospital'
    );

    const locationFrom = validateInput(
      await question('Location in Philippines (e.g., Manila, Cebu): '),
      'Location From'
    );

    const locationTo = validateInput(
      await question('Location in USA (e.g., Los Angeles, Houston): '),
      'Location To'
    );

    const quote = validateInput(
      await question('Testimonial Quote: '),
      'Quote'
    );

    let initials = await question(`Initials (press Enter for auto-generated: ${generateInitials(name)}): `);
    if (!initials.trim()) {
      initials = generateInitials(name);
    } else {
      initials = initials.trim().toUpperCase();
    }

    // Preview the testimonial
    console.log('\n📋 Preview:');
    console.log(`Name: ${name}`);
    console.log(`Title: ${title}`);
    console.log(`Hospital: ${hospital}`);
    console.log(`From: ${locationFrom} to ${locationTo}`);
    console.log(`Quote: "${quote}"`);
    console.log(`Initials: ${initials}`);

    const confirm = await question('\n✅ Add this testimonial? (y/N): ');
    
    if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
      console.log('❌ Testimonial not added.');
      return;
    }

    // Format CSV line
    const csvLine = [
      formatCSVField(name),
      formatCSVField(title),
      formatCSVField(hospital),
      formatCSVField(locationFrom),
      formatCSVField(locationTo),
      formatCSVField(quote),
      formatCSVField(initials)
    ].join(',');

    // Append to CSV file
    fs.appendFileSync(CSV_PATH, '\n' + csvLine, 'utf8');
    
    console.log('\n🎉 Testimonial successfully added to CSV!');
    console.log(`📁 File: ${CSV_PATH}`);
    console.log('\n💡 Tip: Refresh your website to see the new testimonial.');

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
  } finally {
    rl.close();
  }
}

// Check if CSV file exists
if (!fs.existsSync(CSV_PATH)) {
  console.error(`❌ CSV file not found at: ${CSV_PATH}`);
  console.error('Make sure you\'re running this script from the project root directory.');
  process.exit(1);
}

// Run the script
addTestimonial().catch((error) => {
  console.error(`❌ Unexpected error: ${error.message}`);
  process.exit(1);
});