import Link from "next/link";
import ContentCenter from "./ContentCenter";
import PhotoGallery from "./PhotoGallery";
import ContentLeft from "./ContentLeft";
import Button from "@/Button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";

const ProductDetails = ({ product }) => {
    const router = useRouter();
    return (
        <div className="bg-base-100 p-6 md:p-6  rounded-lg">
            <div className="flex justify-end">
                <Button
                    label={<ChevronLeft />}
                    tooltip="Back"
                    className=""
                    onClick={() => router.back()}
                />
            </div>
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
