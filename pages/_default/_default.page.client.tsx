import ReactDOM from 'react-dom'
import React from 'react'
import Root from './RootBrowser'

ReactDOM.hydrate(
  //@ts-expect-error
  <Root />,
  document
)
