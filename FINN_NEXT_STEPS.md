# Finn's Setup Guide: Saint Paul Tennis Club Website

This guide walks you through all the manual setup steps needed to get the Saint Paul Tennis Club website fully working. Follow each section in order.

---

## Table of Contents

1. [Create Your Supabase Account](#1-create-your-supabase-account)
2. [Set Up the Database](#2-set-up-the-database)
3. [Configure Email Settings](#3-configure-email-settings)
4. [Get Your API Keys](#4-get-your-api-keys)
5. [Add Environment Variables to Vercel](#5-add-environment-variables-to-vercel)
6. [Test Everything Works](#6-test-everything-works)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Create Your Supabase Account

Supabase is where all the website's data is stored (members, reservations, events, etc.) and handles user login/registration.

### Steps:

1. Go to [supabase.com](https://supabase.com)

2. Click the **"Start your project"** button (it's green, in the top right)

3. Sign up using your GitHub account or email
   - If using email, you'll need to verify it before continuing

4. Once logged in, click **"New Project"**

5. Fill in the project details:
   - **Name:** `saint-paul-tennis` (or whatever you prefer)
   - **Database Password:** Create a strong password

   **IMPORTANT: Write down this password somewhere safe! You may need it later.**

   - **Region:** Select **"East US (North Virginia)"** - this is closest to Minnesota
   - **Pricing Plan:** Free tier is fine to start

6. Click **"Create new project"**

7. Wait 1-2 minutes while Supabase sets everything up. You'll see a loading screen.

---

## 2. Set Up the Database

Now we need to create all the database tables that store member info, reservations, events, etc.

### Steps:

1. In your Supabase project dashboard, look at the left sidebar

2. Click on **"SQL Editor"** (it has an icon that looks like a document with code)

3. You should see a blank editor area. This is where you'll paste the database setup code.

4. Open the file `supabase/schema.sql` from the website project
   - This file is in the project folder on the computer
   - You can open it with any text editor (TextEdit, Notepad, VS Code, etc.)

5. **Select ALL** the text in that file (use Ctrl+A on Windows or Cmd+A on Mac)

6. **Copy** it (Ctrl+C or Cmd+C)

7. Go back to the Supabase SQL Editor in your browser

8. **Paste** the code into the editor (Ctrl+V or Cmd+V)

9. Click the green **"Run"** button (or press Ctrl+Enter / Cmd+Enter)

10. Wait for it to complete. You should see a message like "Success. No rows returned."

### Verify it worked:

1. In the left sidebar, click on **"Table Editor"**

2. You should see a list of tables including:
   - profiles
   - households
   - events
   - reservations
   - ...and more

If you see these tables, the database is set up correctly!

---

## 3. Configure Email Settings

The website sends emails for:
- Confirming new user registrations
- Password reset requests

We need to configure these.

### Steps:

1. In the left sidebar, click on **"Authentication"**

2. Click on **"Email Templates"** (in the submenu or tabs)

3. You'll see different email types. For each one, you can customize:
   - **Subject line** - What users see in their inbox
   - **Message content** - The actual email body

4. For now, the defaults are fine. But you may want to:
   - Change "Supabase" to "Saint Paul Tennis Club" in the templates
   - Update the from name/email if you have a custom domain

### Configure the Site URL:

1. Still in Authentication, click on **"URL Configuration"** (or it might be under Settings)

2. Set the **Site URL** to your Vercel deployment URL:
   - Example: `https://saint-paul-tennis.vercel.app`
   - Or your custom domain if you have one

3. In **Redirect URLs**, add:
   - `https://your-site.vercel.app/auth/callback`
   - `https://your-site.vercel.app/auth/reset-password`

   (Replace `your-site.vercel.app` with your actual domain)

4. Click **"Save"**

---

## 4. Get Your API Keys

The website needs two pieces of information to connect to Supabase. Let's find them.

### Steps:

1. In the left sidebar, click on **"Project Settings"** (the gear icon at the bottom)

2. Click on **"API"** in the settings menu

3. You'll see a section called **"Project URL"**
   - Copy this URL. It looks like: `https://abcdefgh.supabase.co`
   - Save it somewhere - you'll need it in the next step

4. Below that, find **"Project API keys"**

5. Look for the key labeled **"anon public"**
   - Click the copy button next to it
   - Save it somewhere - you'll need it in the next step

   **Note:** This key is safe to use in the browser. There's also a "service_role" key - DO NOT share that one publicly.

---

## 5. Add Environment Variables to Vercel

Vercel is where the website is hosted. We need to tell Vercel how to connect to Supabase.

### Steps:

1. Go to [vercel.com](https://vercel.com) and log in

2. Find your Saint Paul Tennis project and click on it

3. Click on **"Settings"** (in the top navigation bar)

4. In the left sidebar, click on **"Environment Variables"**

5. Add the first variable:
   - **Key:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** Paste the Project URL you copied earlier
   - Make sure all environments are checked (Production, Preview, Development)
   - Click **"Save"**

6. Add the second variable:
   - **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** Paste the anon public key you copied earlier
   - Make sure all environments are checked
   - Click **"Save"**

### Redeploy to Apply Changes:

1. Go to the **"Deployments"** tab

2. Find the most recent deployment

3. Click the three dots menu (**...**) on the right side

4. Click **"Redeploy"**

5. In the popup, click **"Redeploy"** again

6. Wait for the deployment to complete (usually 1-2 minutes)

---

## 6. Test Everything Works

Let's verify the setup is complete.

### Test User Registration:

1. Go to your website: `https://your-site.vercel.app`

2. Click **"Login"** or navigate to `/auth/register`

3. Fill out the registration form with a test email

4. Click **"Register"**

5. Check your email for a confirmation message

6. Click the confirmation link in the email

7. You should be redirected to the member portal

### Test User Login:

1. Log out (if you're logged in)

2. Go to the login page

3. Enter the email and password you registered with

4. Click **"Login"**

5. You should be taken to the member portal

### Test Password Reset:

1. Go to the login page

2. Click **"Forgot Password"**

3. Enter your email

4. Check your email for a password reset link

5. Click the link and set a new password

---

## 7. Troubleshooting

### "Invalid API Key" or "Failed to connect to Supabase"

- Double-check the environment variables in Vercel
- Make sure there are no extra spaces before/after the values
- Make sure you copied the **anon public** key, not the service role key
- Try redeploying after making changes

### Emails not arriving

- Check your spam/junk folder
- In Supabase, go to Authentication > Email Templates and verify they're set up
- Make sure the Site URL is correct in Supabase settings
- Note: On the free tier, Supabase limits emails to 4 per hour

### "User not found" after registration

- The confirmation email might not have been received or clicked
- In Supabase, go to Authentication > Users to see all registered users
- You can manually confirm a user there if needed

### Database tables missing

- Re-run the SQL script in the SQL Editor
- Make sure you copied ALL the text from `supabase/schema.sql`
- Check for any error messages after running the script

### Login works but member portal shows nothing

- The user might not be linked to a household
- In Supabase Table Editor, check the `profiles` table for the user
- You may need to manually add household data for testing

---

## Quick Reference: What We Set Up

| Service | What It Does | Dashboard URL |
|---------|--------------|---------------|
| Supabase | Database + User Login | [supabase.com/dashboard](https://supabase.com/dashboard) |
| Vercel | Website Hosting | [vercel.com/dashboard](https://vercel.com/dashboard) |

### Environment Variables Added to Vercel:

| Variable Name | Where to Find It |
|---------------|------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase > Settings > API > Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase > Settings > API > anon public key |

---

## Need Help?

If you run into issues:

1. Check the Troubleshooting section above
2. In Supabase, check the "Logs" section in the left sidebar for error details
3. In Vercel, check the "Logs" tab for your deployment

---

*Last updated: December 2024*
