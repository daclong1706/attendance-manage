# 📷 Face & QR Code Attendance System

## 🔍 Giới thiệu

Hệ thống điểm danh thông minh sử dụng **nhận diện khuôn mặt** và/hoặc **mã QR** để xác minh danh tính sinh viên. Dự án này được phát triển với mục tiêu giảm thiểu gian lận điểm danh, tiết kiệm thời gian cho giáo viên và tăng tính chính xác.

- Backend: Flask + Deep Learning (DeepFace, MTCNN, Retina Face, TensorFlow)
- Frontend: React
- Database: MySQL

## 🚀 Demo

🔗 [Xem demo tại đây](https://attendance-manage.vercel.app/)

### 🧑‍💻 Tài khoản mẫu

- **Admin**

  - Email: `admin@example.com`
  - Password: `admin123`

- **Teacher**

  - Email: `teacher1@example.com`
  - Password: `teacher123`

- **Student**
  - Email: `student1@example.com`
  - Password: `student123`

## 🎯 Tính năng chính

- Đăng nhập / Đăng ký người dùng
- Quản lý lớp học và buổi học
- Nhập dữ liệu lớp học bằng file Excel
- Điểm danh bằng **khuôn mặt (Face Recognition)**
- Điểm danh bằng **mã QR cá nhân**
- Ghi lịch sử điểm danh
- Giao diện RESTful API thân thiện với frontend

---

## 🧰 Công nghệ sử dụng

| Loại             | Công nghệ                                            |
| ---------------- | ---------------------------------------------------- |
| Backend          | Flask, Flask-JWT-Extended, Flask-Migrate, Flask-CORS |
| Face Recognition | DeepFace, MTCNN, OpenCV, Retina Face, TensorFlow     |
| QR Code          | qrcode, Pillow                                       |
| Database         | MySQL                                                |
| API Security     | JWT                                                  |
| Frontend         | React, Axios, TypeScrip                              |

## 🛠️ Cài đặt dự án

### 📦 Clone source code

```bash
git clone https://github.com/daclong1706/attendance-system.git
cd attendance-system
```

### 🐍 Tạo môi trường ảo & cài thư viện của Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # hoặc .\venv\Scripts\activate trên Windows
pip install -r requirements.txt
```

<!-- ```bash
cd backend/app/Model
pip install -r requirements.txt
``` -->

### Tạo database attendance_system từ MYSQL

```bash
CREATE DATABASE attendance_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE attendance_system;
```

### Thiết lập biến môi trường .env trong Backend

```bash
DB_USER = "root"
DB_PASSWORD = ""
DB_NAME = "attendance_system"
JWT_SECRET_KEY = your-secret-key
```

### Khởi tạo serve Flask

```bash
#Lưu ý kích hoạt mysql trước khi sử dụng
cd backend
flask db init
flask db migrate -m "Initial"
flask db upgrade
```

### Seed dữ liệu ban đầu (nếu muốn)

```bash
cd backend
python seed_data.py
```

### Đăng ký khuôn mặt nhận diện (nếu cần)

- Chạy file register_user.py để đăng ký khuôn mặt

```bash
cd backend/app/Model/scripts
python register_user.py
```

### Chạy server backend

```bash
cd backend
python run.py
```

### Cài đặt các package của Frontend và khởi tạo server

```bash
cd frontend
npm install
npm run dev
```

## 📄 Giấy phép

Dự án này được phát hành theo giấy phép [MIT](./LICENSE).

## 📬 Liên hệ

**Người phát triển:** Nguyễn Đắc Long, Võ Trần Tiến, Nguyễn Minh Thành, Bùi Quốc Huy
📧 **Email:**  
🌐 **GitHub:** [https://github.com/daclong1706](https://github.com/daclong1706)

<!-- ## Frontend

npm install
npm run dev

## Backend

pip install -r requirements.txt

flask db init
flask db migrate -m "Initial"
flask db upgrade


## Hướng dẫn chạy code
### B1: Cài đặt các thư viện cần thiết
 pip install -r requirements.txt
### B2: Thực hiện chạy code file register_user.py để tạo ra học sinh mới. Với mội học sinh mới cần cung cấp 5 tấm hình. Các tấm hình này sẽ được chuyển sang file numpy và bị xóa đi.
### B3: Thực hiện chạy file mark_attendance.py để điểm danh. Người điểm danh sẽ chụp 1 tấm ảnh và code sẽ so sánh độ tương đồng với các embedding đang có trong database. Nếu điểm danh thành công thông tin của học sinh sẽ được lưu vào file attendance.csv	 -->
