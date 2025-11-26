import { useEffect, useState } from 'react';
import './TableOfContents.css';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // 提取文章中的所有标题
    const article = document.querySelector('.post__body');
    if (!article) return;

    const headingElements = article.querySelectorAll('h2, h3, h4');
    const headingList: Heading[] = [];

    const usedIds = new Set<string>();
    
    headingElements.forEach((heading, index) => {
      const text = heading.textContent || '';
      let id = heading.id;

      // 如果没有 ID，生成一个基于文本的 ID
      if (!id) {
        // 尝试生成基于文本的 ID
        let baseId = text
          .toLowerCase()
          .replace(/[^\w\s\u4e00-\u9fa5-]/g, '') // 保留中文字符
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
        
        // 如果生成的 ID 为空或已存在，使用索引作为后备
        if (!baseId || usedIds.has(baseId) || document.getElementById(baseId)) {
          baseId = `heading-${index}`;
        }
        
        // 确保 ID 唯一
        let finalId = baseId;
        let counter = 1;
        while (usedIds.has(finalId) || document.getElementById(finalId)) {
          finalId = `${baseId}-${counter}`;
          counter++;
        }
        
        id = finalId;
        heading.id = id;
        usedIds.add(id);
      }

      const level = parseInt(heading.tagName.charAt(1));
      headingList.push({ id, text, level });
    });

    setHeadings(headingList);

    // 监听滚动，高亮当前章节
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // 偏移量，提前高亮

      let currentId = '';
      for (let i = headingList.length - 1; i >= 0; i--) {
        const element = document.getElementById(headingList[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          currentId = headingList[i].id;
          break;
        }
      }

      setActiveId(currentId);
    };

    // 初始检查
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80; // 考虑固定头部的高度
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="table-of-contents">
      <div className="table-of-contents__title">目录</div>
      <div className="table-of-contents__container">
        <ul className="table-of-contents__list">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`table-of-contents__item table-of-contents__item--level-${heading.level} ${
                activeId === heading.id ? 'table-of-contents__item--active' : ''
              }`}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className="table-of-contents__link"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
