export default function Tableheadpanel(props) {
  const { newform, setglobalfilter } = props;

  return (
    <div className="flex flex-col items-center justify-between px-4 py-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
      <div className="w-full md:w-auto">
        <h2 className="text-xl font-semibold text-center text-gray-800 md:text-left">
          Products
        </h2>
      </div>


      <div className="flex flex-col items-center justify-end w-full space-y-3 md:w-auto sm:flex-row sm:space-y-0 sm:space-x-2">

        <input
          type="input"
          placeholder="Search..."
          className="w-full px-4 py-2 text-sm border rounded-lg outline-none sm:w-auto focus:ring focus:ring-opacity-50 focus:ring-blue-300"
          onChange={(e) => setglobalfilter(e.target.value)}
        />
        <button
          onClick={newform}
          className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-semibold text-black bg-[#E38734] border border-transparent rounded-lg sm:w-auto hover:bg-blue-600 focus:ring focus:ring-opacity-50 focus:ring-blue-300 disabled:opacity-50 disabled:pointer-events-none"
        >
          <svg
            className="flex-shrink-0 mr-2 size-3"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Add Product
        </button>
      </div>
    </div>
  );
}
