import Link from "next/link";
import ContentCenter from "./ContentCenter";
import PhotoGallery from "./PhotoGallery";
import ContentLeft from "./ContentLeft";
import Button from "@/Button";
import { ChevronLeft } from "lucide-react";

const ProductDetails = ({ product }) => {
    return (
        <div className="bg-base-100 p-6 md:p-6  rounded-lg">
            <Link href="/products" className="text-right block">
                <Button label={<ChevronLeft />} tooltip="Back to Products" />
            </Link>
            <div className="flex flex-col grid-cols-12 gap-4 md:grid">
                <div className="col-span-4 ">
                    <ContentLeft {...product} />
                </div>
                <div className="col-span-4">
                    <ContentCenter {...product} />
                </div>
                <div className="col-span-4 order-first md:order-last">
                    <PhotoGallery imgs={product?.images || []} />
                </div>
            </div>
        </div>
    );
};
export default ProductDetails;
