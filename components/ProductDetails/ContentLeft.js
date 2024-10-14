import ActionBtn from "@/ActionBtn";
import Button from "@/Button";
import { ShieldCheck } from "lucide-react";

const ContentLeft = ({ product }) => {
    const { price, discountPercentage, shippingInformation, stock, brand, rating, id } = product;
    const getOriginalPrice = () => {
        if (!discountPercentage) return "";

        const discount = discountPercentage / 100;
        const result = price / (1 - discount);
        return Math.abs(Math.floor(result));
    };

    return (
        <div className="flex flex-col gap-4 font-semibold card-body bg-gray-100 rounded-md">
            <>
                <span>{brand}</span>
                {stock < 100 && (
                    <span className="text-white bg-red-400 w-fit px-4 py-1 rounded-md">
                        Low Stock
                    </span>
                )}
                {rating && (
                    <span>
                        Operation{" "}
                        <span className="text-success">{rating >= 2.5 ? "Excellent" : "Good"}</span>
                    </span>
                )}
            </>
            <span className="divider"></span>
            <>
                <div className="flex items-center gap-2">
                    {discountPercentage && (
                        <span className="text-white bg-red-400 w-fit px-2 py-1 rounded-md">
                            {discountPercentage} %
                        </span>
                    )}
                    <span className="text-gray-400 font-normal line-through text-lg">
                        {getOriginalPrice()}
                    </span>
                </div>
                {price && <span className="font-bold">$ {price}</span>}
                <div className="flex items-center p-2">
                    <span className="text-sm min-w-fit">
                        Guarantee of authenticity and physical health of goods
                    </span>
                    <span>
                        <ShieldCheck className="size-6" />
                    </span>
                </div>
                <ActionBtn product={product} id={id} />
            </>
            <span className="divider"></span>
            {shippingInformation && <span className="">{shippingInformation} </span>}
        </div>
    );
};
export default ContentLeft;
