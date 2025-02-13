# Supabase Migration Flows Documentation

This document outlines the typical workflows for managing and running database migrations with Supabase. It includes instructions for both local development and production environments, as well as guidance for resolving discrepancies between local migration files and the remote migration history.

---

## 1. Local Development Migrations

**Command:** `supabase db push`

- **Purpose:**  
  Applies all pending migration files located in the `supabase/migrations` directory to your local Supabase instance.
- **Usage:**  
  Ensure you are in your project's root directory. Then run:
  ```bash
  supabase db push
  ```
- **Details:**
  - Scans for new or unapplied migration files.
  - Brings your local database schema up to date.
  - Useful for iterative development and testing locally.

---

## 2. Production Deployment Migrations

**Command:** `supabase db migrate deploy`

- **Purpose:**  
  Applies pending migrations to your production (or staging) database.
- **Usage:**  
  When you are ready to deploy your changes, execute:
  ```bash
  supabase db migrate deploy
  ```
- **Details:**
  - Ensures that all migrations are executed in the proper order.
  - Keeps your remote database schema consistent with your local development environment.
  - Best applied once migrations have been thoroughly tested locally.

---

## 3. Synchronizing Migration History

**Command:** `supabase db pull`

- **Purpose:**  
  Synchronizes the remote database's migration history with your local repository.
- **Usage:**  
  Run the following command while in your project's root:
  ```bash
  supabase db pull
  ```
- **Details:**
  - Downloads the remote migration history.
  - Helps identify any discrepancies between what's applied remotely and your local migration files.
  - Useful after working with multiple branches or collaborators.

---

## 4. Handling Migration Mismatches

During the migration process, you might encounter warnings such as:

Remote migration versions not found in local migrations directory: <migration_version>
