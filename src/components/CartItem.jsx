export default function CartItem({item}){
return(
<div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
<h3>{item.name}</h3>
<p>${item.price}</p>

<div className="flex gap-3">
<button>-</button>
<span>1</span>
<button>+</button>
</div>

</div>
)
}