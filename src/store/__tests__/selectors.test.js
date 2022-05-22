import { getAdvert } from '../selectors'

describe('getAdverts', () => {
  it('should return a tweet', () => {
    const advertsId = '1'
    const Adverts = [{ id: advertsId }]
    const state = { adverts: { data: Adverts } }
    expect(getAdvert(advertsId)(state)).toEqual(Adverts[0])
  })

  it('should return undefined', () => {
    const advertId = '1'
    const adverts = []
    const state = { adverts: { data: adverts } }
    expect(getAdvert(advertId)(state)).toBeUndefined()
  })
})
