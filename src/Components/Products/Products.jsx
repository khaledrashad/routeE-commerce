import axios from 'axios'
import { DNA } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { CartContext } from '../../Context/CartContext.js'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlistItem } from '../../Redux/wishlistSlice.js'
import { useContext } from 'react'
export default function Products() {
  let wishData = useSelector(({wishlist})=> wishlist)
  console.log(wishData);
  let dispatch = useDispatch()
  function PostDataToWishlist(id) {
    dispatch(addWishlistItem(id)).then(data => {
      if (data.payload.status == "success") {
        toast.success(data.payload.message, { icon: '👏', })
      } else {
        toast.error("Error in adding product")
      }
    })
  }


  let { addToCart } = useContext(CartContext)

  async function PostDataToCart(id) {
    let { data } = await addToCart(id)
    if (data.status == "success") {
      toast.success(data.message, { icon: '👏', })
    } else {
      toast.error("Error in adding product")
    }
  }

  async function getHomeData() {
    return await axios.get("https://route-ecommerce.onrender.com/api/v1/products")

  }
  let { data, isLoading, isFetched, isError } = useQuery("homeData", getHomeData)


  return <>
    {isLoading ? <div className='vh-100 d-flex justify-content-center align-items-center'><DNA
      visible={true}
      height="200"
      width="200"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    /></div> : <div className='allProducts'>
      <div className="row g-3">
        {data?.data.data.map(product =>
          <div className="col-md-3" key={product.id}>
            <div className="product cursor-pointer p-2" id={product.id}>
              <Link to={`/detailedProduct/${product.id}`} className='text-decoration-none'>
                <img src={product.imageCover} alt="" className='w-100' />
                <h3 className='font-sm text-main m-0'>{product.category.name}</h3>
                <h3 className='h5 text-black'>{product.slug.split("-").splice(0, 3).join(" ")}</h3>
                <div className='d-flex px-2 justify-content-between align-items-center py-2'>
                  <span className='text-black'>{product.price} EGP</span>
                  <div>
                    <i class="fa-solid fa-star px-1 rating-color"></i>
                    <span className='text-black'>{product.ratingsAverage}</span>
                  </div>
                </div>
              </Link>
              <div className='text-end'>
                <Link onClick={() => { PostDataToWishlist(product.id) }}><i className="fa-solid fa-heart text-danger fs-2 wishlistIcon"></i></Link>
              </div>
              <button onClick={() => { PostDataToCart(product.id) }} className='btn bg-main w-100'>Add to cart</button>
            </div>
          </div>)}
      </div>
    </div>}
  </>
}
