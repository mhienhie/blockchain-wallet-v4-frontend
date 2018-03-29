import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, Icon } from 'blockchain-info-components'

const FaqLink = styled(Link)`
  position: relative;
  margin-top: 4px;
  
  & > :first-child:hover { 
    cursor: pointer;
  }
  
  ::after {
    opacity: ${props => props.trayRightOpen ? '1' : '0'};
    content: "";
    position: absolute;
    top: 24px;
    left: -2px;
    width: 0;
    height: 0;
    z-index: 9999;
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
    border-bottom: 16px solid ${props => props.theme['white-blue']};
    transition: opacity ${props => props.trayRightOpen ? '1s' : '0'};
  }
`

const Faq = (props) => {
  return (
    <FaqLink {...props} size='16px' weight={300} color='white'>
      <Icon name='question-in-circle-filled' size='18px' color='white'/>
    </FaqLink>
  )
}

Faq.propTypes = {
  onClick: PropTypes.func.isRequired,
  trayRightOpen: PropTypes.bool.isRequired
}

export default Faq