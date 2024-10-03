const ContentCenter = ({
    brand,
    description,
    dimensions,
    rating,
    title,
    warrantyInformation,
    weight,
}) => {
    const badgeStyle = "bg-gray-200 rounded-md font-semibold px-2 py-1 min-w-fit w-max";
    return (
        <>
            <div className="flex flex-col gap-6">
                {title && <span className="font-bold text-lg">{title}</span>}
                {description && <p className="font-semibold ">{description}</p>}
                <div className="flex flex-col gap-2 max-w-1/2">
                    {dimensions && (
                        <div className="bg-gray-100 rounded-md font-semibold px-2 py-1 space-y-1">
                            <span className="font-bold">Dimensions</span>
                            <ul className="font-semibold flex justify-between">
                                {dimensions.depth && <li>Depth {dimensions.depth}</li>}
                                {dimensions.width && <li>Width {dimensions.width}</li>}
                                {dimensions.height && <li>Height {dimensions.height}</li>}
                            </ul>
                        </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                        {weight && <span className={`${badgeStyle}`}>Weight: {weight}</span>}
                        {rating && <span className={`${badgeStyle}`}>Rating: {rating}</span>}
                        {brand && <span className={`${badgeStyle}`}>Brand: {brand}</span>}

                        {warrantyInformation && (
                            <span className={`${badgeStyle}`}>{warrantyInformation}</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContentCenter;
