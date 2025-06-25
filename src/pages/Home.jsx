import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [dataAsesi, setDataAsesi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch("https://xxx.id/api/getAsesi", {
      method: "GET",
      headers: {
        "X-API-TOKEN": "kinoy123",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Gagal mengambil data. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response dari API:", data); // cek bentuknya
        setDataAsesi(data.data.slice(0, 10));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Beranda</h1>
      <Link to="/about" className="text-blue-500 underline">
        Ke Halaman Tentang
      </Link>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Data Asesi (10 pertama)
      </h2>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  No
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Role ID
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Nama
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Token
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dataAsesi.map((item, index) => (
                <tr key={item.id ?? index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {item.role_id}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {item.email}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {item.token}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Home;
