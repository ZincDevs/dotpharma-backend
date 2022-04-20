import 'regenerator-runtime';

import {
  createUserTable,
  CreatePatientTable,
  createDoctorTable,
  createPharmaciesTable,
  createMedicinesTable,
  createOrdersTable,
  createAppointmentTable,
  createMedicinePharmacyTable,
  createHealthTipsTable,
  dropUserTable,
  dropPatientsTable,
  dropDoctorsTable,
  dropMedicinesTable,
  dropPharmaciesTable,
  dropOrdersTbale,
  dropAppointmentsTable,
  dropMedicinePharmacieTable,
  dropHealthTable,
} from '../queries/tables';

export default {
  tables: {
    create: {
      all: [
        { query: createUserTable, name: 'User' },
        { query: CreatePatientTable, name: 'Patient' },
        { query: createDoctorTable, name: 'Doctor' },
        { query: createPharmaciesTable, name: 'Pharmacies' },
        { query: createMedicinesTable, name: 'Medicines' },
        { query: createOrdersTable, name: 'Orders' },
        { query: createAppointmentTable, name: 'Appointment' },
        { query: createMedicinePharmacyTable, name: 'MedicinePharmacy' },
        { query: createHealthTipsTable, name: 'HealthTips' },
      ],
    },
    drop: {
      all: [
        { query: dropHealthTable, name: 'HealthTips' },
        { query: dropMedicinePharmacieTable, name: 'MedicinePharmacie' },
        { query: dropAppointmentsTable, name: 'Appointments' },
        { query: dropOrdersTbale, name: 'Orders' },
        { query: dropMedicinesTable, name: 'Medicines' },
        { query: dropPharmaciesTable, name: 'Pharmacies' },
        { query: dropDoctorsTable, name: 'Doctors' },
        { query: dropPatientsTable, name: 'Patients' },
        { query: dropUserTable, name: 'User' },
      ],
    },
  },
};
