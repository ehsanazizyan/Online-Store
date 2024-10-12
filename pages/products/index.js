import CategoryList from "@/Pages/CategoryList";
import ProductGallery from "@/Pages/ProductGallery";

const Products = () => {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className=" grid grid-cols-12">
                <div className=" col-span-2 md:block hidden h-screen overflow-y-scroll">
                    <CategoryList />
                </div>
                <div className="col-span-12 md:col-span-10 h-screen overflow-y-scroll">
                    <ProductGallery />
                </div>
            </div>
        </div>
    );
};

export default Products;
