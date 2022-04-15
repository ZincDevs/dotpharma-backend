export const createUserTable = `CREATE TABLE IF NOT EXISTS users
(
    u_id text COLLATE pg_catalog."default" NOT NULL,
    u_email text COLLATE pg_catalog."default",
    u_password text COLLATE pg_catalog."default",
    u_role text COLLATE pg_catalog."default",
    doneon text COLLATE pg_catalog."default",
    status text COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (u_id)
)`;
export const CreatePatientTable = `CREATE TABLE IF NOT EXISTS patients
(
    p_id text COLLATE pg_catalog."default" NOT NULL,
    p_name text COLLATE pg_catalog."default",
    p_email text COLLATE pg_catalog."default",
    p_phonenumber text COLLATE pg_catalog."default",
    p_address text COLLATE pg_catalog."default",
    p_country text COLLATE pg_catalog."default",
    p_town text COLLATE pg_catalog."default",
    p_district text COLLATE pg_catalog."default",
    p_streetnumber text COLLATE pg_catalog."default",
    p_national_id text COLLATE pg_catalog."default",
    user_ref text  COLLATE pg_catalog."default" NOT NULL,
    doneon text COLLATE pg_catalog."default",
    CONSTRAINT patient_pkey PRIMARY KEY (p_id),
    CONSTRAINT user_fk FOREIGN KEY (user_ref)
        REFERENCES users (u_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)`;
export const createDoctorTable = `CREATE TABLE IF NOT EXISTS doctors
(
    do_id text COLLATE pg_catalog."default" NOT NULL,
    d_name text COLLATE pg_catalog."default",
    d_email text COLLATE pg_catalog."default",
    d_phone text COLLATE pg_catalog."default",
    d_speciality text COLLATE pg_catalog."default",
    d_clinic text COLLATE pg_catalog."default",
    d_image text COLLATE pg_catalog."default",
    d_status text COLLATE pg_catalog."default",
    d_doneon text COLLATE pg_catalog."default",
    user_id text COLLATE pg_catalog."default",
    user_ref text COLLATE pg_catalog."default",
    CONSTRAINT doctors_pkey PRIMARY KEY (do_id),
    CONSTRAINT user_fk FOREIGN KEY (user_id)
        REFERENCES users (u_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT user_foreign_key FOREIGN KEY (user_ref)
        REFERENCES users (u_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)`;
export const createPharmaciesTable = `CREATE TABLE IF NOT EXISTS pharmacies
(
    ph_id text COLLATE pg_catalog."default" NOT NULL,
    ph_name text COLLATE pg_catalog."default",
    ph_email text COLLATE pg_catalog."default",
    ph_phone text COLLATE pg_catalog."default",
    ph_website text COLLATE pg_catalog."default",
    ph_address text COLLATE pg_catalog."default",
    ph_status text COLLATE pg_catalog."default",
    done_on text COLLATE pg_catalog."default",
    user_id text COLLATE pg_catalog."default",
    CONSTRAINT pharmacies_pkey PRIMARY KEY (ph_id),
    CONSTRAINT user_fk FOREIGN KEY (user_id)
        REFERENCES users (u_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)`;
export const createMedicinesTable = `CREATE TABLE IF NOT EXISTS medicines
(
    m_id text COLLATE pg_catalog."default" NOT NULL,
    m_name text COLLATE pg_catalog."default",
    m_properties text COLLATE pg_catalog."default",
    m_desciption text COLLATE pg_catalog."default",
    m_image text COLLATE pg_catalog."default",
    m_price text COLLATE pg_catalog."default",
    m_status text COLLATE pg_catalog."default",
    m_type text COLLATE pg_catalog."default",
    m_doneon text COLLATE pg_catalog."default",
    u_id text COLLATE pg_catalog."default",
    CONSTRAINT medicines_pkey PRIMARY KEY (m_id),
    CONSTRAINT user_fk FOREIGN KEY (u_id)
        REFERENCES users (u_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)`;
export const createOrdersTable = `CREATE TABLE IF NOT EXISTS orders
(
    o_id text COLLATE pg_catalog."default" NOT NULL,
    patient_id text COLLATE pg_catalog."default",
    o_pharmacy text COLLATE pg_catalog."default",
    o_medicine text COLLATE pg_catalog."default",
    o_prescription text COLLATE pg_catalog."default",
    o_date text COLLATE pg_catalog."default",
    o_status text COLLATE pg_catalog."default",
    CONSTRAINT orders_pkey PRIMARY KEY (o_id),
    CONSTRAINT patient_fk FOREIGN KEY (patient_id)
        REFERENCES patients (p_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT pharmacy_fk FOREIGN KEY (o_pharmacy)
        REFERENCES pharmacies (ph_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)`;
export const createAppointmentTable = `CREATE TABLE IF NOT EXISTS appointments
(
    a_id text COLLATE pg_catalog."default" NOT NULL,
    patient_id text COLLATE pg_catalog."default",
    doctor_id text COLLATE pg_catalog."default",
    a_desease text COLLATE pg_catalog."default",
    a_date text COLLATE pg_catalog."default",
    a_status text COLLATE pg_catalog."default",
    CONSTRAINT appointments_pkey PRIMARY KEY (a_id),
    CONSTRAINT doctor_fk FOREIGN KEY (doctor_id)
        REFERENCES doctors (do_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT patient_fk FOREIGN KEY (patient_id)
        REFERENCES patients (p_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
`;
export const createMedicinePharmacyTable = `CREATE TABLE IF NOT EXISTS medicines_pharmacies
(
    ph_id text COLLATE pg_catalog."default",
    m_id text COLLATE pg_catalog."default",
    CONSTRAINT m_foreign FOREIGN KEY (m_id)
        REFERENCES medicines (m_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)`;

export const createHealthTipsTable = `CREATE TABLE IF NOT EXISTS healthtips
(
    h_id text COLLATE pg_catalog."default" NOT NULL,
    h_title text COLLATE pg_catalog."default",
    h_image text COLLATE pg_catalog."default",
    h_description text COLLATE pg_catalog."default",
    h_category text COLLATE pg_catalog."default",
    h_doneon text COLLATE pg_catalog."default",
    u_id text COLLATE pg_catalog."default",
    CONSTRAINT healthtips_pkey PRIMARY KEY (h_id),
    CONSTRAINT user_fk FOREIGN KEY (u_id)
        REFERENCES users (u_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)`;

// query to drop tables
export const dropUserTable = 'DROP TABLE IF EXISTS users CASCADE';
export const dropPatientsTable = 'DROP TABLE IF EXISTS patients CASCADE';
export const dropDoctorsTable = 'DROP TABLE IF EXISTS doctors CASCADE';
export const dropMedicinesTable = 'DROP TABLE IF EXISTS medicines CASCADE';
export const dropPharmaciesTable = 'DROP TABLE IF EXISTS pharmacies CASCADE';
export const dropOrdersTbale = 'DROP TABLE IF EXISTS orders CASCADE';
export const dropAppointmentsTable = 'DROP TABLE IF EXISTS appointments CASCADE';
export const dropMedicinePharmacieTable = 'DROP TABLE IF EXISTS medicines_pharmacies CASCADE';
export const dropHealthTable = 'DROP TABLE IF EXISTS healthtips CASCADE';
