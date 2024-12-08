import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'VỀ'} text2={'CHÚNG TÔI'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img}/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Là cửa hàng tốt nhất với những quần áo mới nhất</p>
          <p>Là cửa hàng tốt nhất với những quần áo mới nhất</p>
          <b className='text-gray-800'>Nhiệm vụ của chúng tôi</b>
          <p>Là cửa hàng tốt nhất với những quần áo mới nhất</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'Tạo sao'} text2={'Chọn chúng tôi'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Đảm bảo chất lượng:</b>
          <p className='text-gray-600'>Là cửa hàng tốt nhất với những quần áo mới nhất</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Tiện lợi:</b>
          <p className='text-gray-600'>Là cửa hàng tốt nhất với những quần áo mới nhất</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Nhanh chóng:</b>
          <p className='text-gray-600'>Là cửa hàng tốt nhất với những quần áo mới nhất</p>
        </div>
      </div>
    </div>
  )
}

export default About
