import AddUserForm from '@/app/components/AddUserForm'

export default function AddCustomerPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Customer</h1>
      <AddUserForm />
    </div>
  )
}