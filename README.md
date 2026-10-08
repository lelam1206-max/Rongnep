# Rồng & Nếp — Bảng thói quen mỗi ngày 🌱

Web app theo dõi và đánh giá thói quen mỗi ngày cho hai bé Rồng và Nếp,
thuộc dự án dài hạn **“Rồng & Nếp đi du học”** của gia đình.

> “Kỷ luật là sức mạnh. Mỗi ngày tốt hơn chính mình của hôm qua một chút.”

## Tính năng

- **Trang chủ**: tinh thần dự án + thẻ của Rồng/Nếp với vòng tiến độ hôm nay và chuỗi ngày duy trì.
- **Bảng từng bé**: checklist 10 nhiệm vụ, thanh tiến độ, lời khích lệ tích cực mỗi khi tick (không trách phạt).
- **Nhật ký cuối ngày**: 3 câu hỏi nhìn lại + 1 điều biết ơn, lưu theo từng ngày.
- **Tổng quan tuần**: 7 ngày gần nhất, tỉ lệ hoàn thành của mỗi bé.
- **7 nguyên tắc vàng** + lời nhắn của mẹ.
- Dữ liệu lưu trên trình duyệt bằng `localStorage` (prefix `rongnep_v1`), theo từng bé + từng ngày. Không cần tài khoản, không backend.

## Chạy thử

```bash
npm install
npm run dev      # mở http://localhost:5173
```

## Build & deploy Vercel

```bash
npm run build    # kiểm tra build thành công, output vào dist/
```

Deploy: tạo project **rongnep** trên Vercel, import repo này, Vercel tự nhận diện
Vite (build command `npm run build`, output `dist/`). App dùng hash-router
(`#/...`) nên chạy tốt dưới dạng SPA tĩnh, không cần cấu hình thêm.

## Cấu trúc dữ liệu (localStorage)

- `rongnep_v1:tasks:{rong|nep}:{YYYY-MM-DD}` → mảng boolean 10 nhiệm vụ
- `rongnep_v1:journal:{rong|nep}:{YYYY-MM-DD}` → `{ good, notGood, tomorrow, gratitude }`

“Ngày tốt” (để tính chuỗi ngày duy trì) = hoàn thành từ 8/10 nhiệm vụ trở lên.
