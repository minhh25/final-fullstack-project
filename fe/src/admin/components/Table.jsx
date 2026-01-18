export default function Table({ onEdit, onDelete }) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onEdit}
        className="text-blue-600 hover:underline text-sm"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="text-red-600 hover:underline text-sm"
      >
        Delete
      </button>
    </div>
  );
}
