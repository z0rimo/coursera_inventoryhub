import { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../api/products";
import type { Product } from "../api/products";

type Input = Omit<Product, "id">;

export default function ProductForm({ editing, onSaved }: { editing?: Product | null, onSaved: () => void }) {
  const [form, setForm] = useState<Input>({ name: "", category: "", price: 0, stock: 0 });

  useEffect(() => {
    if (editing) setForm({ name: editing.name, category: editing.category, price: editing.price, stock: editing.stock });
  }, [editing]);

  async function save() {
    if (!form.name.trim() || !form.category.trim()) { alert("Name/Category required"); return; }
    if (form.price < 0 || form.stock < 0) { alert("Price/Stock must be ≥ 0"); return; }
    if (editing) await updateProduct(editing.id, form);
    else await createProduct(form);
    setForm({ name: "", category: "", price: 0, stock: 0 });
    onSaved();
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
      <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
      <input type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({ ...form, stock: Number(e.target.value) })} />
      <button onClick={save}>{editing ? "Update" : "Create"}</button>
    </div>
  );
}
