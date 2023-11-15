import { FaExternalLinkAlt, FaFilter, FaPlus } from "react-icons/fa";
import CustomerListTable from "../../components/CustomerListTable";

const Customers = () => {
  const users = [1, 2, 3, 4, 5];

  const FilterButton = ({ children }) => {
    return (
      <button className="text-sm font-medium text-gray-600 px-3  py-1 border rounded-md flex items-center gap-1 hover:text-white hover:bg-slate-500 duration-200">
        {children}
      </button>
    );
  };

  return (
    <div className="h-fit bg-slate-50 rounded shadow-sm w-full">
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-base md:text-xl font-semibold text-gray-700">
          Customers
        </h1>
        <div className="flex items-center gap-2">
          <FilterButton>
            <FaPlus className="w-3 h-3" />
            New
          </FilterButton>
          <FilterButton>
            <FaFilter className="w-3 h-3" />
            Filter
          </FilterButton>
          <FilterButton>
            <FaExternalLinkAlt className="w-3 h-3" />
            Export
          </FilterButton>
        </div>
      </div>
      <div className="mt-4">
        <CustomerListTable users={users} />
      </div>
    </div>
  );
};

export default Customers;
