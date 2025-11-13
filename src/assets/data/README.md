# Testimonials CSV Maintenance Guide

## Overview
The testimonials section now uses a CSV file for easy maintenance. This allows non-technical team members to add, edit, or remove testimonials without touching code.

## CSV File Location
```
src/assets/data/testimonials.csv
```

## CSV Format
The CSV file contains the following columns:

| Column | Description | Example |
|--------|-------------|---------|
| `name` | Full name of the person | Maria Santos |
| `title` | Job title/position | ICU Nurse |
| `hospital` | Hospital or healthcare facility name | Cedars-Sinai Medical Center |
| `location_from` | City/region they came from in Philippines | Manila |
| `location_to` | City/state they moved to in USA | Los Angeles |
| `quote` | Their testimonial quote (use quotes if contains commas) | "Unifhorce helped me navigate..." |
| `initials` | 2-3 letter initials for display | MS |

## Adding New Testimonials

### Method 1: Edit CSV Directly
1. Open `src/assets/data/testimonials.csv`
2. Add a new line at the end with comma-separated values
3. If the quote contains commas, wrap it in double quotes
4. Save the file

### Method 2: Using Excel/Google Sheets
1. Open the CSV file in Excel or Google Sheets
2. Add new rows with testimonial data
3. Save as CSV format
4. Ensure the file is saved back to `src/assets/data/testimonials.csv`

## Example CSV Entry
```csv
Carlos Mendoza,Emergency Room Nurse,Mayo Clinic,Iloilo,Rochester,"The immigration support was invaluable. Unifhorce connected me with legal experts who helped streamline my visa process. Now I'm working at one of the world's top hospitals.",CM
```

## Important Notes

### Quotes and Special Characters
- If a quote contains commas, wrap the entire quote in double quotes
- If a quote contains double quotes, escape them with double quotes (`""`)
- Keep quotes under 200 characters for best display

### Initials
- Use 2-3 characters (usually first and last name initials)
- Make sure initials are unique for each person
- Use uppercase letters

### Location Format
- Use city names for consistency
- For Philippines: Manila, Cebu, Davao, Baguio, etc.
- For USA: Los Angeles, Houston, New York, etc.

### Hospital Names
- Use official hospital names
- Include "Medical Center", "Hospital", "Clinic" as appropriate
- Keep names reasonably short for display purposes

## Validation Rules
The system automatically validates that:
- All required fields are present
- Names are not empty
- Quotes are not empty
- Initials are provided

## Testing Changes
After making changes to the CSV:
1. Save the file
2. Refresh the website
3. Navigate to the testimonials section
4. Verify the new testimonials appear correctly

## Error Handling
If there are issues with the CSV format:
- Check the browser developer console for errors
- Ensure all rows have the same number of columns
- Verify quotes are properly escaped
- Make sure there are no empty lines in the middle of the file

## File Management Best Practices

### Backup
- Always keep a backup copy of the CSV before making changes
- Consider using version control for the CSV file

### Organization
- Keep testimonials in a logical order (newest first recommended)
- Remove outdated testimonials periodically
- Maintain a consistent format across all entries

### Content Guidelines
- Ensure all testimonials are genuine and approved
- Keep quotes professional and positive
- Verify all names and locations are accurate
- Get proper consent before adding testimonials

## Future Enhancements
The CSV system can be extended to include:
- Photo URLs for testimonial authors
- Date of testimonial
- Specialty areas (ICU, ER, Pediatrics, etc.)
- Years of experience
- Languages spoken

## Technical Notes
- The CSV is loaded via HTTP request when the page loads
- Data is cached until page refresh
- Changes to the CSV are reflected immediately on page refresh
- The system handles basic CSV parsing including quoted fields
- Loading states and error handling are built-in