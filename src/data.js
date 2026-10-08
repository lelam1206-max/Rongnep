// Dữ liệu tĩnh của app — giữ nguyên nội dung tiếng Việt của gia đình
import { RONG_PHOTO, NEP_PHOTO } from './photos'

export const KIDS = [
  {
    id: 'rong',
    name: 'Rồng',
    emoji: '🐉',
    photo: RONG_PHOTO,
    color: '#F2762E',
    soft: '#FFE8D6',
    deep: '#C2571A',
    tagline: 'Mạnh mẽ · Kiên trì',
    tasks: [
      'Thức dậy lúc 06:00',
      'Đọc Raz-Kids',
      'Vận động 30 phút',
      'Đọc 1 quyển sách',
      'Hoàn thành 1 đề IOE',
      'Hoàn thành tất cả bài tập về nhà',
      'Hoàn thành 1 đề VioEdu',
      'Xem tivi 30 phút',
      'Góc học tập gọn gàng',
      'Đi ngủ lúc 22:00',
    ],
  },
  {
    id: 'nep',
    name: 'Nếp',
    emoji: '🌸',
    photo: NEP_PHOTO,
    color: '#A855F7',
    soft: '#F0E3FF',
    deep: '#7E3AC9',
    tagline: 'Dịu dàng · Tự tin',
    tasks: [
      'Thức dậy lúc 06:00',
      'Vận động 30 phút',
      'Đọc 1 quyển sách',
      'Hoàn thành 1 đề IOE',
      'Đọc Raz-Kids',
      'Hoàn thành tất cả bài tập về nhà',
      'Hoàn thành 1 đề VioEdu',
      'Xem tivi 30 phút',
      'Góc học tập gọn gàng',
      'Đi ngủ lúc 22:00',
    ],
  },
]

export const PRINCIPLES = [
  {
    icon: '🎯',
    title: 'Tự giác & trách nhiệm',
    desc: 'Biết quý trọng thời gian, đúng giờ và chủ động hoàn thành việc của mình. Việc của con — con có trách nhiệm với việc ấy.',
  },
  {
    icon: '🔥',
    title: 'Tập trung & kỷ luật',
    desc: 'Tập trung vào điều mình đang làm. Kiên trì với những việc nhỏ và không dễ dàng bỏ cuộc.',
  },
  {
    icon: '🧺',
    title: 'Gọn gàng & nề nếp',
    desc: 'Đồ dùng lấy ở đâu, dùng xong cất lại đúng chỗ. Gọn gàng là trách nhiệm của chính mình.',
  },
  {
    icon: '🤝',
    title: 'Trung thực & giữ lời',
    desc: 'Nói thật, làm thật và biết giữ lời hứa. Khi làm sai, dám nhận lỗi và biết sửa lỗi.',
  },
  {
    icon: '💗',
    title: 'Bao dung & tha thứ',
    desc: 'Biết đặt mình vào vị trí của người khác, cho người khác cơ hội sửa sai — và cũng tha thứ cho chính mình.',
  },
  {
    icon: '🎁',
    title: 'Hào sảng & chia sẻ',
    desc: 'Không so đo hơn thiệt. Biết cho đi, giúp đỡ người khác và vui khi làm được một điều tốt.',
  },
  {
    icon: '🙏',
    title: 'Lịch sự & tôn trọng',
    desc: 'Biết nói cảm ơn, xin lỗi, biết lắng nghe và đối xử tử tế với mọi người.',
  },
]

export const MOM_QUOTE =
  'Mẹ không cần con hoàn hảo — chỉ mong mỗi ngày con tốt hơn chính mình của ngày hôm qua một chút.'

export const ENCOURAGEMENTS = [
  'Tuyệt vời lắm! 🌟',
  'Con đang tiến bộ mỗi ngày 💪',
  'Kỷ luật là sức mạnh! ✨',
  'Tốt hơn hôm qua một chút rồi 🌱',
  'Cứ thế phát huy nhé! 🎉',
  'Con làm được mà! 💫',
  'Mỗi dấu tick là một bước tiến 👣',
]

export const ALL_DONE_MSG = 'Hoàn thành cả 10 nhiệm vụ! Con giỏi quá! 🏆'

export const JOURNAL_QUESTIONS = [
  { key: 'good', label: 'Hôm nay con làm tốt điều gì?', ph: 'Ví dụ: con tự giác học bài đúng giờ…' },
  { key: 'notGood', label: 'Điều gì con chưa làm tốt?', ph: 'Ví dụ: con còn xem tivi hơi lâu…' },
  { key: 'tomorrow', label: 'Ngày mai con sẽ làm tốt hơn ở đâu?', ph: 'Ví dụ: con sẽ cất sách ngay sau khi học…' },
]

export const GRATITUDE = {
  key: 'gratitude',
  label: 'Một điều con biết ơn hôm nay',
  ph: 'Ví dụ: con biết ơn bữa cơm mẹ nấu…',
}

// Ngưỡng "ngày tốt" để tính chuỗi ngày duy trì
export const GOOD_DAY_THRESHOLD = 0.8
