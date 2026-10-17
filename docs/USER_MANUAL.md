# User Manual — Clínica Vida Sana

Practical guide for **patients** and **administrators**.

---

## 1. Requirements and access

- A modern browser (Chrome, Edge, Firefox or Safari).
- No installation or data server required.
- Open `index.html` (or the URL where the site is published).

> **Important:** data is stored in the browser and device you use. To view it on another
> computer or browser you must **restore a backup** (see section 7).

---

## 2. Change language

1. In the header you'll see the **ES / EN / IT** buttons.
2. Click the language you want; the page reloads in that language.
3. Your choice is remembered for future visits.

Available languages: **Español**, **English**, **Italiano**.

---

## 3. Navigation

The top menu links to: **Home · Specialties · Doctors · Book appointment · My appointment ·
Contact**. On mobile, use the menu button (☰).

Many cards are interactive:
- **Specialty** cards (e.g. *Cardiology*) take you to the doctors in that area.
- **"Why choose us?"** cards take you to the matching section (Booking in minutes → Book
  appointment, Digital records → My appointment, etc.).

---

## 4. Find doctors by specialty

1. Go to **Specialties**, or use the featured cards on the home page.
2. Click a specialty (e.g. **Cardiology**).
3. You'll see the list of doctors in that specialty, with their license and years of
   experience.
4. A notice at the top says "Showing doctors in …" with the **View all doctors** link.
5. Click a doctor (or their **Book appointment** button) to book with them.

If a specialty has no doctors yet, a message is shown with a link to view all doctors.

---

## 5. Book an appointment

1. Go to **Book appointment**.
2. Fill in the required fields: **Full name**, **Identity document**, **Specialty** and
   **Date**.
3. Optionally choose **Doctor**, **Time**, **Email**, **Phone** and **Reason**.
   - Selecting a doctor shows their schedule; already-taken times do not appear.
4. Click **Confirm appointment**.
5. You'll see a confirmation message with date and time. Keep your **document**: you'll need
   it to manage the appointment in **My appointment**.

> If you arrive from a specialty card or a doctor's button, those details are pre-selected.

---

## 6. Manage my appointment (reschedule or cancel)

1. Go to **My appointment**.
2. Enter your **identity document** and click **Find my appointments**.
3. Your appointments appear. Depending on status:
   - **Reschedule:** change doctor, date and/or time (only available times are offered) and
     click **Save changes**.
   - **Cancel:** click **Cancel** and confirm. The appointment becomes *Cancelled* and frees
     the slot.
4. Cancelled appointments are shown for information only.

> To reschedule, pick a date/time when the doctor is available. Otherwise the system will show
> the available days.

---

## 7. Contact

In **Contact** you'll find address, phones and emails, plus a message form. Fill in the fields
and click **Send message** (in this demo a confirmation is shown on screen).

---

## 8. Administration panel

Access: the **Administrator access** link (footer) or `admin.html`.

### 8.1 Sign in
- Username: **admin**
- Password: **admin123** *(demo)*

### 8.2 Appointment Management (tab "Appointments / Visits")
- **Search** by patient, specialty or doctor, and **filter** by status.
- **+ New appointment:** create an appointment manually.
- **Edit / Delete** in the actions column.

Appointment fields: patient, document, phone, specialty, doctor, date, time, status and
reason. If you pick a doctor, only valid times and working days are allowed.

### 8.3 Doctor Management (tab "Doctors")
- **+ New doctor** / **Edit** / **Delete**.
- Data: name, specialty, license, years of experience, phone, email, **working days**,
  start/end time and duration of each appointment.
- Start time must be earlier than end time and you must select at least one day.

### 8.4 Log out
Click **Log out** in the top bar.

---

## 9. Backup and restore (disaster recovery)

On the **Backup** tab:

- **Export CSV:**
  - *Doctors* → downloads `respaldo-medicos-YYYY-MM-DD.csv`.
  - *Appointments* → downloads `respaldo-turnos-YYYY-MM-DD.csv`.
  - The files open in Excel / spreadsheets.
- **Import CSV:**
  1. Click **Import CSV** and choose the file.
  2. The system validates the content and asks for **confirmation**.
  3. On confirmation, it **replaces** the current data with the file's data.

> **Recommendation:** export a backup before importing. Import is meant to recover the system
> after data loss (cleared browser, new device, etc.). CSV headers are technical, so they work
> in any language.

---

## 10. FAQ

**I can't see my appointments.**
Check that you typed the correct document and that you're on the same browser/device where you
created them. If you changed device, restore a backup.

**Why doesn't the time I want appear?**
It may be taken, outside the doctor's schedule, or on a day they don't work. The system shows
the valid options.

**Is the data shared across devices?**
No. This version stores everything locally in your browser.

**How do I move data to another device?**
Export the CSVs on the source device and import them on the destination.

**I forgot the admin password.**
In this demo it's `admin123`; in production it would be managed by a backend with real
security.

---

## 11. Notes on language and data

- You can switch languages at any time with **ES / EN / IT**.
- Even if the interface language changes, your data (names, specialties, dates) stays intact.
