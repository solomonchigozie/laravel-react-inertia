import TableHeading from "@/Components/TableHeading";
import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants'
import { Link, router } from '@inertiajs/react'

export default function TasksTable({ tasks, queryParams = null, hideProjectColumn = false, success }) {
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        //if value exists
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('task.index'), queryParams)
    }

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc'
            } else {
                queryParams.sort_direction = 'asc'
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }

        router.get(route('task.index'), queryParams)
    }


    const deleteTask = (task) => {
        if(!window.confirm('Are you sure you want to delete this task')){
             return ;
        }

        router.delete(route('task.destroy', task.id))
    }

    return (
        <>
            {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                {success}
            </div> 
            )}
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
                            <th className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
                                <div className='px-3 py-2 p-4 flex items-center justify-between gap-1 cursor-pointer'>
                                    Image
                                </div>
                            </th>

                            {!hideProjectColumn && <th className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
                                <div className='px-3 py-2 p-4 items-center justify-between gap-1 cursor-pointer'>
                                    Task Name
                                </div>
                            </th>}
                            
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

                            <th className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>Created By</th>
                            <th className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50 text-right'>Actions</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr className='text-nowrap'>
                            <th className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'></th>
                            <th className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'></th>
                            {!hideProjectColumn && <th className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'></th>}
                            <th className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
                                <TextInput className='w-full'
                                    placeholder='Task Name'
                                    defaultValue={queryParams.name}
                                    onBlur={e => searchFieldChanged('name', e.target.value)}
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
                        {tasks.data.map((task) => (
                            <tr className='' key={task.id}>
                                <td className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>{task.id}</td>
                                <td className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'> <img src={task.image_path} alt={task.name} style={{ width: 60 }} /> </td>
                                {!hideProjectColumn && 
                                <td className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>{task.project.name}</td>
                                }
                                <td className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50 hover:underline'>
                                    <Link href={route('task.show',task.id)}>
                                        {task.name}
                                    </Link> 
                                </td>
                                <td className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
                                    <span className={'px-2 py-1 rounded text-white ' +
                                        TASK_STATUS_CLASS_MAP[task.status]
                                    }>
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </td>
                                <td className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>{task.created_at}</td>
                                <td className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>{task.due_date}</td>
                                <td className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>{task.createdBy.name}</td>
                                <td className='px-3 py-2 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
                                    <Link href={route('task.edit', task.id)}
                                        className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'
                                    >Edit</Link>
                                    <button 
                                    onClick={(e) => deleteTask(task)}
                                    className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination links={tasks.meta.links} />
            </div>
        </>
    )
}