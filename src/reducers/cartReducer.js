import Item1 from '../images/avocado.jpg'
import Item2 from '../images/carrot.jpg'
import Item3 from '../images/corn.jpg'
import Item4 from '../images/garlic.jpg'
import Item5 from '../images/red-chili.jpg'
import Item6 from '../images/tomato.jpg'
import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  ADD_SHIPPING,
  SUB_SHIPPING
} from '../actions/action-types/cartActions'

import produce from 'immer';

const initState = {
  items: [{
      id: 1,
      title: 'Avocado',
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 110,
      img: Item1
    },
    {
      id: 2,
      title: 'Carrot',
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 80,
      img: Item2
    },
    {
      id: 3,
      title: 'Corn',
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 120,
      img: Item3
    },
    {
      id: 4,
      title: 'Garlic',
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 260,
      img: Item4
    },
    {
      id: 5,
      title: 'Red Chili',
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 160,
      img: Item5
    },
    {
      id: 6,
      title: 'Tomato',
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 90,
      img: Item6
    }
  ],
  addedItems: [],
  total: 0

}
const cartReducer = (state = initState, action) => {

  //INSIDE HOME COMPONENT
  if (action.type === ADD_TO_CART) {
    const nextItem = state.items.find(item => item.id === action.id)
    //check if the action id exists in the addedItems
    const existed_item = state.addedItems.find(item => action.id === item.id)
    if (existed_item) {
      nextItem.quantity += 1
      return {
        ...state,
        total: state.total + nextItem.price
      }
    } else {
      nextItem.quantity = 1;
      //calculating the total
      const newTotal = state.total + nextItem.price

      return {
        ...state,
        addedItems: [...state.addedItems, nextItem],
        total: newTotal
      }

    }
  }

  if (action.type === REMOVE_ITEM) {
    const itemremove = state.addedItems.find(item => action.id === item.id)
    const add_neItems = state.addedItems.filter(item => action.id !== item.id)

    //calculating the total
    const newTotal = state.total - (itemremove.price * itemremove.quantity)
    console.log(itemremove)
    return {
      ...state,
      addedItems: add_neItems,
      total: newTotal
    }
  }

  //INSIDE CART COMPONENT
  if (action.type === ADD_QUANTITY) {
    const nextItem = state.items.find(item => item.id === action.id)
    nextItem.quantity += 1
    const newTotal = state.total + nextItem.price
    return {
      ...state,
      total: newTotal
    }
  }
  if (action.type === SUB_QUANTITY) {
    const addedItem = state.items.find(item => item.id === action.id)

    if (addedItem.quantity === 1) {
      const add_neItems = state.addedItems.filter(item => item.id !== action.id)
      const newTotal = state.total - addedItem.price
      return {
        ...state,
        addedItems: add_neItems,
        total: newTotal
      }
    } else {
      addedItem.quantity -= 1
      const newTotal = state.total - addedItem.price
      return {
        ...state,
        total: newTotal
      }
    }

  }

  if (action.type === ADD_SHIPPING) {
    return {
      ...state,
      total: state.total + 6
    }
  }

  if (action.type === SUB_SHIPPING) {
    return {
      ...state,
      total: state.total - 6
    }
  } else {
    return state
  }

}

export default cartReducer;