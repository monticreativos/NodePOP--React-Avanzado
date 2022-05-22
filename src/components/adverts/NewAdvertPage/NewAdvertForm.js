import T from 'prop-types'

import useForm from '../../../hooks/useForm'
import { InputFile } from '../../common'
import SelectTags from '../SelectTags'
import { useDispatch } from 'react-redux'
import { tweetCreated } from '../../../store/actions'

const validName = ({ name }) => name
const validPrice = ({ price }) =>
  !Number.isNaN(price) && Number.isFinite(price) && price >= 0
const validTags = ({ tags }) => !!tags.length

function NewAdvertForm({ onSubmit }) {
  const dispatch = useDispatch()

  const { formValue: advert, handleChange, handleSubmit, validate } = useForm({
    name: '',
    sale: true,
    price: 0,
    tags: [],
    photo: null,
  })
  const { name, sale, price, tags } = advert

  const handleSubmits = async (event) => {
    event.preventDefault()
    dispatch(tweetCreated(advert))
  }

  return (
    <form onSubmit={handleSubmits}>
      <input name="name" value={name} onChange={handleChange} />
      <input
        type="checkbox"
        name="sale"
        checked={sale}
        onChange={handleChange}
      />
      <input type="number" name="price" value={price} onChange={handleChange} />
      <SelectTags name="tags" value={tags} onChange={handleChange} />
      <InputFile name="photo" onChange={handleChange} />
      <button disabled={!validate(validName, validPrice, validTags)}>
        Save
      </button>
    </form>
  )
}

NewAdvertForm.propTypes = {
  onSubmit: T.func.isRequired,
}

export default NewAdvertForm
