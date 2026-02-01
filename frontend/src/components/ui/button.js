

export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold"
    >
      {children}
    </button>
  );
}
