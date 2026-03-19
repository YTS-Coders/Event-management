# Test Dummy Data & Credentials

Use the following accounts to test the different role-based dashboards in the application.

## 🔑 User Accounts

| Role | Email | Password | Department |
| :--- | :--- | :--- | :--- |
| **ADMIN** | `admin@college.edu` | `admin123` | ALL |
| **HOD** | `hod_cs@college.edu` | `password123` | Computer Science |
| **LEADER** | `leader_cs@college.edu` | `password123` | Computer Science |

---

## 📅 Seeded Events

1. **Cyber Security Workshop** (Status: `APPROVED`)
   - **Type**: Publicly visible on Landing Page.
   - **Fee**: ₹200
   - **Seeded Participants**: 2 (1 Approved, 1 Pending).

2. **Inter-College Hackathon** (Status: `PENDING`)
   - **Type**: Visible only in Admin "Pending Approvals" and HOD Dashboard.
   - **Fee**: ₹500

3. **Cloud Computing Seminar** (Status: `COMPLETED`)
   - **Type**: Past event, visible in HOD "My Events" history.

---

## 👥 Seeded Participants (for CS Workshop)

| Name | Roll No | Payment Status |
| :--- | :--- | :--- |
| **Bob Martin** | `CSW001` | ✅ APPROVED |
| **Charlie Brown** | `CSW002` | ⏳ PENDING (Verify in Leader Dashboard) |

---

> [!TIP]
> You can re-run the seeding script anytime by running `node seedData.js` in the `backend` directory.
