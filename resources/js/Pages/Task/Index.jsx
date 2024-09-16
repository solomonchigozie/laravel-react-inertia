import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants'
import { Head, Link, router } from '@inertiajs/react'
import React from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid'
import TableHeading from '@/Components/TableHeading'

export default function Index({ projects, queryParams = null }) {
    queryParams = queryParams || {}

    const searchFieldChanged = (name, value) => {
        //if value exists
        if(value){
            queryParams[name] = value
        }else{
            delete queryParams[name]
        }

        router.get(route('project.index'), queryParams)
    }

    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) => {
        if(name === queryParams.sort_field){
            if(queryParams.sort_direction === 'asc'){
                queryParams.sort_direction = 'desc'
            }else{
                queryParams.sort_direction = 'asc'
            }
        }else{
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';  
        }

        router.get(route('project.index'), queryParams)
    }


    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        {/* {JSON.stringify(projects, undefined, 2)} */}
                            <div className='relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border'>
                                <table className='w-full text-left table-auto min-w-max'>
                                    <thead>
                                        <tr className='text-nowrap'>
                                            <TableHeading 
                                            name="id"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                            >ID</TableHeading>
                                            <th className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50 flex'>
                                                <div className='px-3 py-2 p-4 flex items-center justify-between gap-1 cursor-pointer'>
                                                    Image
                                               </div> 
                                            </th>
                                            <TableHeading 
                                            name="name"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                            >Name</TableHeading>
                                            <TableHeading 
                                            name="status"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                            >Status</TableHeading>
                                            <TableHeading 
                                            name="created_at"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                            >Create Date</TableHeading>

                                            <TableHeading 
                                            name="due_date"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                            >Due Date</TableHeading>

                                            <th  className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>Created By</th>
                                            <th  className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50 text-right'>Actions</th>
                                        </tr>
                                    </thead>
                                    <thead>
                                        <tr className='text-nowrap'>
                                            <th className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'></th>
                                            <th className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'></th>
                                            <th className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
                                                <TextInput className='w-full'  
                                                    placeholder='Project Name'
                                                    defaultValue={queryParams.name}
                                                    onBlur={e=>searchFieldChanged('name', e.target.value)}
                                                    onKeyPress={e => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
                                                <SelectInput className='w-full'  
                                                    onChange={e => searchFieldChanged('status', e.target.value)}
                                                    defaultValue={queryParams.status}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                </SelectInput>
                                            </th>
                                            <th className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'></th>
                                            <th className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'></th>
                                            <th className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'></th>
                                            <th className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50 text-right'></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.data.map((project) => ( 
                                            <tr className='' key={project.id}>
                                                <td className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>{project.id}</td>
                                                <td className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'> <img src={project.image_path} alt={project.name} style={{width: 60}} /> </td>
                                                <td className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>{project.name}</td>
                                                <td className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
                                                    <span className={'px-2 py-1 rounded text-white ' +
                                                        PROJECT_STATUS_CLASS_MAP[project.status]
                                                    }>
                                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                    </span>
                                                </td>
                                                <td className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>{project.created_at}</td>
                                                <td className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>{project.due_date}</td>
                                                <td className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>{project.createdBy.name}</td>
                                                <td className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
                                                    <Link href={route('project.edit', project.id)}
                                                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'
                                                    >Edit</Link>
                                                    <Link href={route('project.destroy', project.id)}
                                                    className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'
                                                    >Delete</Link>
                                                </td>
                                            </tr>
                                        ) )}
                                    </tbody>
                                </table>
                                <Pagination links={projects.meta.links} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
