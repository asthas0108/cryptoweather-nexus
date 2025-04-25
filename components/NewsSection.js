
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../store/newsSlice";
import { NewspaperIcon } from "lucide-react"; // Optional: install lucide-react

export default function NewsSection() {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-6xl mx-auto mt-10">
      <div className="flex items-center gap-2 mb-6">
        <NewspaperIcon className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Top Crypto News</h2>
      </div>

      {loading && (
        <div className="text-center py-10 text-gray-500 animate-pulse">Loading news...</div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && articles.length === 0 && (
        <div className="text-center text-gray-500">No news articles available.</div>
      )}

      <ul className="grid sm:grid-cols-2 gap-4">
        {articles.map((article, i) => (
          <li
            key={i}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {article.title}
            </a>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{article.pubDate}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
