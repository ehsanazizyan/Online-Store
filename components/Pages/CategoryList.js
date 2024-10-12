import Loader from "@/Loader";
import { useCategories } from "@/useCategories";
import Link from "next/link";

const CategoryList = ({ isMobileView = false }) => {
    const { data, isError, isLoading } = useCategories();

    const categoryList = data ? data : [];

    if (isError)
        return (
            <div className="h-screen flex items-center mr-4">
                <div className="bg-error rounded-md w-full mr-auto ml-auto">
                    <span className="flex items-center justify-center py-10 text-white gap-2 px-4">
                        Categories not found
                    </span>
                </div>
            </div>
        );

    if (isLoading)
        return (
            <div className=" flex overflow-hidden items-center">
                <Loader label="Category" size="md" />
            </div>
        );

    if (isMobileView) {
        return (
            <div className="flex flex-col items-start w-screen gap-4 pb-20">
                {categoryList.map((item) => (
                    <Link key={item} href={`/products/category/${item}`} className="font-semibold">
                        {item}
                    </Link>
                ))}
            </div>
        );
    }

    return (
        <div className=" bg-base-100 rounded-sm p-4">
            <h2 className="font-bold text-lg">Categories</h2>
            <ul className="space-y-5 mt-6 pb-20">
                {categoryList.map((item) => (
                    <li key={item} className="font-semibold">
                        <Link href={`/products/category/${item}`}>{item}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default CategoryList;
