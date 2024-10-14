import Button from "@/Button";
import { cartStore } from "@/cartStore";
import { Minus, Plus, Trash } from "lucide-react";

const iconCart = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 md:h-6 md:w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.164 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
    </svg>
);

const ActionBtn = ({ product, id }) => {
    const { addCartItem, selectedItems, removeItems, incrementItem, decrementItem } = cartStore();

    const selectedItem = selectedItems.find((item) => item.id === id);

    const classBTN = "btn-primary btn-sm  ";

    return (
        <div className="p-2">
            {!selectedItem && (
                <Button
                    fullWidth={true}
                    startIcon={iconCart}
                    label="Add to Cart"
                    onClick={() => addCartItem(product)}
                />
            )}

            {selectedItem && (
                <div key={selectedItem.id}>
                    {selectedItem.quantity === 1 ? (
                        <div className="flex items-center justify-end md:justify-center gap-4">
                            <Button
                                label={<Trash size={16} />}
                                className={classBTN}
                                onClick={() => removeItems(id)}
                            />
                            <span className="font-bold">{selectedItem.quantity}</span>
                            <Button
                                label={<Plus size={16} />}
                                className={classBTN}
                                onClick={() => incrementItem(id)}
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-end md:justify-center gap-4">
                            <Button
                                className={classBTN}
                                label={<Minus size={16} />}
                                onClick={() => decrementItem(id)}
                            />
                            <span className="font-bold">{selectedItem.quantity}</span>
                            <Button
                                className={classBTN}
                                label={<Plus size={16} />}
                                onClick={() => incrementItem(id)}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
export default ActionBtn;

{
    /* <Button label="Add"  onClick={() => addCartItem(product)} />

            {selectedItems.map((item) => (
                <div key={item.id}>
                    {item.id === id && item.quantity === 1 && (
                        <div className="flex">
                            <Button
                                label="Remove"
                                
                                onClick={() => removeItems(id)}
                            />
                            <Button label="+"  onClick={() => incrementItem(id)} />
                        </div>
                    )}
                    {item.id === id && item.quantity > 1 && (
                        <div className="flex">
                            <Button label="-"  onClick={() => decrementItem(id)} />
                            <Button label="+"  onClick={() => incrementItem(id)} />
                        </div>
                    )}
                </div>
            ))} */
}
