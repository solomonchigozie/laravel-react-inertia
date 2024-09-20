import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({
        totalPendingTasks, 
        myPendingTasks,
        totalProgressTasks,
        myProgressTasks,
        totalCompletedTasks,
        myCompletedTasks,
        activeTasks
    }){
        let n =1
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2 ">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className='text-amber-500 text-2xl font-semibold'>
                                Pending Task
                            </h3>
                            <p className='text-xl mt-4'>
                                <span className="mr-2">
                                    {myPendingTasks}
                                </span>
                                /
                                <span className="ml-2">
                                    {totalPendingTasks}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <h3 className='text-blue-500 text-2xl font-semibold'>
                                In Progress Tasks
                            </h3>
                            <p className='text-xl mt-4'>
                                <span className="mr-2">
                                    {myProgressTasks}
                                </span>
                                /
                                <span className="ml-2">
                                    {totalProgressTasks}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <h3 className='text-green-500 text-2xl font-semibold'>
                                Completed Tasks
                            </h3>
                            <p className='text-xl mt-4'>
                                <span className="mr-2">
                                    {myCompletedTasks}
                                </span>
                                / 
                                <span className="ml-2">
                                    {totalCompletedTasks}
                                </span>
                            </p>
                        </div>
                    </div>

                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4 ">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className='text-gray-600 text-xl font-semibold px-3 py-2 mb-4'>
                                My Active Task
                            </h3>
                            
                            <div className='relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border'>
                                <table className='w-full text-left table-auto min-w-max'>
                                    <thead>
                                        <tr>
                                            <th className='px-3 py-2 border-b border-blue-gray-100 bg-blue-gray-50'>ID</th>
                                            <th className='px-3 py-2 border-b border-blue-gray-100 bg-blue-gray-50'>Project Name</th>
                                            <th className='px-3 py-2 border-b border-blue-gray-100 bg-blue-gray-50'>Name</th>
                                            <th className='px-3 py-2 border-b border-blue-gray-100 bg-blue-gray-50'>Status</th>
                                            <th className='px-3 py-2 border-b border-blue-gray-100 bg-blue-gray-50'>Due Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {activeTasks.data.map(task => (
                                            <tr key={task.id}>
                                                <td className='px-3 py-5 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>{n++}</td>
                                                <td className='px-3 py-5 p-4 border-b border-blue-gray-100 bg-blue-gray-50 hover:underline font-bold'>
                                                    <Link
                                                    href={route('project.show', task.project.id)}>
                                                    {task.project.name}
                                                    </Link>
                                                </td>
                                                <td className='px-3 py-5 p-4 border-b border-blue-gray-100 bg-blue-gray-50 hover:underline font-bold'>
                                                    <Link
                                                    href={route('task.show', task.id)}>
                                                    {task.name}
                                                    </Link>
                                                </td>
                                                <td className='px-3 py-5 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
                                                    <span className={'px-2 py-1 rounded text-white ' +
                                                        TASK_STATUS_CLASS_MAP[task.status]
                                                    }>
                                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                                    </span>
                                                </td>
                                                <td className='px-3 py-5 p-4 border-b border-blue-gray-100 bg-blue-gray-50'>{task.due_date}</td>
                                            </tr>
                                        ))} 
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


             
        </AuthenticatedLayout>
    );
}
