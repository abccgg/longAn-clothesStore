import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='fex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} className='mb-5 w-32' />
                <p className='w-full md:w-2/3 text-gray-600'>
                    Đơn giản - Thời trang - Phong cách
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>
                    Cửa hàng
                </p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Trang chủ</li>
                    <li>Về chúng tôi</li>
                    <li>Vận chuyển</li>
                    <li>Chính sách riêng tư</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>Kết nối với chúng tôi</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Facebook</li>
                    <li>Íntagram</li>
                </ul>
            </div>
        </div>
        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>Website được tạo bởi An và Long</p>
        </div>
    </div>
  )
}

export default Footer
