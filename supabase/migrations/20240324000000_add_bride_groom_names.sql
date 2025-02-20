-- Add bride_name and groom_name columns to wedding_info table
ALTER TABLE wedding_info
ADD COLUMN bride_name text,
ADD COLUMN groom_name text; 