import ReactDOM from 'react-dom'
import React from 'react'
import Root from './RootBrowser'

//@ts-expect-error
ReactDOM.hydrate(<Root />, document)
