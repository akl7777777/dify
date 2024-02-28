'use client'
import type { FC } from 'react'
import React, { useCallback } from 'react'
import produce from 'immer'
import type { KeyValue } from '../../types'
import KeyValueItem from './item'
type Props = {
  readonly: boolean
  list: KeyValue[]
  onChange: (newList: KeyValue[]) => void
  onAdd: () => void
}

const KeyValueList: FC<Props> = ({
  readonly,
  list,
  onChange,
  onAdd,
}) => {
  const handleChange = useCallback((index: number) => {
    return (newItem: KeyValue) => {
      const newList = produce(list, (draft: any) => {
        draft[index] = newItem
      })
      onChange(newList)
    }
  }, [list, onChange])

  const handleRemove = useCallback((index: number) => {
    return () => {
      const newList = produce(list, (draft: any) => {
        draft.splice(index, 1)
      })
      onChange(newList)
    }
  }, [list, onChange])

  return (
    <div className='border border-gray-200 rounded-lg overflow-hidden'>
      <div className='flex items-center h-7 leading-7 text-xs font-medium text-gray-500 uppercase'>
        <div className='w-1/2 h-full pl-3 border-r border-gray-200'>key</div>
        <div className='w-1/2 h-full pl-3'>value</div>
      </div>
      {
        list.map((item, index) => (
          <KeyValueItem
            key={index}
            payload={item}
            onChange={handleChange(index)}
            onRemove={handleRemove(index)}
            isLastItem={index === list.length - 1}
            onAdd={onAdd}
            readonly={readonly}
            canRemove={list.length > 1}
          />
        ))
      }
    </div>
  )
}
export default React.memo(KeyValueList)