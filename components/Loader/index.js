const Loader = ({ label, size = "md" }) => {
    return (
        <div className="flex items-center gap-3 justify-center py-10">
            {label && <span className={`font-semibold text-${size}`}>{label}</span>}
            <span className={`loading loading-dots loading-${size}`}></span>
        </div>
    );
};
export default Loader;
