import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api/products";
import type { Product, PagedResult } from "../api/products";

export default function ProductList({ onEdit }: { onEdit: (p: Product) => void }) {
  const [data, setData] = useState<PagedResult<Product> | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setLoading(true); setErr(null);
    try {
      const d = await getProducts({ search, page, pageSize });
      setData(d);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [page]);

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <input placeholder="Search name/category…" value={search} onChange={e => setSearch(e.target.value)} />
        <button onClick={() => { setPage(1); load(); }}>Search</button>
      </div>

      {loading && <p>Loading…</p>}
      {err && <p style={{ color: "tomato" }}>{err}</p>}

      <table width="100%" cellPadding={6}>
        <thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th></th></tr></thead>
        <tbody>
          {data?.items.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td><td>{p.name}</td><td>{p.category}</td><td>${p.price}</td><td>{p.stock}</td>
              <td>
                <button onClick={() => onEdit(p)}>Edit</button>
                <button onClick={async () => { await deleteProduct(p.id); load(); }}>Delete</button>
              </td>
            </tr>
          ))}
          {!data?.items.length && !loading && <tr><td colSpan={6}>No data</td></tr>}
        </tbody>
      </table>

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span>Page {page}</span>
        <button disabled={!!data && page * pageSize >= data.total} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}
