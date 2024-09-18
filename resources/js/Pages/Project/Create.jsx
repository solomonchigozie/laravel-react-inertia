import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create() {
    const {data, setData, post, processing, errors, reset} = useForm({
        image:'',
        name : '',
        status : '',
        description : '',
        due_date : '',
    })

    const onSubmit =(e) => {
        e.preventDefault();

        post(route('project.create'))
    }
   return ( <AuthenticatedLayout
        header={
            <div className='flex justify-between items-center'>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New Project</h2>
            </div>
        }
    >
        <Head title="Projects" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <form 
                            onSubmit={onSubmit}
                            action="" className="p-4 sm:p-8 bg-white shadow sm:rounded-lg"
                        >
                            <div>
                                <InputLabel  
                                    htmlFor="project_image_path"
                                    value="Project Image"
                                />
                                <TextInput 
                                    id="project_image_path"
                                    type="file"
                                    name="image"
                                    value={data.image}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('image', e.target.value)}
                                />
                                <InputError message={errors.image} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel  
                                    htmlFor="project_name"
                                    value="Project Name"
                                />
                                <TextInput 
                                    id="project_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    isFocused={true}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name}  className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel  
                                    htmlFor="project_description"
                                    value="Project Description"
                                /> 
                                <TextAreaInput
                                    id="project_description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description}  className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel  
                                    htmlFor="project_due_date"
                                    value="Project Deadline"
                                />
                                <TextInput 
                                    id="project_due_date"
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('due_date', e.target.value)}
                                />
                                <InputError message={errors.due_date}  className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel  
                                    htmlFor="project_status"
                                    value="Project Status"
                                />
                                <SelectInput 
                                    id="project_status"
                                    name="status"
                                    className="mt-1 block w-full"
                                    onChange={e => setData('status', e.target.value)}
                                >
                                    <option value="">select status</option> 
                                    <option value="pending">pending</option>
                                    <option value="in_progress">in_progress</option>
                                    <option value="completed">completed</option>
                                </SelectInput>

                                <InputError message={errors.project_status}  className="mt-2" />
                            </div>
                            <div className="mt-4 text-right">
                                <Link 
                                href={route('project.index')}
                                className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button 
                                className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    </AuthenticatedLayout>)
}