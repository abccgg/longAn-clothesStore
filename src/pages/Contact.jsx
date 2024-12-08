import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'Liên hệ'} text2={'Chúng tôi'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} className='w-full md:max-w-[480px]'/>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Cửa hàng của chúng tôi</p>
          <p className='text-gray-500'>Địa chỉ<br/>Đường Láng</p>
          <p className='text-gray-500'>Gọi: <br/>0987654321</p>
          <p className='font-semibold text-xl text-gray-500'>Là cửa hàng tốt nhất</p>
          <p className='text-gray-500'>Cửa hàng tốt nhất</p>
          <Link to = '/'>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Khám phá </button>
          </Link>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact
