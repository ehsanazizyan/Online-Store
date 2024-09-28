import { useRouter } from "next/router";

const ProductId = () => {
    const router = useRouter();

    return <div>ProductId {router.query.productId}</div>;
};
export default ProductId;
