import { handleSuccess } from "@/utils/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
    } else {
      setLoggedInUser("N/A");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggenInUser");

    setTimeout(() => {
      handleSuccess("Logged Out! Take Care");
      navigate("/new-login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}products`;
      const getToken = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: `${getToken}`,
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      // console.log(result);
      setProducts(result);
    } catch (err) {}
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <div className="flex items-center justify-centers w-full flex-col">
        <h1 className="">Home Page</h1>
        <br />
        <br />
        <h1 className="">Hello {loggedInUser}</h1>
        <div>
          {products.map((item) => (
            <ul>
              <span>
                {item.name} : {item.price}
              </span>
            </ul>
          ))}
        </div>

        {/* Logout Button  */}
        <button
          onClick={handleLogout}
          className="border p-2 rounded-2xl bg-amber-300 hover:bg-amber-400 hover:border-dashed"
        >
          Logout!
        </button>
      </div>
    </>
  );
};

export default Home;
