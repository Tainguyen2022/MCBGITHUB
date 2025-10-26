import pg from 'pg';

const { Pool } = pg;

// =================================================================
//  ✅ CẤU HÌNH KẾT NỐI AN TOÀN CHO CLOUD RUN ✅
// =================================================================
// Thông tin đăng nhập đã được xóa khỏi code để đảm bảo an toàn.
// Trong môi trường Cloud Run, bạn cần thiết lập biến môi trường tên là DATABASE_URL.
//
// Định dạng:
// postgres://<USER>:<PASSWORD>@/<DATABASE_NAME>?host=/cloudsql/<PROJECT_ID>:<REGION>:<INSTANCE_ID>
//
// Ví dụ thực tế dựa trên thông tin bạn cung cấp:
// postgres://<your_user>:<your_password>@/toeic_grammar_ace?host=/cloudsql/toeic-grammar-ace:asia-southeast1:toeic-grammar-db
//
// ⚠️ LƯU Ý: Mật khẩu nên được lưu trong Google Secret Manager và tham chiếu vào biến môi trường.
// =================================================================

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Thư viện 'pg' sẽ tự động xử lý kết nối SSL khi dùng connectionString.
  // Đối với kết nối qua socket trên Cloud Run, SSL không cần thiết.
});


// A simple query to test the connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Lỗi kết nối database. Vui lòng kiểm tra biến môi trường DATABASE_URL.', err.stack);
  } else {
    if (res && res.rows.length > 0) {
        console.log('✅ Kết nối database thành công lúc:', res.rows[0].now);
    } else {
        console.log('✅ Kết nối database thành công!');
    }
  }
});

export default pool;
