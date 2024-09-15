import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid'

export default function TableHeading({ 
    name, 
    sortable = true, 
    sort_field = null, 
    sort_direction = null,
    sortChanged = () => {},
    children
    }) {
    return (
        <th onClick={(e) => sortChanged(name)} className='border-b border-blue-gray-100 bg-blue-gray-50'>
            <div className='px-3 py-2 p-4 flex items-center justify-between gap-1 cursor-pointer'>
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon className={'w-4 ' +
                            (sort_field === 'id' &&
                                sort_direction === 'asc' ?
                                `text-gray-300` : ``
                            )
                        } />
                        <ChevronDownIcon className={'w-4 -mt-2 ' +
                            (sort_field === 'id' &&
                                sort_direction === 'desc' ?
                                `text-gray-300` : ``
                            )
                        } />
                    </div>
                )}
            </div>
        </th>
    )
}