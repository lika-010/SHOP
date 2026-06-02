export default function Login(){
return(
<div className="max-w-md mx-auto py-20">
<h1 className="text-4xl font-bold mb-8">
Login
</h1>

<input
placeholder="Email"
className="w-full border p-3 rounded mb-4"
/>

<input
type="password"
placeholder="Password"
className="w-full border p-3 rounded mb-4"
/>

<button className="w-full bg-violet-600 text-white py-3 rounded-xl">
Login
</button>

</div>
)
}