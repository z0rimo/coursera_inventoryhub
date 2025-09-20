import { useState } from "react";
import ReactDOM from "react-dom/client";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import type { Product } from "../api/products";

function App() {
  const [editing, setEditing] = useState<Product | null>(null);
  const [, setRefreshFlag] = useState(0);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <h1>InventoryHub</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
        <div>
          <ProductList onEdit={(p) => setEditing(p)} />
        </div>
        <div>
          <h3>{editing ? "Edit Product" : "Create Product"}</h3>
          <ProductForm editing={editing} onSaved={() => { setEditing(null); setRefreshFlag(f => f + 1); }} />
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
