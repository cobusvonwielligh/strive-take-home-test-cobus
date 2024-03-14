import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function LessonPage() {
  const router = useRouter();
  const { recordId } = router.query;
  const [content, setContent] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [sectionTitles, setSectionTitles] = useState([]);

  useEffect(() => {
    if (!recordId) return;
    fetch(`/api/lesson/${recordId}`)
      .then(res => res.json())
      .then(data => {
        setContent(data.data.Content);
        const titles = data.data.Content.match(/^# .*/gm) || [];
        setSectionTitles(titles.map(title => title.replace(/^# /, '')));
        const splitContent = data.data.Content.split(/\n(?=# )/).filter(Boolean);
        setSlides(splitContent);
      })
      .catch(error => {
        console.error(`Error: ${error.message}`);
      });
  }, [recordId]);

  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex space-x-2 mb-4">
        {sectionTitles.map((title, index) => (
          <div key={index} className="flex flex-col items-center">
            <button
              className={`h-10 w-10 rounded-full ${currentSlide === index ? 'bg-blue-600 text-white' : 'bg-gray-200'} flex items-center justify-center`}
              onClick={() => goToSlide(index)}
            >
              {index + 1}
            </button>
            <p className="text-xs mt-1 w-16 text-center">{title}</p>
          </div>
        ))}
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow max-w-4xl w-full mb-8">
        <div className="markdown-content text-gray-700">
          {slides.length > 0 && (
            <Markdown children={slides[currentSlide]} remarkPlugins={[remarkGfm]} />
          )}
        </div>
      </div>
    </div>
  );
}