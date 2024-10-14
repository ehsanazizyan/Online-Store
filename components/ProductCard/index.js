import ActionBtn from "@/ActionBtn";
import { Star } from "lucide-react";
import Link from "next/link";

const ProductCard = ({
    category,
    price,
    id,
    stock,
    rating,
    title,
    thumbnail,
    discountPercentage,
    product,
}) => {
    return (
        <div className="bg-base-100 shadow-xl ">
            <Link href={`/products/${id}`}>
                <div className="flex md:flex-col items-center w-full md:w-80 font-semibold">
                    <div className="card-body w-full md:order-1 space-y-3 ">
                        <h2 className="card-title text-sm md:text-base">{title}</h2>

                        <div className="flex justify-between items-center ">
                            <span>$ {price} </span>
                            <span className="bg-red-500 text-white px-2 rounded-lg text-sm">
                                {discountPercentage} %
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1">
                                <span>
                                    <Star size={16} strokeWidth={3} className="text-yellow-500" />
                                </span>
                                <span> {rating}</span>
                            </div>
                            {stock <= 3 && (
                                <span className="text-red-500 min-w-max hidden md:block">
                                    Only {stock} of this product left
                                </span>
                            )}
                        </div>

                        {stock <= 5 && (
                            <span className="text-red-500 text-sm block md:hidden">
                                Only {stock} of this product left
                            </span>
                        )}
                    </div>
                    <figure>
                        <img src={thumbnail} alt={category} className="w-3/4 md:m-auto ml-auto" />
                    </figure>
                </div>
            </Link>
            <ActionBtn product={product} id={id} />
        </div>
    );
};

export default ProductCard;
