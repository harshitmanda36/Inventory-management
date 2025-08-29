import { useEffect, useState } from 'react'
import { listItems, createItem, updateItem, deleteItem } from '../api.js'

export default function Dashboard() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name:'', sku:'', quantity:0, price:0, description:'' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function refresh() {
    setLoading(true)
    setError(null)
    try {
      const data = await listItems()
      setItems(data)
    } catch (err) {
      console.error('Error loading items:', err)
      setError('Failed to load items. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await createItem({ ...form, quantity: Number(form.quantity), price: Number(form.price) })
      setForm({ name:'', sku:'', quantity:0, price:0, description:'' })
      await refresh()
    } catch (err) {
      console.error('Error creating item:', err)
      setError('Failed to create item. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const remove = async (id) => {
    try {
      await deleteItem(id)
      await refresh()
    } catch (err) {
      console.error('Error deleting item:', err)
      setError('Failed to delete item. Please try again.')
    }
  }

  const edit = async (it) => {
    const qty = Number(prompt('New quantity', it.quantity))
    if (Number.isNaN(qty)) return
    try {
      await updateItem(it.id, { ...it, quantity: qty })
      await refresh()
    } catch (err) {
      console.error('Error updating item:', err)
      setError('Failed to update item. Please try again.')
    }
  }

  return (
    <div className="grid" style={{gap: 20}}>
      <div className="card">
        <h2>Add Item</h2>
        {error && <div className="badge" style={{color: 'salmon', marginBottom: 12}}>{error}</div>}
        <form className="grid cols-2" onSubmit={submit}>
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required disabled={submitting} />
          <input placeholder="SKU" value={form.sku} onChange={e=>setForm({...form, sku:e.target.value})} required disabled={submitting} />
          <input type="number" placeholder="Quantity" value={form.quantity} onChange={e=>setForm({...form, quantity:e.target.value})} disabled={submitting} />
          <input type="number" step="0.01" placeholder="Price" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} disabled={submitting} />
          <textarea placeholder="Description" className="col-span-2" rows="2" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} disabled={submitting}></textarea>
          <button type="submit" disabled={submitting}>{submitting ? 'Creating...' : 'Create'}</button>
        </form>
      </div>

      <div className="card">
        <div className="row" style={{justifyContent:'space-between'}}>
          <h2>Inventory</h2>
          <span className="badge">{items.length} items</span>
        </div>
        {loading ? <p>Loading…</p> : (
          <table className="table">
            <thead>
              <tr><th>Name</th><th>SKU</th><th>Qty</th><th>Price</th><th>Updated</th><th></th></tr>
            </thead>
            <tbody>
              {items.map(it => (
                <tr key={it.id}>
                  <td>{it.name}</td>
                  <td>{it.sku}</td>
                  <td>{it.quantity ?? 0}</td>
                  <td>{it.price ?? 0}</td>
                  <td>{new Date(it.updatedAt).toLocaleString()}</td>
                  <td className="row">
                    <button className="secondary" onClick={()=>edit(it)}>Edit</button>
                    <button className="danger" onClick={()=>remove(it.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
