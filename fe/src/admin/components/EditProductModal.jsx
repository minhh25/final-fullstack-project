import { useState } from "react";

export default function EditProductModal({ product, onClose, onSave }) {
    const [form, setForm] = useState({
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice || "",
        quantity: product.quantity,
        image: product.image,
        tags: product.tags.join(", "),
        description: product.description || ""
    });

    const submit = () => {
        onSave({
            ...form,
            price: Number(form.price),
            quantity: Number(form.quantity),
            discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
            tags: form.tags.split(",").map(t => t.trim())
        });
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[480px] rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold">Edit Product</h3>

                {Object.keys(form).map(key => (
                    <input
                        key={key}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                        placeholder={key}
                        value={form[key]}
                        onChange={e => setForm({ ...form, [key]: e.target.value })}
                    />
                ))}

                <div className="flex justify-end gap-3 pt-2">
                    <button onClick={onClose} className="px-4 py-2 border rounded-lg">
                        Cancel
                    </button>
                    <button
                        onClick={submit}
                        className="px-4 py-2 bg-black text-white rounded-lg"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
