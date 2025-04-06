"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../store/newsSlice";

export default function NewsSection() {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">📰 Top Crypto News</h2>
      {loading && <p>Loading news...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-3">
        {articles.map((article, i) => (
          <li key={i} className="bg-white p-4 rounded shadow">
            <a href={article.link} target="_blank" className="text-blue-600 hover:underline">
              {article.title}
            </a>
            <p className="text-sm text-gray-500">{article.pubDate}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
