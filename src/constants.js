import beerIcon from './assets/icons/beerIcon.svg'
import cocktailIcon from './assets/icons/cocktailIcon.svg'
import ordinaryDrinkIcon from './assets/icons/ordinaryDrinksIcon.svg'
import allItemsIcon from './assets/icons/allItemsIcon.svg'

export const EDIT_PROFILE_INPUTS_CONST = [
  {
    name: 'name',
    placeholder: 'Edit username',
  },
  {
    name: 'email',
    placeholder: 'Edit email',
  },
  {
    name: 'newPassword',
    placeholder: 'Edit password',
  },
]

export const catalogMenuIcons = {
  All: allItemsIcon,
  Beer: beerIcon,
  Cocktail: cocktailIcon,
  Ordinary_Drink: ordinaryDrinkIcon,
}
