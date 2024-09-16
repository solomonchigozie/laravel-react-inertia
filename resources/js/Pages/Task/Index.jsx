
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import TasksTable from './TasksTable'

export default function Index({ tasks, queryParams = null }) {
    queryParams = queryParams || {}


    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tasks</h2>}
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        {/* {JSON.stringify(tasks, undefined, 2)} */}
                           <TasksTable tasks={tasks} queryParams={queryParams} />

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
