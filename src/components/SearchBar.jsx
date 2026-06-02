export default function SearchBar({
search,
setSearch
}){

return(
<div className="relative w-full">
<input
type="text"
placeholder="Search products..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="w-full border rounded-2xl px-5 py-4 shadow-sm focus:ring-2 focus:ring-violet-500 outline-none"
/>
</div>
)
}