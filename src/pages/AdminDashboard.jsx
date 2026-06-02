export default function AdminDashboard(){
return(
<div className="p-10">
<h1 className="text-4xl font-bold mb-8">
Admin Dashboard
</h1>

<div className="grid md:grid-cols-3 gap-6">
<div className="shadow p-8 rounded-xl">
Products: 120
</div>

<div className="shadow p-8 rounded-xl">
Orders: 45
</div>

<div className="shadow p-8 rounded-xl">
Users: 200
</div>

</div>
</div>
)
}