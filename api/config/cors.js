// import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError'
const WHITELIST_DOMAINS = '//192.168.110.243:8081'
// Cấu hình CORS Option trong dự án thực tế (Video số 62 trong chuỗi MERN Stack Pro)
export const corsOptions = {
  origin: function (origin, callback) {
    // Cho phép việc gọi API bằng POSTMAN trên môi trường dev,
    // Thông thường khi sử dụng postman thì cái origin sẽ có giá trị là undefined
    // Update mới: Ở video số 75 trong chuỗi MERN Stack PRO khi chúng ta deploy dự án lên một Server Production thì sẽ sửa lại đoạn này thêm một chút nữa để phù hợp với từng môi trường production hoặc dev nhé. Học với mình thì các bạn cứ yên tâm về sự chỉn chu chuẩn chỉnh nhé :D
    if (!origin) {
      return callback(null, true)
    }

    // Kiểm tra dem origin có phải là domain được chấp nhận hay không
    if (WHITELIST_DOMAINS.includes(origin)) {
      // permit pass
      return callback(null, true)
    }

    // Cuối cùng nếu domain không được chấp nhận thì trả về lỗi
    return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`))
  },

  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,

  // CORS sẽ cho phép nhận cookies từ request,
  credentials: true
}