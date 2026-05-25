export default function ProductsPage() {
  return (
    <>
      <h1>Create products</h1>
      <ul>
        <li>Images/videos — white background only, no AI product verification flag</li>
        <li>Title, description, weight, box dimensions (L×B×H×W)</li>
        <li>Manufacturer address &amp; pincode, price</li>
        <li>Returnable / cancellable / replaceable flags</li>
        <li>Pending approval → listed on marketplace when admin approves</li>
      </ul>
      <form>
        <input type="file" accept="image/*,video/*" multiple />
        <input type="text" placeholder="Product title" />
        <textarea placeholder="Description" rows={4} />
        <button type="submit">Submit for approval</button>
      </form>
    </>
  );
}
