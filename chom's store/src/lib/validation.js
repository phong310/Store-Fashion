import * as yup from 'yup';

export const RegisterSchema = yup.object().shape({
    fullName: yup.string().required('Họ và Tên là bắt buộc'),
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không khớp')
        .required('Xác nhận mật khẩu là bắt buộc'),
});

export const LoginSchema = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
})

export const CheckoutSchema = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    fullName: yup.string().required('Họ và Tên là bắt buộc'),
    phoneNumber: yup.string().required('Số điện thoại là bắt buộc'),
    address: yup.string().required('Địa chỉ là bắt buộc'),
    province: yup.object().required('Tỉnh thành là bắt buộc'),
    district: yup.object().required('Quận huyện là bắt buộc'),
    wards: yup.object().required('Phường xã là bắt buộc'),
    paymentMethod: yup.string().required('Vui lòng chọn phương thức thanh toán'),
})