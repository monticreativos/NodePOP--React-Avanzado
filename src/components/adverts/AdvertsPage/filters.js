export const saleFilter = {
  all: { value: 'all', label: 'All' },
  sell: { value: 'sell', label: 'Sell' },
  buy: { value: 'buy', label: 'Buy' },
}

export const defaultFilters = {
  name: '',
  price: [],
  sale: saleFilter.all.value,
  tags: [],
}

const filterByName = (filter) => ({ name }) => {
  const cleanFilter = filter.trim()
  return !cleanFilter || new RegExp(cleanFilter, 'gi').test(name)
}

const filterByPrice = (filter) => ({ price }) => {
  if (!filter.length) {
    return true
  }
  const [min, max] = filter
  if (!max) {
    return price >= min
  }
  return price >= min && price <= max
}

const filterBySale = (filter) => ({ sale }) =>
  [
    saleFilter.all.value,
    sale ? saleFilter.sell.value : saleFilter.buy.value,
  ].includes(filter)

const filterByTags = (filter) => ({ tags }) =>
  !filter.length || filter.every((tag) => tags.includes(tag))

export const filterAdverts = (
  adverts,
  { name, price, sale, tags } = defaultFilters,
) =>

  adverts
    .filter(filterByName(name))
    .filter(filterByPrice(price))
    .filter(filterBySale(sale))
    .filter(filterByTags(tags))
