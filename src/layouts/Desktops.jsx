import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ItemsList from '../components/ItemsList'
import { getAllItems } from '../redux/slices/itemSlice'

const Desktops = () => {
  const { items, status } = useSelector((state) => state.item)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllItems())
  }, [dispatch])

  console.log(items, status)

  return (
    <div className='mt-[30px]'>
      {<ItemsList isLoading={status} items={items} />}
    </div>
  )
}

export default Desktops
