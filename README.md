# 🚀 TaskFlow Manager

TaskFlow Manager adalah aplikasi manajemen tugas (To-Do List) yang dibangun menggunakan **React + TypeScript**. Aplikasi ini berjalan sepenuhnya secara offline dengan menggunakan **LocalStorage** sebagai penyimpanan data dan **Axios Mock Adapter** untuk mensimulasikan REST API.

---

# 🛠️ Tech Stack

* React (Vite)
* TypeScript
* Tailwind CSS
* Zustand
* TanStack Query (React Query)
* Axios
* Axios Mock Adapter
* React Hook Form
* Zod
* LocalStorage

---

# ✨ Fitur

### Authentication

* Login dengan hardcoded credentials
* Session persistence menggunakan Zustand Persist
* Private Route

### Task Management

* Create Task
* Read Task
* Update Task
* Delete Task

### Search & Filter

* Search task berdasarkan judul
* Filter All
* Filter Active
* Filter Completed

### User Experience

* Loading state
* Error handling
* Toast notification

---

# 🔑 Login

**Username**

```text
admin
```

**Password**

```text
123456
```

---

# ▶️ Cara Menjalankan Aplikasi

1. Clone repository

```bash
git clone <repository-url>
```

2. Masuk ke folder project

```bash
cd taskflow-manager
```

3. Install seluruh dependency

```bash
npm install
```

4. Jalankan aplikasi

```bash
npm run dev
```

5. Buka browser

```text
http://localhost:5173
```

---

# 📁 Struktur Folder

```text
src
├── api
│   ├── authApi.ts
│   ├── taskApi.ts
│   └── mockApi.ts
│
├── components
│   ├── auth
│   └── task
│
├── hooks
│
├── lib
│   └── axios.ts
│
├── pages
│
├── routes
│
├── schema
│
├── store
│
├── types
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# 🏗️ Arsitektur Aplikasi

```text
Component
      │
      ▼
Custom Hooks
      │
      ▼
React Query
      │
      ▼
Axios
      │
      ▼
Axios Mock Adapter
      │
      ▼
LocalStorage
```

Pemisahan ini dilakukan agar komponen hanya berfokus pada tampilan (UI), sedangkan proses pengambilan dan manipulasi data berada pada layer yang terpisah sehingga lebih mudah untuk dikembangkan maupun diintegrasikan dengan backend di kemudian hari.

---

# 📌 Asumsi

* Aplikasi berjalan sepenuhnya secara offline.
* LocalStorage digunakan sebagai pengganti database.
* Axios Mock Adapter digunakan untuk mensimulasikan REST API.
* Kredensial login dibuat secara hardcoded sesuai kebutuhan take-home test.

---

# ⚠️ Tantangan yang Dihadapi

Selama mengerjakan proyek ini, tantangan terbesar adalah beradaptasi dengan beberapa teknologi yang sebelumnya belum sering saya gunakan.

Saya lebih terbiasa mengembangkan aplikasi menggunakan **Next.js**, sehingga pada awal pengerjaan saya perlu menyesuaikan kembali dengan struktur proyek React menggunakan Vite.

Selain itu, saya juga belum memiliki banyak pengalaman menggunakan **Zustand** sebagai state management dan **Axios Mock Adapter** untuk mensimulasikan API. Memahami cara memisahkan layer antara komponen, state management, dan mock API menjadi proses belajar yang cukup menantang.

Meskipun demikian, melalui pengerjaan proyek ini saya dapat memahami alur penggunaan Zustand untuk global state, React Query untuk pengelolaan data asynchronous, serta bagaimana Axios Mock Adapter dapat digunakan untuk mensimulasikan backend secara offline dengan struktur yang menyerupai implementasi pada aplikasi nyata.

---

# 📄 Catatan

Project ini dibuat sebagai bagian dari Frontend Developer Take-Home Test dengan fokus pada clean architecture, pemisahan tanggung jawab antar layer, serta implementasi pengelolaan state dan data asynchronous menggunakan React ecosystem.
