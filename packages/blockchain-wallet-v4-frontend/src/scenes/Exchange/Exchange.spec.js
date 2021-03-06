import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { Remote } from 'blockchain-wallet-v4'
import { ExchangeScene } from './index'
import ExchangeContainer from './ExchangeContainer'
import DataError from 'components/DataError'

jest.mock('blockchain-info-components', () => ({
  BlockchainLoader: 'BlockchainLoader',
  Button: 'Button',
  FlatLoader: 'FlatLoader',
  Icon: 'Icon',
  Image: 'Image',
  Link: 'Link',
  Text: 'Text',
  TextInput: 'TextInput',
  TextGroup: 'TextGroup'
}))

const FROM = 'BTC'
const TO = 'ETH'

const props = {
  logEnterExchange: jest.fn(),
  fetchUser: jest.fn(),
  location: {
    state: {
      from: FROM,
      to: TO
    }
  }
}

describe('ExchangeScene', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('renders loading correctly', () => {
    const component = shallow(
      <ExchangeScene verified={Remote.Loading} {...props} />
    )
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
  it('renders not asked correctly', () => {
    const component = shallow(
      <ExchangeScene verified={Remote.NotAsked} {...props} />
    )
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
  it('renders exchange correctly', () => {
    const component = shallow(
      <ExchangeScene verified={Remote.Success(true)} {...props} />
    )
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
    const exchange = component.find(ExchangeContainer)
    expect(exchange.prop('from')).toBe(FROM)
    expect(exchange.prop('to')).toBe(TO)
  })
  it('renders getstarted correctly', () => {
    const component = shallow(
      <ExchangeScene verified={Remote.Success(false)} {...props} />
    )
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
  it('renders failure correctly', () => {
    const component = shallow(
      <ExchangeScene verified={Remote.Failure({})} {...props} />
    )
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
    const dataError = component.find(DataError)
    dataError.prop('onClick')()
    expect(props.fetchUser).toHaveBeenCalledTimes(1)
  })
  it('logs enter events on mount', () => {
    shallow(<ExchangeScene verified={Remote.Failure({})} {...props} />)
    expect(props.logEnterExchange).toHaveBeenCalledTimes(1)
  })
})
