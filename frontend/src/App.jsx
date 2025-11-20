import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function ProductCard({ p }){
  return (
    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-4 shadow-[8px_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[12px_12px_32px_rgba(0,0,0,0.12)] transition-all border border-white/20 dark:border-slate-700/50">
      <div className="aspect-square rounded-xl overflow-hidden relative group">
        <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop'} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/0 via-teal-500/0 to-amber-400/10"/>
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">{p.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{p.category}</p>
        </div>
        <div className="text-right">
          <div className="text-teal-600 dark:text-amber-300 font-bold">₹{p.price}</div>
          <div className="text-xs text-slate-500">⭐ {p.rating || 0}</div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
        <button className="col-span-1 bg-white/70 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 rounded-lg py-2 hover:bg-white dark:hover:bg-slate-700">Wishlist</button>
        <button className="col-span-1 bg-teal-600 text-white rounded-lg py-2 hover:bg-teal-700">Add</button>
        <button className="col-span-1 bg-amber-500 text-white rounded-lg py-2 hover:bg-amber-600">Buy</button>
      </div>
    </div>
  )
}

export default function App(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function load(){
      try{
        const res = await fetch(`${API}/products`)
        const data = await res.json()
        setProducts(data)
      }catch(e){
        console.error(e)
      }finally{
        setLoading(false)
      }
    }
    load()
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b2f2e] to-[#0b1f1f] text-slate-100">
      <header className="sticky top-0 z-20 backdrop-blur-xl bg-slate-900/40 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-teal-500 to-amber-400 shadow-[inset_0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center">
              <span className="text-slate-900 font-black">B</span>
            </div>
            <div className="font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 drop-shadow">BlessedBuy</div>
          </div>
          <div className="hidden md:flex items-center gap-3 text-sm">
            <button className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20">Login</button>
            <button className="px-3 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white">Sign Up</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <section className="rounded-3xl overflow-hidden relative bg-gradient-to-tr from-teal-500/30 via-amber-400/10 to-teal-300/10 p-6 border border-white/10">
          <div className="text-2xl md:text-4xl font-bold">Discover premium picks with a blessed touch</div>
          <p className="mt-2 text-slate-200/80">Curated essentials across fashion, tech, beauty, decor and more.</p>
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-amber-400/20 blur-3xl rounded-full"/>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Trending Now</h2>
            <button className="text-teal-300 hover:text-amber-300">View all</button>
          </div>
          {loading ? (
            <div className="mt-6 text-slate-300">Loading...</div>
          ) : (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(p => <ProductCard key={p.id} p={p} />)}
            </div>
          )}
        </section>
      </main>

      <footer className="mt-16 py-10 text-center text-slate-400">© {new Date().getFullYear()} BlessedBuy</footer>
    </div>
  )
}
