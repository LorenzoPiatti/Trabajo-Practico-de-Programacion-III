import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <div>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default ProductList;