import React from 'react'
import Document from './Document'

type RootServerProps = {
  Component: React.ComponentType
}

export default function RootServer({ Component, ...props }: RootServerProps) {
  return (
    <Document>
      <Component {...props} />
    </Document>
  )
}
