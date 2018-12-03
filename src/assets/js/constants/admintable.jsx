import React from 'react'

export const KeyedTableHeaderCell = ({ key, label }) => (<th key={key}>{label}</th>);

export const TableHeaderRow = ({ headers }) => headers.map(KeyedTableHeaderCell)
