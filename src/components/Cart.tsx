import { Link, redirect } from "react-router-dom";

export async function action() {
  return redirect(`/cart`);
}

export default function Cart() {
  return (
    <>
      <div>
        <h1>Cart</h1>
        <Link to={`/`}>Home</Link>
      </div>
    </>
  );
}
